import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { helpArticles } from "./src/data/articles.js"; // Note: esbuild translates this correctly during bundling

// Inject environment variables
dotenv.config();

// Lazily initialize Gemini client
let genAIClient: any = null;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // We will do a graceful fallback rather than crash
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // Support chatbot endpoint
  app.post("/api/support-chat", async (req, res) => {
    try {
      const { message, chatHistory } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const client = getGeminiClient();

      if (!client) {
        // Graceful localized fallback when API key is not yet set
        console.warn("GEMINI_API_KEY is missing. Utilizing localized help search assistant.");
        
        // Let's analyze local articles database and perform a heuristic query match
        const query = message.toLowerCase();
        let matchedArticles = helpArticles.filter((article) => {
          return (
            article.title.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query) ||
            article.tags.some((tag) => tag.toLowerCase().includes(query))
          );
        });

        let reply = "";
        if (matchedArticles.length > 0) {
          reply = `I found some helpful articles related to your question:

${matchedArticles.map((art) => `- **[${art.title}](#article-${art.id})**: ${art.excerpt}`).join("\n\n")}

*(Note: To enable fully tailored, automated conversational answers, please add your **GEMINI_API_KEY** in the Secrets drawer at the top right of AI Studio.)*`;
        } else {
          reply = `Hello! I'm your Offline Support Assistant. 

I couldn't find a direct Match in our articles database for your query. Here is a list of general topics you can check:
- **Getting Started**: Creating accounts and dashboard walks.
- **Billing**: Management of seats and invoices.
- **Security**: Configuring 2FA and privacy keys.
- **Troubleshooting**: Fixing networking sync lag.

*(Note: Once a **GEMINI_API_KEY** is added in your Secrets drawer, I will provide full conversational reasoning to assist you!)*`;
        }

        return res.json({
          reply,
          fallback: true,
        });
      }

      // We have the client, let's assemble the query with full context
      // Format articles for the system context to feed to Gemini
      const articlesContext = helpArticles
        .map((art) => {
          return `Article ID: ${art.id}\nCategory: ${art.categoryId}\nTitle: ${art.title}\nExcerpt: ${art.excerpt}\nContent Summary: ${art.content.substring(0, 1000)}\n---`;
        })
        .join("\n");

      const systemInstruction = `You are "AI Support Agent", a highly-trained, helpful, and polite virtual guide for our digital workspace platform.
Your task is to answer user help requests based on the following authenticated Help Center Knowledge Base articles. 

Here is the structured articles database:
${articlesContext}

Rules:
1. Always be supportive, professional, positive, and concise. Format responses in beautiful Markdown.
2. If the user's question can be answered by one of the articles, provide a clear structured answer. Summarize key instructions, and include a clickable reference to the articles by advising: "You can find full details in [ARTICLE_TITLE](#article-${"$"}{article_id})".
3. If the answer cannot be found in the knowledge base, politely inform the user of what topics are supported, and advise them they can submit a support ticket via the form below.
4. Try to guide them step-by-step instead of dumping large blocks of text. Use bullet points and bold headers.`;

      // Construct a conversation structure. Since we use chatHistory, map it correctly.
      // `@google/genai` chats can process history or we can construct contents.
      // Let's construct standard contents representing the history to date.
      const contents = [];
      
      // Inject prior dialog cleanly
      if (Array.isArray(chatHistory)) {
        chatHistory.forEach((turn: { role: string; content: string }) => {
          contents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.content }],
          });
        });
      }

      // Add actual incoming prompt
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      // Call Gemini 3.5 Flash Model
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.3, // Keep facts grounded
        },
      });

      const replyText = response.text || "I was unable to formulate an answer. How else can I assist you?";

      return res.json({
        reply: replyText,
        fallback: false,
      });

    } catch (error: any) {
      console.error("Support chat API error:", error);
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Serve static UI assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on port ${PORT}`);
  });
}

startServer();
