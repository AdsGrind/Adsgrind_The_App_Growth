"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, Send, RotateCcw } from "lucide-react";
import { cn } from "@/components/ui";
import { saveChatLead } from "@/app/actions/chat";

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp Button — Premium High-Trust
// ─────────────────────────────────────────────────────────────────────────────
export const WhatsAppButton = () => (
  <motion.div
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.6 }}
    className="fixed bottom-[92px] right-6 z-50 flex items-center group"
  >
    {/* Tooltip */}
    <span className="mr-3 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
      Chat on WhatsApp
    </span>
    
    <motion.a
      href="https://wa.me/919625982835?text=Hi%20ADSGRIND%2C%20I%27d%20like%20to%20inquire%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.08, brightness: 1.1 }}
      whileTap={{ scale: 0.94 }}
      className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] cursor-pointer relative"
    >
      {/* Subtle Breathing Glow */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-[#25D366]/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  quickReplies?: string[];
  streaming?: boolean;
}

const QUICK_REPLIES = [
  "Brand Scale",
  "Agency Connect",
  "UA Infrastructure",
  "CPA Intelligence",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  text: "Protocol online.\n\nSpecify your scaling objective.",
  sender: "bot",
  quickReplies: QUICK_REPLIES,
};

// Detect email + name patterns
const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;

function useStreamingText(fullText: string, active: boolean): string {
  const [displayed, setDisplayed] = React.useState("");

  React.useEffect(() => {
    if (!active) {
      setDisplayed(fullText);
      return;
    }
    setDisplayed("");
    const tokens = fullText.match(/(\S+|\s)/g) ?? [];
    let i = 0;
    let cancelled = false;

    const next = () => {
      if (cancelled || i >= tokens.length) return;
      const token = tokens[i++];
      setDisplayed((prev) => prev + token);
      setTimeout(next, token.trim() ? 12 + Math.random() * 18 : 2);
    };
    next();
    return () => { cancelled = true; };
  }, [fullText, active]);

  return displayed;
}

function StreamingBotMessage({ text, onDone }: { text: string; onDone: () => void }) {
  const displayed = useStreamingText(text, true);
  const doneRef = React.useRef(false);

  React.useEffect(() => {
    if (displayed === text && !doneRef.current) {
      doneRef.current = true;
      onDone();
    }
  }, [displayed, text, onDone]);

  return (
    <span className="whitespace-pre-wrap">
      {displayed}
      {displayed !== text && (
        <span className="inline-block w-[2px] h-[13px] bg-white ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [streamingId, setStreamingId] = React.useState<string | null>(null);
  const [hasPulsed, setHasPulsed] = React.useState(false);
  const [leadSaved, setLeadSaved] = React.useState(false);
  const [apiErrorCount, setApiErrorCount] = React.useState(0);

  const sessionIdRef = React.useRef<string>("");
  const passiveLeadRef = React.useRef<{ name?: string; email?: string }>({});

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const stored = sessionStorage.getItem("adsgrind_chat_session");
    if (stored) {
      sessionIdRef.current = stored;
    } else {
      const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      sessionIdRef.current = id;
      sessionStorage.setItem("adsgrind_chat_session", id);
    }
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => setHasPulsed(true), 12000);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  React.useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  const detectAndSaveLead = React.useCallback(
    async (userText: string, botReply: string) => {
      if (leadSaved) return;
      const emailMatch = userText.match(EMAIL_RE);
      if (emailMatch) passiveLeadRef.current.email = emailMatch[0];
      const nameMatch = userText.match(/(?:i'm|i am|my name is|this is|call me|it's|its)\s+([A-Z][a-z]+)/i);
      if (nameMatch) passiveLeadRef.current.name = nameMatch[1];
      if (passiveLeadRef.current.email && passiveLeadRef.current.name && !leadSaved) {
        setLeadSaved(true);
        await saveChatLead({
          name: passiveLeadRef.current.name,
          email: passiveLeadRef.current.email,
          summary: `Captured passively via chat`,
          sessionId: sessionIdRef.current,
        });
      }
    },
    [leadSaved]
  );

  const sendMessage = React.useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;
      const userId = `u_${Date.now()}`;
      setMessages((prev) => [...prev, { id: userId, text: trimmed, sender: "user" }]);
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "44px";
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, sessionId: sessionIdRef.current }),
        });
        const data = await res.json() as { reply: string; provider: string };
        const { reply, provider } = data;
        const botId = `b_${Date.now()}`;
        if (provider === "fallback") {
          setMessages((prev) => [...prev, { id: botId, text: reply, sender: "bot" as const, ...({ type: "quota" }) }]);
        } else {
          setStreamingId(botId);
          setMessages((prev) => [...prev, { id: botId, text: reply, sender: "bot" as const, streaming: true }]);
          setApiErrorCount(0);
          detectAndSaveLead(trimmed, reply);
        }
      } catch {
        setApiErrorCount((c) => c + 1);
        const errId = `b_err_${Date.now()}`;
        const errMsg = apiErrorCount === 0 ? "Connection interrupted. Retry." : "Hub unreachable. Contact: business@adsgrind.com";
        setMessages((prev) => [...prev, { id: errId, text: errMsg, sender: "bot" }]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, apiErrorCount, detectAndSaveLead]
  );

  const handleStreamDone = React.useCallback(() => {
    setStreamingId(null);
  }, []);

  const handleReset = () => {
    const newId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionIdRef.current = newId;
    sessionStorage.setItem("adsgrind_chat_session", newId);
    setMessages([WELCOME_MESSAGE]);
    passiveLeadRef.current = {};
    setInput("");
    setIsLoading(false);
    setStreamingId(null);
    setLeadSaved(false);
    setApiErrorCount(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="fixed bottom-6 right-6 z-50 flex items-center group"
    >
      {/* Tooltip */}
      {!isOpen && (
        <span className="mr-3 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Talk to AI
        </span>
      )}

      <motion.button
        onClick={() => { setIsOpen((o) => !o); setHasPulsed(false); }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 bg-[#FF3B3B] rounded-full flex items-center justify-center text-white shadow-[0_8px_25px_rgba(255,59,59,0.35)]"
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
          {isOpen ? <X size={24} /> : <Bot size={28} />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[24rem] bg-black border border-white/10 flex flex-col shadow-2xl z-50"
            style={{ maxHeight: "calc(100vh - 8rem)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#FF3B3B] flex items-center justify-center text-white">
                  <Bot size={16} />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-white leading-none">Intelligence_Node</h4>
                  <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1.5">Operational · ADSGRIND</p>
                </div>
              </div>
              <button onClick={handleReset} className="text-white/20 hover:text-white transition-colors">
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6 custom-scrollbar min-h-0">
              {messages.map((msg, idx) => {
                const isStreaming = msg.id === streamingId;
                return (
                  <div key={msg.id} className={cn("flex flex-col gap-3", msg.sender === "user" ? "items-end" : "items-start")}>
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className={cn(
                        "p-4 text-xs tracking-wide leading-relaxed",
                        msg.sender === "user" ? "bg-white text-black font-bold" : "bg-white/[0.03] border border-white/10 text-white/70"
                      )}
                    >
                      {(msg as any).type === "quota" ? (
                        <div className="space-y-4">
                          <p>AI node at capacity. Connect directly for immediate deployment.</p>
                          <a href="https://wa.me/919625982835" className="block w-full py-2 border border-white/20 text-center text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">WhatsApp Protocol</a>
                        </div>
                      ) : isStreaming ? (
                        <StreamingBotMessage text={msg.text} onDone={handleStreamDone} />
                      ) : (
                        <span className="whitespace-pre-wrap">{msg.text}</span>
                      )}
                    </motion.div>
                    {msg.quickReplies && (
                      <div className="flex flex-wrap gap-2">
                        {msg.quickReplies.map((qr) => (
                          <button key={qr} onClick={() => sendMessage(qr)} className="text-[9px] font-bold uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1.5 hover:border-white hover:text-white transition-all">{qr}</button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex gap-1.5 p-2">
                  {[0, 1, 2].map((i) => <span key={i} className="w-1 h-1 bg-white/20 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />)}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-end gap-4">
                <textarea
                  ref={(el) => { (inputRef as any).current = el; (textareaRef as any).current = el; }}
                  rows={1} value={input}
                  onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
                  onKeyDown={handleKeyDown}
                  placeholder="Operational query..."
                  className="flex-1 bg-transparent border-b border-white/10 py-2 text-xs text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all resize-none uppercase tracking-widest"
                />
                <button onClick={() => sendMessage(input)} disabled={!input.trim()} className="text-white/30 hover:text-white disabled:opacity-0 transition-all"><Send size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
