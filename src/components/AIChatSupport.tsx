import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, Minus, Send, MessageSquare
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model" | "assistant";
  content: string;
}

export default function AIChatSupport({ context }: { context?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: `Hello! I'm Maitsys AI. How can I help you${context ? ` with "${context}"` : ''} today?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update greeting when context changes
  useEffect(() => {
    if (context && messages.length === 1) {
      setMessages([{ id: 'welcome', role: 'assistant', content: `Hello! I'm Maitsys AI. How can I help you with "${context}" today?` }]);
    }
  }, [context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/support-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          chatHistory: messages
        })
      });

      const data = await res.json();
      setMessages(prev => [...prev, {
        id: Date.now().toString() + "1",
        role: "model",
        content: data.reply
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now().toString() + "2",
        role: "model",
        content: "Network error occurred."
      }]);
    } finally {
      setIsLoading(false);
    }
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
    <div className="fixed bottom-6 right-6 z-50 w-[340px] bg-white rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col transition-all duration-300">
      
      {/* Header aligned exactly to standard Google style panel */}
      <div className="px-5 pt-5 pb-4 flex justify-between items-start">
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
          <div className="flex-1 h-[340px] overflow-y-auto px-5 py-2 space-y-5 custom-scrollbar bg-white">
             {/* Initial welcome in chat view */}
             <div className="bg-[#f9fafb] rounded-[16px] rounded-tl-[4px] p-4 text-[13px] text-[#374151] inline-block border border-[#e5e7eb]">
               Hi there! I'm a new <strong>AI support assistant</strong>. I can help with questions about Maitsys features, settings, and more.
             </div>
             
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
