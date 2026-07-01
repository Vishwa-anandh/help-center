import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, Users, Lightbulb, ChevronRight, ChevronLeft, ArrowUp, PanelLeftClose, PanelLeftOpen, ChevronDown, ChevronUp, History, Copy, CheckCircle2, AlertCircle, X, Bookmark, Share2, MessageCircle, Send, PlayCircle, Menu
} from "lucide-react";
import { HelpArticle, HelpCategory } from "../data/articles";

interface ArticleViewProps {
  article: HelpArticle;
  onSelectArticle: (articleId: string) => void;
  allArticles: HelpArticle[];
  categories: HelpCategory[];
}

export default function ArticleView({ article, onSelectArticle, allArticles, categories }: ArticleViewProps) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [activeStep, setActiveStep] = useState(0);
  const [collapsedSteps, setCollapsedSteps] = useState<Record<number, boolean>>({});
  // 47. Interactive Checklists
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [recentArticles, setRecentArticles] = useState<string[]>([]);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // 46. Save for Later
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }, [article.id]);

  useEffect(() => {
    const handleOpenSidebar = () => setIsSidebarOpen(true);
    document.addEventListener('openSidebar', handleOpenSidebar);
    return () => document.removeEventListener('openSidebar', handleOpenSidebar);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollTotal > 0) {
        setScrollProgress((window.scrollY / scrollTotal) * 100);
      } else {
        setScrollProgress(0);
      }
      
      if (article.steps && article.steps.length > 0) {
        let current = 0;
        for (let i = 0; i < article.steps.length; i++) {
          const el = document.getElementById(`step-wrapper-${i}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 3) {
              current = i;
            }
          }
        }
        setActiveStep(current);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id, article.steps]);

  useEffect(() => {
    setRecentArticles(prev => {
      const filtered = prev.filter(id => id !== article.id);
      return [article.id, ...filtered].slice(0, 3);
    });
    setCollapsedSteps({});
    setCompletedSteps({});
    setUserVote(null);
    setFeedbackSubmitted(false);
    setIsSaved(false);
  }, [article.id]);

  const toggleAllSteps = () => {
    if (!article.steps) return;
    const allCollapsed = article.steps.length > 0 && article.steps.every((_, i) => collapsedSteps[i]);
    if (allCollapsed) {
      setCollapsedSteps({});
    } else {
      const newCollapsed: Record<number, boolean> = {};
      article.steps.forEach((_, i) => newCollapsed[i] = true);
      setCollapsedSteps(newCollapsed);
    }
  };

  const toggleStep = (index: number) => {
    setCollapsedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleCompleted = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCompletedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const copyToClipboard = (text: string, index: number) => {
    const cleanText = text.replace(/<[^>]*>?/gm, '');
    navigator.clipboard.writeText(cleanText);
    setCopiedStep(index);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const shareArticle = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
  };

  const allCurrentCat = allArticles.filter(a => a.categoryId === article.categoryId);
  const currentIndex = allCurrentCat.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allCurrentCat[currentIndex - 1] : null;
  const nextArticle = currentIndex < allCurrentCat.length - 1 ? allCurrentCat[currentIndex + 1] : null;

  const currentCategory = categories.find(c => c.id === article.categoryId);
  const allCollapsed = article.steps && article.steps.length > 0 && article.steps.every((_, i) => collapsedSteps[i]);

  const mockTags = article.id === 'login' ? ['security', 'authentication', 'important'] : ['workflow', 'dashboard', 'guide'];



  return (
    <>
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen image view"
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxImage} 
              alt="Fullscreen expanded view of step screenshot" 
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full max-w-full mx-auto py-8 px-4 md:px-8 items-start relative transition-colors duration-300">
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden transition-opacity" 
            onClick={() => setIsSidebarOpen(false)} 
            aria-hidden="true"
          />
        )}

        {/* Sidebar Modules */}
        <aside 
          className={`fixed inset-y-0 left-0 z-[70] lg:z-0 w-[300px] bg-white lg:bg-transparent lg:sticky lg:top-[100px] lg:w-[250px] xl:w-[280px] flex-shrink-0 flex flex-col h-screen lg:h-[calc(100vh-120px)] overflow-y-auto hide-scrollbar p-6 lg:p-0 lg:pr-2 shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden lg:translate-x-0'
          }`}
          aria-label="Sidebar navigation"
        >
            <div className="flex items-center justify-between mb-6 lg:mb-6 px-2.5">
              <h2 className="font-semibold text-[13px] text-gray-500 uppercase tracking-wider">All the modules</h2>
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="lg:hidden p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors"
                aria-label="Close Sidebar"
              >
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>

            <nav aria-label="Article Categories">
              <div className="flex flex-col relative pl-2 pt-2">
                {categories.map((cat, catIndex) => {
                  const catArticles = allArticles.filter(a => a.categoryId === cat.id);
                  if (catArticles.length === 0) return null;
                  
                  return (
                    <div key={cat.id} className="relative pb-4">
                      {/* Vertical line connecting modules */}
                      {catIndex !== categories.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-[-8px] w-0.5 bg-red-100" aria-hidden="true" />
                      )}
                      
                      {/* Module Header */}
                      <div className="flex items-center gap-3 mb-2.5 relative z-10">
                        <div className={`w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border-2 transition-colors ${
                          article.categoryId === cat.id ? 'border-red-500' : 'border-red-300'
                        }`}>
                        </div>
                        <h3 className={`font-medium text-[12px] ${article.categoryId === cat.id ? 'text-gray-800' : 'text-gray-500'}`}>{cat.title}</h3>
                      </div>
                      
                      {/* Submodules (Articles) */}
                      <div className="flex flex-col pl-[32px] relative">
                        {/* Inner vertical line for submodules */}
                        <div className="absolute left-[11px] top-0 bottom-4 w-0.5 bg-red-100" aria-hidden="true" />
                        
                        {catArticles.map((art, artIndex) => {
                          const isActive = art.id === article.id;
                          return (
                            <a 
                              key={art.id} 
                              href={`/${art.categoryId}/${art.id}`}
                              className={`relative flex items-center gap-2.5 py-1.5 px-2 min-h-[32px] rounded-lg cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-red-500 group ${
                                isActive ? 'bg-red-50' : 'hover:bg-gray-50'
                              }`}
                              onClick={(e) => { e.preventDefault(); onSelectArticle(art.id); }}
                              aria-current={isActive ? 'page' : undefined}
                            >
                              {/* Submodule Dot on the vertical line */}
                              <div className={`absolute left-[-25px] w-2.5 h-2.5 rounded-full z-10 border-2 transition-colors ${
                                isActive ? 'bg-red-600 border-red-600' : 'bg-white border-red-300 group-hover:border-red-400'
                              }`} aria-hidden="true" />
                              
                              <span className={`text-[14px] leading-[1.4] font-medium ${
                                isActive ? 'text-red-700' : 'text-[#111827] group-hover:text-black'
                              }`}>
                                {art.title}
                              </span>
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </nav>

            {recentArticles.length > 1 && (
              <div className="mt-4 mb-6 pt-6 border-t border-[#e5e7eb] px-2.5">
                <h3 className="font-medium text-[14px] text-[#111827] mb-3 flex items-center gap-2">
                  <History className="w-4 h-4 text-[#4b5563]" aria-hidden="true" />
                  Recent
                </h3>
                <nav aria-label="Recent Articles" className="flex flex-col gap-1">
                  {recentArticles.filter(id => id !== article.id).map(id => {
                    const recentArt = allArticles.find(a => a.id === id);
                    if (!recentArt) return null;
                    return (
                      <a 
                        key={id}
                        href={`/${allArticles.find(a => a.id === id)?.categoryId}/${id}`}
                        className="text-[13px] text-[#4b5563] hover:text-red-600 py-2.5 px-3 min-h-[44px] rounded-lg hover:bg-gray-50 truncate outline-none focus-visible:text-red-600 transition-colors flex items-center"
                        onClick={(e) => { e.preventDefault(); onSelectArticle(id); }}
                      >
                        {recentArt.title}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}
          </aside>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 w-full min-w-0">
            <div className="flex-1 lg:min-w-[55%] 2xl:min-w-[60%] max-w-none mx-auto w-full">
              <main className="bg-white lg:border lg:border-[#e5e7eb] lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <article className="px-[30px] pb-[30px] pt-[20px] md:px-[40px] md:pb-[40px] md:pt-[24px]">
              
              <nav aria-label="Breadcrumb" className="flex items-center justify-between mb-3">

                <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#6b7280] font-medium">
                  <span className="hover:text-[#111827] cursor-pointer transition-colors min-h-[44px] flex items-center">Help Center</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="hover:text-[#111827] cursor-pointer transition-colors min-h-[44px] flex items-center">{currentCategory?.title || 'Category'}</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="text-[#111827]" aria-current="page">{article.title}</span>
                </div>
                
                {/* 46. & 49. Share and Bookmark Actions */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={shareArticle}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
                    aria-label="Share article"
                    title="Share link"
                  >
                    {copiedLink ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 ${isSaved ? 'text-red-600 bg-red-50' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
                    aria-label={isSaved ? "Remove from saved articles" : "Save article for later"}
                    title="Save for later"
                  >
                    <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
                  </button>
                </div>
              </nav>

              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#111827] mb-2">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-base leading-7 text-[#4b5563] mb-4 font-sans">
                  {article.excerpt}
                </p>
              )}

              {mockTags.includes('important') && (
                <div className="mb-4 flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 shadow-sm" role="alert">
                  <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold mb-1">Important Notice</h4>
                    <p className="text-[13px] leading-relaxed">This workflow handles highly sensitive security information. Ensure you do not share credentials or OTP codes with anyone.</p>
                  </div>
                </div>
              )}



              {article.steps && article.steps.length > 0 ? (
                <div className="flex flex-col mt-0 group relative">
                  {article.steps.map((step, index) => {
                    const isCollapsed = collapsedSteps[index];
                    const isLast = index === article.steps!.length - 1;
                    const isCompleted = completedSteps[index];

                    return (
                      <div key={index} id={`step-wrapper-${index}`} className="relative flex flex-col gap-2 mb-2 transition-all duration-300 group-hover:opacity-60 hover:!opacity-100">
                        
                        {!isLast && (
                          <div className={`absolute top-10 bottom-[-24px] left-[19px] w-0.5 z-0 transition-colors ${isCompleted ? 'bg-red-500' : 'bg-red-100'}`} aria-hidden="true" />
                        )}

                        <button 
                          className={`flex w-full text-left items-center justify-between cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg py-2 z-10 transition-all active:scale-[0.99] min-h-[44px] ${
                            isCompleted ? 'opacity-60' : 'hover:opacity-80'
                          }`}
                          onClick={() => toggleStep(index)}
                          aria-expanded={!isCollapsed}
                          aria-controls={`step-content-${index}`}
                        >
                          <div className="flex items-center gap-4">
                            {/* 47. Interactive Checkbox overlaying the circle */}
                            <div 
                              className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold shrink-0 shadow-md transition-colors cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-red-300 ${
                                isCompleted ? 'bg-green-500' : 'bg-red-600'
                              }`}
                              aria-hidden="false"
                              role="checkbox"
                              aria-checked={isCompleted}
                              onClick={(e) => toggleCompleted(e, index)}
                              title="Mark step as complete"
                            >
                              {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
                            </div>
                            <h2 className={`text-lg md:text-xl font-semibold transition-colors ${isCompleted ? 'text-gray-500 line-through' : 'text-[#111827]'}`}>
                              {step.title}
                            </h2>
                          </div>
                          <div className="text-[#6b7280] p-1.5 rounded-full group-hover:bg-gray-200 transition-colors">
                            {isCollapsed ? <ChevronDown className="w-5 h-5" aria-hidden="true" /> : <ChevronUp className="w-5 h-5" aria-hidden="true" />}
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.div 
                              id={`step-content-${index}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-[4.25rem] pb-1 pt-0">
                                <div className={`relative text-[#374151] leading-relaxed text-[15px] transition-all ${isCompleted ? 'opacity-70' : ''}`}>
                                   <p dangerouslySetInnerHTML={{ __html: step.action.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br/>') }} />
                                </div>

                                {/* 48. Video Embeds (Mocked play button overlay) */}
                                {step.image && (
                                  <div className={`mt-2 relative inline-block transition-opacity ${isCompleted ? 'opacity-70' : ''}`}>
                                    <button
                                      onClick={() => setLightboxImage(step.image as string)}
                                      className="inline-block text-left outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl"
                                      aria-label={`View full size media for ${step.title}`}
                                    >
                                      <img 
                                        src={step.image} 
                                        alt={step.title} 
                                        className="w-full md:w-[75%] cursor-zoom-in transition-opacity hover:opacity-90"
                                      />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="markdown-body select-text mt-6">
                  <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(article.content) }} />
                </div>
              )}

              <div className="mt-12 border-t border-[#e5e7eb] pt-6 group inline-block">
                <button 
                  className="flex items-center justify-center gap-2 text-[13px] font-medium text-[#4b5563] hover:text-[#111827] transition-colors active:scale-95 min-h-[44px] px-2 rounded-lg hover:bg-gray-50 outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <Lightbulb className="w-4 h-4 text-[#4b5563] group-hover:text-[#f9ab00] transition-colors" aria-hidden="true" />
                  Give feedback about this article
                </button>
              </div>
            </article>
            
            {/* 43. Feedback Section with Expandable Text Box */}
            <div className="border-t border-[#e5e7eb] bg-[#fafafa] p-6 md:px-10 flex flex-col items-start gap-4 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <span className="text-[14px] font-medium text-[#374151]" id="feedback-group">Was this helpful?</span>
                <div className="flex gap-3" role="group" aria-labelledby="feedback-group">
                  <button 
                    onClick={() => setUserVote('up')}
                    aria-pressed={userVote === 'up'}
                    className={`border rounded-lg px-8 py-2 min-h-[44px] text-[14px] font-medium transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                      userVote === 'up' 
                        ? 'border-red-500 bg-red-50 text-red-600 shadow-sm' 
                        : 'border-[#e5e7eb] text-red-600 hover:bg-[#f9fafb] hover:shadow-sm'
                    }`}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setUserVote('down')}
                    aria-pressed={userVote === 'down'}
                    className={`border rounded-lg px-8 py-2 min-h-[44px] text-[14px] font-medium transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                      userVote === 'down' 
                        ? 'border-red-500 bg-red-50 text-red-600 shadow-sm' 
                        : 'border-[#e5e7eb] text-red-600 hover:bg-[#f9fafb] hover:shadow-sm'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {userVote === 'down' && !feedbackSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full mt-2"
                  >
                    <div className="w-full max-w-xl">
                      <label htmlFor="feedback" className="block text-[13px] text-gray-600 mb-2 font-medium">How can we improve this article?</label>
                      <textarea 
                        data-loom-hide="true"
                        id="feedback"
                        rows={3}
                        value={feedbackText}
                        onChange={e => setFeedbackText(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none transition-shadow"
                        placeholder="Please share your thoughts..."
                      />
                      <button 
                        onClick={handleFeedbackSubmit}
                        disabled={!feedbackText.trim()}
                        className="mt-3 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors disabled:opacity-50 active:scale-95"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </motion.div>
                )}
                {userVote && feedbackSubmitted && (
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                     className="text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200 mt-2"
                   >
                     Thanks for your feedback! It helps us improve.
                   </motion.div>
                )}
              </AnimatePresence>
            </div>
            


          </main>

          <nav aria-label="Pagination Navigation" className="mt-6 flex items-center justify-between bg-white border border-[#e5e7eb] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
            {prevArticle ? (
              <button 
                onClick={() => onSelectArticle(prevArticle.id)}
                className="flex items-center gap-2 text-[14px] text-[#4b5563] hover:text-red-600 font-medium text-left flex-1 transition-colors active:scale-95 p-3 min-h-[44px] rounded-xl hover:bg-red-50 outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label={`Previous article: ${prevArticle.title}`}
              >
                <ChevronLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="truncate">Prev: {prevArticle.title}</span>
              </button>
            ) : <div className="flex-1"></div>}
            
            {nextArticle ? (
              <button 
                onClick={() => onSelectArticle(nextArticle.id)}
                className="flex items-center justify-end gap-2 text-[14px] text-[#4b5563] hover:text-red-600 font-medium text-right flex-1 border-l border-[#e5e7eb] pl-4 ml-4 transition-colors active:scale-95 p-3 min-h-[44px] rounded-xl hover:bg-red-50 outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label={`Next article: ${nextArticle.title}`}
              >
                <span className="truncate">Next: {nextArticle.title}</span>
                <ChevronRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              </button>
            ) : <div className="flex-1"></div>}
          </nav>
        </div>


        <nav aria-label="Table of Contents" className="hidden xl:block w-[240px] flex-shrink-0 sticky top-[100px] h-[calc(100vh-120px)] overflow-y-auto hide-scrollbar">
           <div className="flex items-center justify-between mb-4">
             <h4 className="font-semibold text-[#111827] text-[12px] uppercase tracking-wider">On this page</h4>
             {article.steps && article.steps.length > 0 && (
               <button 
                 onClick={toggleAllSteps}
                 className="text-[11px] font-medium text-red-600 hover:text-red-800 hover:underline transition-colors outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-1"
                 aria-expanded={!allCollapsed}
               >
                 {allCollapsed ? "Expand all" : "Collapse all"}
               </button>
             )}
           </div>
           <div className="flex flex-col gap-2 border-l-2 border-[#e5e7eb]">
             {article.steps && article.steps.length > 0 ? (
               article.steps.map((step, i) => (
                 <a 
                   key={i} 
                   href={`#step-wrapper-${i}`}
                   onClick={(e) => { 
                     e.preventDefault(); 
                     const el = document.getElementById(`step-wrapper-${i}`);
                     if (el) {
                       const y = el.getBoundingClientRect().top + window.scrollY - 120;
                       window.scrollTo({ top: y, behavior: 'smooth' });
                     }
                   }}
                   className={`text-[13px] hover:text-red-600 pl-4 -ml-[2px] border-l-2 transition-colors leading-snug py-2.5 min-h-[44px] flex items-center rounded-r-md outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                     activeStep === i 
                       ? 'text-red-600 border-red-600 font-semibold bg-red-50' 
                       : completedSteps[i] 
                         ? 'text-gray-400 line-through border-transparent hover:bg-gray-50' 
                         : 'text-[#4b5563] border-transparent hover:bg-red-50 hover:border-red-200'
                   }`}
                 >
                   {step.title}
                 </a>
               ))
             ) : (
               <span className="text-[13px] text-[#9ca3af] pl-4 py-2.5 min-h-[44px] flex items-center">No sections</span>
             )}
           </div>
        </nav>
      </div>
    </div>

      {scrollProgress > 20 && (
        <AnimatePresence>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-3 bg-white border border-[#e5e7eb] text-[#4b5563] hover:text-[#111827] hover:shadow-xl rounded-full shadow-lg transition-all hover:-translate-y-1 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-red-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Back to top"
            aria-label="Scroll back to top of page"
          >
            <ArrowUp className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        </AnimatePresence>
      )}
    </>
  );
}

function convertMarkdownToHTML(markdown: string): string {
  let html = markdown.trim();
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<details') || trimmed.startsWith('</details') || trimmed.startsWith('<summary') || trimmed.startsWith('</summary') || trimmed.startsWith('<div') || trimmed.startsWith('</div')) {
      return line;
    }
    if (trimmed.startsWith('- ')) {
       return `<ul><li>${trimmed.replace('- ', '')}</li></ul>`;
    }
    return `<p>${line}</p>`;
  });
  let joined = processedLines.join('\n');
  joined = joined.replace(/<\/ul>\n<ul>/g, '\n');
  return joined;
}
