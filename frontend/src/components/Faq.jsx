import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, Overline } from "@/components/Reveal";
import { useLang } from "@/lib/LanguageContext";

export default function Faq() {
  const { t } = useLang();
  const f = t.faq;

  return (
    <section data-testid="faq-section" id="faq" className="py-28 lg:py-36 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Overline>{f.overline}</Overline>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.15]">
                {f.title} <em className="text-slate-500">{f.titleEm}</em>
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed">{f.para}</p>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible data-testid="faq-accordion">
              {f.items.map(([q, a], i) => (
                <AccordionItem key={i} value={`item-${i}`} data-testid={`faq-item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left font-serif text-xl lg:text-2xl py-7 hover:no-underline hover:text-slate-600 transition-colors duration-300">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-7 max-w-2xl">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
