import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, Search, Grid, Bell, ExternalLink, FileText, SearchX, Globe, Type
} from "lucide-react";

import { helpCategories, helpArticles } from "./data/articles";
import ArticleView from "./components/ArticleView";
import AIChatSupport from "./components/AIChatSupport";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/').filter(Boolean);
  let activeArticleId = "login";
  if (pathParts.length >= 2) {
    activeArticleId = pathParts[1];
  } else if (pathParts.length === 1) {
    activeArticleId = pathParts[0];
  }

  const activeArticle = helpArticles.find(art => art.id === activeArticleId) || null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const handleSelectArticle = (articleId: string) => {
    const art = helpArticles.find(a => a.id === articleId);
    if (art) {
      navigate(`/${art.categoryId}/${art.id}`);
      setSearchQuery("");
      setIsSearchFocused(false);
    }
  };

  const searchResults = helpArticles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (art.excerpt && art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className={`min-h-screen bg-[#fafafa] text-[#374151] font-sans flex flex-col antialiased transition-all duration-300`}>
        
        {/* Header aligned to Google style */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] shadow-sm transition-colors duration-300">
          <div className="flex items-center px-4 md:px-6 py-1.5 justify-between">
            <div className="flex items-center gap-2 sm:gap-4">

              <button 
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors flex lg:hidden items-center justify-center min-w-[44px] min-h-[44px] active:scale-95"
                aria-label="Open main menu"
                onClick={() => document.dispatchEvent(new CustomEvent('openSidebar'))}
              >
                <Menu className="w-6 h-6 text-[#4b5563]" />
              </button>
              <span 
                onClick={() => navigate("/getting-started/login")}
                className="cursor-pointer transition-transform hover:scale-[1.02] flex items-center min-h-[44px]"
                role="link"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate("/getting-started/login"); }}
                aria-label="Matrix Vault Home"
              >
                <img src="/images/branding/matrix_vault_logo.png" alt="Matrix Vault" className="h-8 sm:h-9 w-auto object-contain" />
              </span>
            </div>
            
            <div className="flex-1 max-w-3xl mx-4 lg:mx-12 relative">
              <div className={`relative bg-[#f3f4f6] focus-within:bg-white focus-within:shadow-md focus-within:border-transparent rounded-full flex items-center px-4 py-1.5 sm:py-2 border border-transparent transition-all z-50 ${isSearchFocused ? 'ring-2 ring-red-500/20' : ''}`}>
                 <Search className="w-5 h-5 text-[#4b5563]" aria-hidden="true" />
                 <input 
                   data-loom-hide="true"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   onFocus={() => setIsSearchFocused(true)}
                   onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                   placeholder="Describe your issue" 
                   aria-label="Search help articles"
                   className="bg-transparent border-none outline-none ml-4 w-full text-base text-[#111827] placeholder:text-[#4b5563] min-h-[30px]" 
                 />
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {searchQuery && isSearchFocused && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-14 left-0 right-0 bg-white border border-[#e5e7eb] rounded-xl shadow-xl overflow-hidden z-40 max-h-[400px] overflow-y-auto"
                    role="listbox"
                  >
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        {searchResults.map(art => {
                          const highlightText = (text: string, highlight: string) => {
                            if (!highlight.trim()) return <span>{text}</span>;
                            const regex = new RegExp(`(${highlight})`, 'gi');
                            const parts = text.split(regex);
                            return (
                              <span>
                                {parts.map((part, i) => 
                                  regex.test(part) ? <mark key={i} className="bg-yellow-200 text-gray-900 rounded-sm px-0.5">{part}</mark> : part
                                )}
                              </span>
                            );
                          };
                          
                          return (
                            <div 
                              key={art.id} 
                              onClick={() => handleSelectArticle(art.id)}
                              role="option"
                              aria-selected={false}
                              className="flex items-start gap-3 p-3 hover:bg-red-50 rounded-lg cursor-pointer transition-colors active:bg-red-100 min-h-[44px]"
                            >
                              <FileText className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">{highlightText(art.title, searchQuery)}</h4>
                                {art.excerpt && <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{highlightText(art.excerpt, searchQuery)}</p>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                          <SearchX className="w-8 h-8 text-gray-400" aria-hidden="true" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">No results found</h3>
                        <p className="text-xs text-gray-500 max-w-[250px]">We couldn't find anything matching "{searchQuery}". Try different keywords.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
               {/* 35. Font Size Toggle removed per user request */}

               {/* 36. Language Toggle removed per user request */}


               <button 
                 className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold ml-2 cursor-pointer shadow-sm hover:shadow-md transition-all active:scale-95 min-w-[36px] min-h-[36px]"
                 aria-label="User profile menu"
               >
                  V
               </button>
            </div>
          </div>
        </header>

        {/* Main viewport Container */}
        <main className="flex-1 w-full bg-transparent">
          <Routes>
            <Route path="/:categoryId/:articleId" element={
              activeArticle ? (
                <ArticleView
                  article={activeArticle}
                  onSelectArticle={handleSelectArticle}
                  allArticles={helpArticles}
                  categories={helpCategories}
                />
              ) : <Navigate to="/getting-started/login" replace />
            } />
            <Route path="*" element={<Navigate to="/getting-started/login" replace />} />
          </Routes>
        </main>

        <AIChatSupport activeArticle={activeArticle} allArticles={helpArticles} />

        {/* Simple Footer */}
        <footer className="bg-transparent border-t border-[#e5e7eb] py-6 text-[12px] text-[#4b5563] hidden md:block mt-auto" role="contentinfo">
          <div className="max-w-full mx-auto px-4 md:px-8 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span>©2026 Maitsys</span>
                <a href="#" className="hover:text-[#111827] hover:underline min-h-[44px] flex items-center">Privacy Policy</a>
                <a href="#" className="hover:text-[#111827] hover:underline min-h-[44px] flex items-center">Terms of Service</a>
                <button 
                  className="flex items-center gap-1 hover:text-[#111827] hover:underline transition-colors active:scale-95 min-h-[44px]"
                  aria-label="Open Maitsys One external site"
                >
                  Maitsys One <ExternalLink className="w-[14px] h-[14px]" aria-hidden="true" />
                </button>
              </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
