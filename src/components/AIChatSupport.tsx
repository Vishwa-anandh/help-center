import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, Minus, Send, MessageSquare
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model" | "assistant";
  content: string;
}

export default function AIChatSupport({ activeArticle, allArticles }: { activeArticle?: any, allArticles: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const context = activeArticle?.title;
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: `Hello! I'm Maitsys AI. How can I help you${context ? ` with "${context}"` : ''} today?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update greeting when context changes
  useEffect(() => {
    if (context && messages.length <= 1) {
      setMessages([{ id: 'welcome', role: 'assistant', content: `Hello! I'm Maitsys AI. How can I help you with "${context}" today?` }]);
    }
  }, [context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const generateLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.match(/^(hi|hello|hey|help|howdy)/)) {
      return "Hello! I'm here to help. You can ask me how to do specific tasks or request guidance on a workflow.";
    }

    const stopWords = ['what','when','where','how','why','this','that','with','the','and','for','you','can','please'];
    const keywords = q.split(/\s+/).filter(w => w.length > 2 && !stopWords.includes(w));
    
    if (keywords.length === 0) {
      return "Could you provide a bit more detail so I can help you better?";
    }

    // Search current article steps
    if (activeArticle && activeArticle.steps) {
      for (const step of activeArticle.steps) {
        const stepText = (step.title + " " + step.action).toLowerCase();
        // If at least one significant keyword matches
        if (keywords.some(k => stepText.includes(k))) {
          // Remove markdown image syntax
          const cleanAction = step.action.replace(/!\[.*?\]\(.*?\)/g, '').trim();
          return `Based on the current workflow, you should look at the step **"${step.title}"**: \n\n${cleanAction}`;
        }
      }
    }

    // Search all steps across all articles globally
    for (const article of allArticles) {
      if (article.steps) {
        for (const step of article.steps) {
          const stepText = (step.title + " " + step.action).toLowerCase();
          if (keywords.some(k => stepText.includes(k))) {
            const cleanAction = step.action.replace(/!\[.*?\]\(.*?\)/g, '').trim();
            return `I found this in the **"${article.title}"** workflow under the step **"${step.title}"**: \n\n${cleanAction}`;
          }
        }
      }
    }

    // Search all article titles/excerpts as fallback
    for (const article of allArticles) {
      const articleText = (article.title + " " + (article.excerpt || "")).toLowerCase();
      if (keywords.some(k => articleText.includes(k))) {
         return `I couldn't find exact steps, but the **"${article.title}"** workflow might have what you need.`;
      }
    }

    return "I couldn't find an exact match for your question. Could you try checking the sidebar for other workflows?";
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate network delay and logic processing
    setTimeout(() => {
      const reply = generateLocalResponse(userMsg.content);
      setMessages(prev => [...prev, {
        id: Date.now().toString() + "1",
        role: "model",
        content: reply
      }]);
      setIsLoading(false);
    }, 1000);
  };

  if (isMinimized) {
    return (
       <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <button 
             onClick={() => setIsMinimized(false)}
             className="w-[56px] h-[56px] bg-white rounded-full shadow-lg border border-[#e5e7eb] flex items-center justify-center hover:bg-gray-50 flex-shrink-0 relative overflow-hidden group transition-all"
          >
             <MessageSquare className="w-6 h-6 text-red-600" />
             <div className="absolute top-[8px] right-[8px] w-3 h-3 bg-red-500 rounded-full border-2 border-white scale-0 transition-transform group-hover:scale-100"></div>
          </button>
       </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-[340px] ${isOpen ? 'h-[500px]' : 'h-auto'} max-h-[calc(100vh-48px)] bg-white rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col transition-all duration-300`}>
      
      {/* Header aligned exactly to standard Google style panel */}
      <div className="px-5 pt-5 pb-4 flex justify-between items-start shrink-0">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center relative shadow-sm border border-[#e5e7eb]">
                <Sparkles className="w-4 h-4 text-red-600" />
                <div className="absolute -top-[2px] -right-[2px] w-[14px] h-[14px] rounded-full bg-white flex items-center justify-center">
                   <div className="w-[10px] h-[10px] rounded-full bg-red-500"></div>
                </div>
            </div>
            <div>
               <h3 className="font-display font-medium text-[#111827] text-[15px] leading-tight flex items-center gap-1">
                 Ask Maitsys Help
               </h3>
            </div>
         </div>
         <button 
           onClick={() => setIsMinimized(true)}
           className="text-[#4b5563] hover:text-[#111827] transition-colors p-1 -mr-2 -mt-1"
         >
           <Minus className="w-5 h-5" />
         </button>
      </div>

      {!isOpen ? (
        /* Preview State */
        <div className="px-5 pb-6">
           <div className="bg-[#f9fafb] rounded-[16px] rounded-tl-[4px] p-4 text-[14px] text-[#374151] font-sans leading-relaxed mb-6 border border-[#e5e7eb]">
             Hi there! I'm a new <strong>AI support assistant for Maitsys One</strong>. I can help with questions about Maitsys features, settings, and more.
           </div>
           <button 
              onClick={() => setIsOpen(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full py-[10px] px-4 font-medium text-[14px] transition-colors shadow-sm"
           >
              Let's chat
           </button>
        </div>
      ) : (
        /* Open Chat State */
        <>
          <div className="flex-1 overflow-y-auto px-5 py-2 space-y-5 bg-white">
             {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-[16px] px-4 py-3 text-[13px] leading-relaxed border ${
                    msg.role === "user" 
                      ? "bg-red-50 text-[#111827] rounded-br-[4px] border-transparent" 
                      : "bg-[#f9fafb] text-[#374151] rounded-tl-[4px] border-[#e5e7eb]"
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
             ))}

             {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-[#f9fafb] rounded-[16px] rounded-tl-[4px] px-4 py-3 text-[13px] flex items-center gap-1.5 border border-[#e5e7eb]">
                     <span className="w-1.5 h-1.5 outline outline-1 outline-red-400 bg-transparent rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce delay-75"></span>
                     <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce delay-150"></span>
                   </div>
                </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-white flex items-center gap-2">
            <input 
               data-loom-hide="true"
               type="text"
               value={input}
               onChange={e => setInput(e.target.value)}
               placeholder="Describe your issue..."
               className="flex-1 bg-[#f3f4f6] rounded-full px-4 py-2.5 text-[14px] text-[#111827] placeholder:text-[#4b5563] outline-none border border-transparent focus:border-[#e5e7eb]"
            />
            <button 
               type="submit"
               disabled={!input.trim()}
               className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-[#f3f4f6] text-red-600 flex-shrink-0 disabled:opacity-50 transition-colors"
            >
               <Send className="w-5 h-5 ml-0.5" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
