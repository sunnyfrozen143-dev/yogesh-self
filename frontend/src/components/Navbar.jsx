import { MessageCircle } from "lucide-react";
import { waLink, scrollToId } from "@/lib/site";

const links = [
  ["Philosophy", "philosophy"],
  ["Expertise", "expertise"],
  ["FAQ", "faq"],
];

export default function Navbar() {
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
          <span className="font-serif text-xl leading-none block">Dr. Yogesh Kumar</span>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            Prosthodontist & Implantologist
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, id]) => (
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
          <a
            data-testid="nav-whatsapp-link"
            href={waLink("Hello Dr. Yogesh, I would like to request a consultation.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <button
            data-testid="nav-consultation-btn"
            onClick={() => scrollToId("consult")}
            className="bg-primary text-primary-foreground text-sm px-5 py-2.5 hover:bg-slate-700 transition-colors duration-300"
          >
            Request a Consultation
          </button>
        </div>
      </div>
    </header>
  );
}
