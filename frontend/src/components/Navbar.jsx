import { MessageCircle, Languages } from "lucide-react";
import { waLink, scrollToId } from "@/lib/site";
import { useLang } from "@/lib/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const n = t.nav;

  return (
    <header
      data-testid="site-navbar"
      className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/85 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left"
        >
          <span className="font-serif text-xl leading-none block">{t.hero.name}</span>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            {n.tagline}
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {n.links.map(([label, id]) => (
            <button
              key={id}
              data-testid={`nav-link-${id}`}
              onClick={() => scrollToId(id)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            data-testid="lang-toggle-btn"
            onClick={() => setLang(lang === "en" ? "ta" : "en")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border px-3 py-1.5 transition-colors duration-300"
            aria-label="Switch language"
          >
            <Languages className="w-3.5 h-3.5" />
            {n.toggle}
          </button>
          <a
            data-testid="nav-whatsapp-link"
            href={waLink("Hello Dr. Yogesh, I would like to request a consultation.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            {n.whatsapp}
          </a>
          <button
            data-testid="nav-consultation-btn"
            onClick={() => scrollToId("consult")}
            className="hidden sm:block bg-primary text-primary-foreground text-sm px-5 py-2.5 hover:bg-slate-700 transition-colors duration-300"
          >
            {n.cta}
          </button>
        </div>
      </div>
    </header>
  );
}
