import { MessageCircle, Mail, MapPin } from "lucide-react";
import { waLink, WHATSAPP_DISPLAY, EMAIL, scrollToId } from "@/lib/site";
import { useLang } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer data-testid="site-footer" id="contact" className="bg-primary text-primary-foreground pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-slate-700/60">
          <div className="lg:col-span-6">
            <p className="font-serif text-4xl sm:text-5xl tracking-tight leading-[1.15]">
              {f.name}
            </p>
            <p className="mt-4 font-mono text-xs tracking-[0.22em] uppercase text-slate-400">
              {f.tagline}
            </p>
            <button
              data-testid="footer-consult-btn"
              onClick={() => scrollToId("consult")}
              className="mt-10 bg-background text-foreground px-8 py-4 text-sm tracking-wide hover:bg-white transition-colors duration-300"
            >
              {f.cta}
            </button>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-end gap-5 text-sm text-slate-300">
            <a data-testid="footer-whatsapp-link" href={waLink("Hello Dr. Yogesh, I would like to request a consultation.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors duration-300">
              <MessageCircle className="w-4 h-4" /> {WHATSAPP_DISPLAY}
            </a>
            <a data-testid="footer-email-link" href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-white transition-colors duration-300">
              <Mail className="w-4 h-4" /> {EMAIL}
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="w-4 h-4" /> {f.location}
            </p>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">{f.disclaimer}</p>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500">
            © {new Date().getFullYear()} Dr. Yogesh Kumar
          </p>
        </div>
      </div>
    </footer>
  );
}
