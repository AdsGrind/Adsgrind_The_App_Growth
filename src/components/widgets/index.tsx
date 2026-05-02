"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot, X, MessageSquare } from 'lucide-react';

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919625982835?text=Hi%20AdsGrind%2C%20I%27d%20like%20to%20inquire%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-24 md:right-24 z-40 w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5),0_8px_10px_-6px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden group"
    >
      {/* Gloss effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 15.5 17.38 18.23 13.88 18.23C13.83 18.23 13.78 18.23 13.73 18.23C13.68 18.23 13.64 18.21 13.59 18.19L11.53 17.53L10.94 17.9L8.46 19.49L9.12 17.06L9.36 16.17L8.74 15.42C7.81 14.3 7.32 12.92 7.32 11.92C7.32 8.41 10.21 5.51 13.72 5.51" />
      </svg>
      
      <span className="absolute top-1 right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white opacity-20"></span>
      </span>
    </motion.a>
  );
};

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-gradient-brand rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(157,80,187,0.5),0_8px_10px_-6px_rgba(0,0,0,0.1)] relative overflow-hidden group"
      >
        {/* Gloss effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Bot size={28} />
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-80 h-[30rem] sm:h-96 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-0 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-brand flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-wide uppercase italic">ADSGRIND AI</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white/70 uppercase">Assistant Online</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto bg-slate-950/80">
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 text-sm max-w-[85%] leading-relaxed shadow-sm">
                Hello! I'm your ADSGRIND growth assistant. How can I help you scale your business today?
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-slate-900/80 flex gap-2">
              <input
                type="text"
                placeholder="Ask anything..."
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs flex-1 focus:outline-none focus:border-brand-accent-start transition-colors placeholder:text-slate-500"
              />
              <button className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-lg hover:brightness-110 transition-all active:scale-95">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

