"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, Send, RotateCcw } from "lucide-react";
import { cn } from "@/components/ui";
import { saveChatLead } from "@/app/actions/chat";

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp Button
// ─────────────────────────────────────────────────────────────────────────────
export const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/919625982835?text=Hi%20ADSGRIND%2C%20I%27d%20like%20to%20inquire%20about%20your%20services."
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1, y: -4 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-6 right-24 z-40 w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] cursor-pointer overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 15.5 17.38 18.23 13.88 18.23C13.83 18.23 13.78 18.23 13.73 18.23C13.68 18.23 13.64 18.21 13.59 18.19L11.53 17.53L10.94 17.9L8.46 19.49L9.12 17.06L9.36 16.17L8.74 15.42C7.81 14.3 7.32 12.92 7.32 11.92C7.32 8.41 10.21 5.51 13.72 5.51" />
    </svg>
    <span className="absolute top-1 right-1 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-white opacity-20" />
    </span>
  </motion.a>
);

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  /** Only on the first bot message */
  quickReplies?: string[];
  /** Whether this message is currently streaming */
  streaming?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  "I'm a Brand / App Owner",
  "I'm an Agency",
  "I need App Growth",
  "How does CPA work?",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  text: "Growth Intelligence online.\n\nWhat are you trying to scale?",
  sender: "bot",
  quickReplies: QUICK_REPLIES,
};

// Detect email + name patterns for passive lead capture (no intercept logic)
const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;

// ─────────────────────────────────────────────────────────────────────────────
// Streaming reveal hook
// Animates text word-by-word so it feels like the AI is typing in real time
// ─────────────────────────────────────────────────────────────────────────────
function useStreamingText(fullText: string, active: boolean): string {
  const [displayed, setDisplayed] = React.useState("");

  React.useEffect(() => {
    if (!active) {
      setDisplayed(fullText);
      return;
    }
    // Reset on each new active text
    setDisplayed("");

    // Tokenise preserving whitespace so newlines render correctly.
    // Match sequences of non-whitespace OR individual whitespace chars.
    const tokens = fullText.match(/(\S+|\s)/g) ?? [];
    let i = 0;
    let cancelled = false;

    const next = () => {
      if (cancelled || i >= tokens.length) return;
      const token = tokens[i++];
      setDisplayed((prev) => prev + token);
      setTimeout(next, token.trim() ? 18 + Math.random() * 24 : 4);
    };
    next();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText, active]);

  return displayed;
}

// ─────────────────────────────────────────────────────────────────────────────
// StreamingBotMessage — renders the last bot message with word-by-word reveal
// ─────────────────────────────────────────────────────────────────────────────
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
        <span className="inline-block w-[2px] h-[13px] bg-brand-orange ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AIChatbot
// ─────────────────────────────────────────────────────────────────────────────
export const AIChatbot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [streamingId, setStreamingId] = React.useState<string | null>(null);
  const [hasPulsed, setHasPulsed] = React.useState(false);
  const [leadSaved, setLeadSaved] = React.useState(false);
  const [apiErrorCount, setApiErrorCount] = React.useState(0);

  // Stable session ID — persisted in sessionStorage so refreshing = new session
  const sessionIdRef = React.useRef<string>("");
  const passiveLeadRef = React.useRef<{ name?: string; email?: string }>({});

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Generate or restore sessionId on mount
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

  // Pulse trigger button after 8s if chat not yet opened
  React.useEffect(() => {
    const t = setTimeout(() => setHasPulsed(true), 8000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  // ── Passive lead detection ─────────────────────────────────────────────────
  // Scans outgoing user messages for email addresses silently
  const detectAndSaveLead = React.useCallback(
    async (userText: string, botReply: string) => {
      if (leadSaved) return;

      const emailMatch = userText.match(EMAIL_RE);
      if (emailMatch) {
        passiveLeadRef.current.email = emailMatch[0];
      }

      // Look for a name pattern in the current exchange:
      // e.g. "I'm Rohit" / "my name is Rohit" / "this is Rohit"
      const nameMatch = userText.match(
        /(?:i'm|i am|my name is|this is|call me|it's|its)\s+([A-Z][a-z]+)/i
      );
      if (nameMatch) {
        passiveLeadRef.current.name = nameMatch[1];
      }

      // If we have both, save quietly
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

  // ── Core message processor — calls /api/chat REST endpoint ───────────────
  const sendMessage = React.useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      // Optimistically render user message
      const userId = `u_${Date.now()}`;
      setMessages((prev) => [...prev, { id: userId, text: trimmed, sender: "user" }]);
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "44px";
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            sessionId: sessionIdRef.current,
          }),
        });

        const data = await res.json() as { reply: string; provider: string };
        const { reply, provider } = data;

        const botId = `b_${Date.now()}`;

        // Quota / fallback → show WhatsApp CTA card
        if (provider === "fallback") {
          setMessages((prev) => [
            ...prev,
            { id: botId, text: reply, sender: "bot" as const, ...({
              // @ts-ignore
              type: "quota"
            }) },
          ]);
        } else {
          // Normal reply — stream word-by-word
          setStreamingId(botId);
          setMessages((prev) => [
            ...prev,
            { id: botId, text: reply, sender: "bot" as const, streaming: true },
          ]);
          setApiErrorCount(0);
          detectAndSaveLead(trimmed, reply);
        }
      } catch {
        setApiErrorCount((c) => c + 1);
        const errId = `b_err_${Date.now()}`;
        const errMsg =
          apiErrorCount === 0
            ? "Connection hiccup. Try again or reach us at business@adsgrind.com"
            : "Still having trouble. WhatsApp is the fastest: wa.me/919625982835";
        setMessages((prev) => [
          ...prev,
          { id: errId, text: errMsg, sender: "bot" },
        ]);
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
    // Generate a new sessionId to clear server-side history
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

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* ── Trigger Button ── */}
      <motion.button
        onClick={() => { setIsOpen((o) => !o); setHasPulsed(false); }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 bg-gradient-to-br from-brand-red to-brand-orange rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_-4px_rgba(238,29,35,0.5)] overflow-hidden group"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.22 }}
          className="relative z-10"
        >
          {isOpen ? <X size={22} /> : <Bot size={26} />}
        </motion.div>

        {/* Pulse ring */}
        {hasPulsed && !isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-brand-orange/60 animate-ping pointer-events-none" />
        )}

        {/* Online dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-success rounded-full border-2 border-[#050505] flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
          </span>
        )}
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 14 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[26rem] bg-[#0a0a0a] border border-white/[0.08] rounded-3xl flex flex-col shadow-[0_24px_64px_-8px_rgba(0,0,0,0.8)] z-50"
            style={{ maxHeight: "min(38rem, calc(100vh - 6rem))" }}
          >

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#150500]/80 to-[#0d0d0d] border-b border-white/[0.05] flex-shrink-0 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-red/25 to-brand-orange/15 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={18} className="text-brand-orange" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-brand-success rounded-full border-2 border-[#0a0a0a]" />
                </div>
                <div>
                  <h4 className="text-[13px] font-black tracking-widest uppercase italic text-white leading-none">
                    ADSGRIND AI
                  </h4>
                  <p className="text-[9px] font-bold text-brand-orange/60 uppercase tracking-[0.18em] mt-0.5">
                    Growth Intelligence · Online
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                title="Start over"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/30 hover:text-white/70 transition-all border border-white/[0.05]"
              >
                <RotateCcw size={13} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3.5 custom-scrollbar min-h-0">
              {messages.map((msg, idx) => {
                const isLastBot = msg.sender === "bot" && idx === messages.length - 1;
                const isStreaming = msg.id === streamingId;

                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col gap-2",
                      msg.sender === "user" ? "items-end" : "items-start"
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.18 }}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm max-w-[88%] leading-relaxed",
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-brand-red to-brand-orange text-white font-medium rounded-tr-sm shadow-[0_4px_14px_-4px_rgba(238,29,35,0.45)]"
                          : "bg-white/[0.05] border border-white/[0.07] text-slate-200 rounded-tl-sm"
                      )}
                    >
                      {(msg as any).type === "quota" ? (
                        <div className="flex flex-col gap-2.5">
                          <p className="text-sm text-slate-300 leading-relaxed">
                            Our AI is temporarily at capacity. Talk to the team directly — we respond fast.
                          </p>
                          <a
                            href="https://wa.me/919625982835?text=Hi%20ADSGRIND%2C%20I%27d%20like%20to%20discuss%20scaling%20my%20app."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/25 px-3 py-2 rounded-xl transition-all w-fit"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 15.5 17.38 18.23 13.88 18.23C13.83 18.23 13.78 18.23 13.73 18.23C13.68 18.23 13.64 18.21 13.59 18.19L11.53 17.53L10.94 17.9L8.46 19.49L9.12 17.06L9.36 16.17L8.74 15.42C7.81 14.3 7.32 12.92 7.32 11.92C7.32 8.41 10.21 5.51 13.72 5.51" /></svg>
                            Chat on WhatsApp
                          </a>
                        </div>
                      ) : isStreaming ? (
                        <StreamingBotMessage text={msg.text} onDone={handleStreamDone} />
                      ) : (
                        <span className="whitespace-pre-wrap">{msg.text}</span>
                      )}
                    </motion.div>

                    {/* Quick reply chips — only on welcome message */}
                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className="flex flex-wrap gap-1.5 max-w-[90%]"
                      >
                        {msg.quickReplies.map((qr) => (
                          <button
                            key={qr}
                            onClick={() => sendMessage(qr)}
                            disabled={isLoading || streamingId !== null}
                            className="text-[10px] font-bold uppercase tracking-wider text-brand-orange border border-brand-orange/30 hover:border-brand-orange/70 hover:bg-brand-orange/8 px-3 py-1.5 rounded-full transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                          >
                            {qr}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}

              {/* Loading indicator (shows while waiting for API) */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/50 animate-bounce" />
                </motion.div>
              )}

              <div ref={messagesEndRef} className="h-px" />
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-3 border-t border-white/[0.05] flex-shrink-0 bg-[#0a0a0a] rounded-b-3xl">
              <div className="flex items-end gap-2">
                <textarea
                  ref={(el) => {
                    (inputRef as any).current = el;
                    (textareaRef as any).current = el;
                  }}
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "44px";
                    e.target.style.height =
                      Math.min(e.target.scrollHeight, 96) + "px";
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about CPA, installs, scaling..."
                  disabled={isLoading || streamingId !== null}
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.12] focus:border-brand-orange/35 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all resize-none custom-scrollbar disabled:opacity-50"
                  style={{ minHeight: "44px", maxHeight: "96px" }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading || streamingId !== null}
                  className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-all flex-shrink-0",
                    input.trim() && !isLoading && !streamingId
                      ? "bg-gradient-to-br from-brand-red to-brand-orange shadow-[0_4px_14px_-4px_rgba(238,29,35,0.5)] hover:brightness-110 active:scale-90"
                      : "bg-white/[0.05] text-white/20 cursor-not-allowed"
                  )}
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-center text-[9px] text-white/15 font-bold uppercase tracking-widest mt-2.5 select-none">
                Powered by ADSGRIND Intelligence
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
