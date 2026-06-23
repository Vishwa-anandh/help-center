import React from "react";
import { HelpCategory, HelpArticle } from "../data/articles";

export default function HelpDashboard({ articles, onSelectArticle, searchQuery }: any) {
  const filtered = articles.filter((a: any) => 
     a.title.toLowerCase().includes((searchQuery||"").toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full mt-4 bg-white p-8 rounded-xl shadow-sm border border-[#e5e7eb]">
       <h1 className="text-[1.75rem] font-display text-[#111827]">Help Center Directory</h1>
       
       <div className="grid grid-cols-1 gap-1">
          {filtered.map((art: any) => (
             <div 
               key={art.id} 
               onClick={() => onSelectArticle(art.id)}
               className="p-4 border border-[#e5e7eb] bg-white rounded-[8px] cursor-pointer hover:bg-[#f9fafb] hover:border-[#6366f1] transition"
             >
                <div className="font-medium text-[#6366f1] text-[15px]">{art.title}</div>
             </div>
          ))}
          
          {filtered.length === 0 && (
            <div className="text-[#4b5563]">No articles match your search query.</div>
          )}
       </div>
    </div>
  );
}
