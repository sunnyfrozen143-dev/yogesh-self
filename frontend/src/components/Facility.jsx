import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, Overline } from "@/components/Reveal";

export default function Facility() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      data-testid="facility-section"
      id="facility"
      ref={ref}
      className="py-28 lg:py-36 bg-white border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <Reveal>
            <div className="absolute top-6 -right-6 w-full h-full border border-foreground/20 pointer-events-none" />
            <motion.div style={{ y }} className="relative clipped-frame bg-slate-200">
              <img
                data-testid="facility-image"
                src="https://images.pexels.com/photos/6812507/pexels-photo-6812507.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Premium clinical facility interior"
                className="w-full h-[380px] lg:h-[480px] object-cover"
                loading="lazy"
              />
            </motion.div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-8">
          <Reveal>
            <Overline>Where treatment happens</Overline>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.15] text-balance">
              Specialist-led care, delivered in the{" "}
              <em className="text-slate-500">right clinical setting</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-muted-foreground leading-relaxed max-w-xl">
              Consultations and treatment are arranged at selected clinical
              facilities in Chennai and other locations, according to each
              patient's treatment requirements. Once you book, your consultation
              with Dr. Yogesh will take place at{" "}
              <span className="text-foreground font-medium">The Dental Avenue, Chennai</span>.
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
              The facility provides the chair, sterilisation, radiography,
              assistants and surgical environment. Dr. Yogesh provides what
              matters most in complex care — diagnosis, planning, treatment,
              coordination and long-term follow-up.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div
              data-testid="facility-equation"
              className="mt-10 border border-border bg-background p-8 grid sm:grid-cols-2 gap-6"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  Dr. Yogesh
                </p>
                <p className="mt-2 font-serif text-2xl italic">Treating specialist</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  The Dental Avenue
                </p>
                <p className="mt-2 font-serif text-2xl italic">Clinical facility</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
