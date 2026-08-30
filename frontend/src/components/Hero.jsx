import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { waLink, scrollToId } from "@/lib/site";

const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, 90]);
  const textY = useTransform(scrollY, [0, 700], [0, -40]);

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-12 items-center">
        <motion.div style={{ y: textY }} className="lg:col-span-7 relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8"
          >
            Prosthodontist & Implantologist — MDS · Chennai
          </motion.p>

          <h1 className="font-serif tracking-tight text-foreground">
            <MaskedLine delay={0.35} className="text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
              Dr. Yogesh Kumar
            </MaskedLine>
            <MaskedLine
              delay={0.55}
              className="text-3xl sm:text-4xl lg:text-5xl italic text-slate-600 mt-3"
            >
              Complex Oral Rehabilitation
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed text-balance"
          >
            When your dental problem is complex, the first step isn't choosing a
            procedure. It's understanding the problem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-consult-btn"
              onClick={() => scrollToId("consult")}
              className="group bg-primary text-primary-foreground px-8 py-4 text-sm tracking-wide flex items-center gap-3 hover:bg-slate-700 transition-colors duration-300"
            >
              Request a Consultation
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
            <a
              data-testid="hero-whatsapp-link"
              href={waLink("Hello Dr. Yogesh, I would like to understand my treatment options.")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground/25 px-8 py-4 text-sm tracking-wide flex items-center gap-3 hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            data-testid="hero-scope-line"
            className="mt-12 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground leading-loose"
          >
            Full-mouth rehabilitation · Full-arch implants · Advanced implant
            solutions · Smile rehabilitation
          </motion.p>
        </motion.div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-[radial-gradient(circle_at_30%_20%,rgba(15,23,42,0.14),transparent_65%)] pointer-events-none" />
            <div className="absolute top-6 -left-6 w-full h-full border border-foreground/20 pointer-events-none" />
            <motion.div style={{ y: imgY }} className="relative clipped-frame bg-slate-200">
              <img
                data-testid="hero-portrait"
                src="https://images.pexels.com/photos/19438563/pexels-photo-19438563.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Dr. Yogesh Kumar — Prosthodontist & Implantologist"
                className="w-full h-[420px] lg:h-[540px] object-cover object-top grayscale-[20%]"
              />
            </motion.div>
            <p className="mt-5 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              Specialist-led care · TRIOS 3 digital workflow
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
