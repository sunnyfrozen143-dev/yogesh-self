import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const GREETING =
  "Hello. I can answer general questions about full-mouth rehabilitation, dental implants, dentures and smile treatment — for you or a family member. How can I help?";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
  const [sessionId] = useState(() => {
    let id = localStorage.getItem("yk-chat-session");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("yk-chat-session", id);
    }
    return id;
  });
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const appendToLast = (delta) =>
    setMessages((m) => {
      const copy = [...m];
      copy[copy.length - 1] = { ...copy[copy.length - 1], content: copy[copy.length - 1].content + delta };
      return copy;
    });

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", content: text }, { role: "assistant", content: "" }]);
    try {
      const res = await fetch(`${API}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: text }),
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();
        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          const payload = part.slice(6).trim();
          if (payload === "[DONE]") continue;
          try {
            const j = JSON.parse(payload);
            if (j.delta) appendToLast(j.delta);
          } catch { /* ignore partial chunks */ }
        }
      }
    } catch {
      appendToLast("I couldn't connect right now. Please try again, or reach us on WhatsApp at +91 90434 32286.");
    }
    setBusy(false);
  };

  return (
    <>
      <motion.button
        data-testid="chat-open-btn"
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-[80] w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300"
        aria-label="Ask a question"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[80] w-[92vw] max-w-md bg-white border border-border shadow-2xl flex flex-col overflow-hidden"
            style={{ height: "min(560px, 70vh)" }}
          >
            <div className="bg-primary text-primary-foreground px-5 py-4">
              <p className="font-serif text-lg italic">Ask about your treatment options</p>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-slate-400 mt-1">
                General information — not a diagnosis
              </p>
            </div>
            <div ref={scrollRef} data-testid="chat-messages" className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-background">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white border border-border text-foreground"
                    }`}
                  >
                    {m.content || (busy && i === messages.length - 1 ? <Loader2 className="w-4 h-4 animate-spin" /> : "")}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-3 flex gap-2 bg-white">
              <input
                data-testid="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="e.g. My mother's dentures keep slipping…"
                className="flex-1 px-4 py-3 text-sm bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors duration-300"
              />
              <button
                data-testid="chat-send-btn"
                onClick={send}
                disabled={busy || !input.trim()}
                className="bg-primary text-primary-foreground px-4 flex items-center justify-center hover:bg-slate-700 disabled:opacity-50 transition-colors duration-300"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
