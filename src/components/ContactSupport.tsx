import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, MessageSquare, Send, CheckCircle, Upload, 
  X, FileText, AlertTriangle, RefreshCw 
} from "lucide-react";

interface TicketDetails {
  name: string;
  email: string;
  category: string;
  priority: string;
  message: string;
  attachmentName: string | null;
  attachmentSize: string | null;
}

export default function ContactSupport() {
  const [formData, setFormData] = useState<TicketDetails>({
    name: "",
    email: "",
    category: "getting-started",
    priority: "medium",
    message: "",
    attachmentName: null,
    attachmentSize: null,
  });

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to format file sizes
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const processSelectedFile = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      attachmentName: file.name,
      attachmentSize: formatBytes(file.size),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  // Drag-and-drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = () => {
    setFormData((prev) => ({
      ...prev,
      attachmentName: null,
      attachmentSize: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitLoading(true);

    // Simulate server ticket creation
    setTimeout(() => {
      const uniqueId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setCreatedTicketId(uniqueId);
      setIsSubmitLoading(false);
      setIsSubmitSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      category: "getting-started",
      priority: "medium",
      message: "",
      attachmentName: null,
      attachmentSize: null,
    });
    setIsSubmitSuccess(false);
  };

  // Calculate estimated response times
  const getExpectedResponse = (priority: string) => {
    switch (priority) {
      case "high":
        return "2-4 Business Hours (Urgent Review)";
      case "medium":
        return "12-24 Business Hours (Standard Speed)";
      default:
        return "1-2 Business Days (General Pool)";
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100 overflow-hidden" id="support-ticket-module">
      {/* Banner design */}
      <div className="bg-slate-950 text-white px-6 py-6 border-b border-slate-800">
        <h3 className="font-display font-medium text-lg leading-snug tracking-tight text-white">Can&apos;t find what you need?</h3>
        <p className="font-sans text-xs text-slate-400 mt-1">Submit an official support ticket and our engineering team will get back to you directly.</p>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {!isSubmitSuccess ? (
            <motion.form 
              key="ticket-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              {/* Row 1: Name & email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="ticket-name" className="text-xs font-semibold text-slate-700 font-sans">Full Name</label>
                  <input
                    id="ticket-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g., Vishwa Anand"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition duration-200"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="ticket-email" className="text-xs font-semibold text-slate-700 font-sans">Email Address</label>
                  <input
                    id="ticket-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition duration-200"
                  />
                </div>
              </div>

              {/* Row 2: Category & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="ticket-category" className="text-xs font-semibold text-slate-700 font-sans">Ticket Category</label>
                  <select
                    id="ticket-category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition duration-200"
                  >
                    <option value="getting-started">Getting Started & Setup</option>
                    <option value="billing">Billing & Seat Management</option>
                    <option value="security">Workspace Security & Privacy</option>
                    <option value="troubleshooting">Network Sync & Offline Logs</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="ticket-priority" className="text-xs font-semibold text-slate-700 font-sans">Priority Level</label>
                  <select
                    id="ticket-priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition duration-200"
                  >
                    <option value="low">Low - Generic question</option>
                    <option value="medium">Medium - Work disrupted</option>
                    <option value="high">High - High urgency bug</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-1">
                 <label htmlFor="ticket-message" className="text-xs font-semibold text-slate-700 font-sans">Support Message</label>
                 <textarea
                   id="ticket-message"
                   name="message"
                   required
                   value={formData.message}
                   onChange={handleInputChange}
                   rows={4}
                   placeholder="Describe what your issue is. Mention any error messages, codes, or sync states you are seeing."
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition duration-200 resize-none"
                 />
              </div>

              {/* Upload files supporting click and drag and drop */}
              <div className="flex flex-col space-y-1.5">
                <span className="text-xs font-semibold text-slate-700 font-sans">Attachments (Optional)</span>
                
                <input
                  type="file"
                  id="ticket-file-input"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.txt,.json,.csv,.log"
                />

                {!formData.attachmentName ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border-2 border-dashed rounded-xl px-5 py-6 text-center cursor-pointer transition duration-200 ${
                      isDragOver
                        ? "border-slate-800 bg-slate-50 text-slate-900"
                        : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center space-y-1.5">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-semibold text-slate-800 font-sans">Drag and drop files here, or click to browse</p>
                      <p className="text-[10px] text-slate-400 font-sans">Supports image logs, console reports, CSV sheets (Max 5MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-medium text-slate-800 truncate max-w-[220px]">{formData.attachmentName}</p>
                        <p className="text-[10px] text-slate-400">{formData.attachmentSize}</p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={removeAttachment}
                      className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:border-slate-300 shadow-sm transition duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Form submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitLoading || !formData.name || !formData.email || !formData.message}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-slate-950 text-white font-sans font-medium text-sm rounded-xl hover:bg-slate-800 focus:ring-2 focus:ring-slate-950 transition duration-200 disabled:opacity-40"
                >
                  {isSubmitLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Opening Support Ticket...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Support Ticket
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="submit-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8 px-4"
            >
              <div className="mx-auto flex items-center justify-center w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-500 mb-4 animate-bounce">
                <CheckCircle className="w-6 h-6" />
              </div>
              
              <h4 className="font-display font-bold text-lg text-slate-900 tracking-tight">Support Ticket Submitted!</h4>
              <p className="font-sans text-xs text-slate-500 mt-1 max-w-sm mx-auto">We have dispatched confirmation logs to **{formData.email}**. Check your filters if it does not arrive shortly.</p>

              {/* Ticket receipt info card */}
              <div className="my-5 p-4 bg-slate-50 border border-slate-200/60 rounded-xl text-left space-y-2.5 max-w-md mx-auto">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Receipt Metric</span>
                  <span className="text-xs font-bold text-slate-900 font-mono select-all bg-white px-2 py-0.5 border border-slate-200/80 rounded">{createdTicketId}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Author</span>
                    <span className="font-medium text-slate-700">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Category</span>
                    <span className="font-medium text-slate-700 capitalize">{formData.category.replace("-", " ")}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Priority</span>
                    <span className="font-semibold text-slate-700 uppercase flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${formData.priority === 'high' ? 'bg-red-500' : formData.priority === 'medium' ? 'bg-amber-400' : 'bg-slate-400'}`} />
                      {formData.priority}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Expected Response</span>
                    <span className="font-semibold text-slate-900">{getExpectedResponse(formData.priority)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition duration-200"
                >
                  Create Another Ticket
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
