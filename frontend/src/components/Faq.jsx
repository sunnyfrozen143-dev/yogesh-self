import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, Overline } from "@/components/Reveal";

const faqs = [
  ["Do I need a referral to consult Dr. Yogesh?", "No. You can request a consultation directly. Many patients also come through their family dentist — either way, your assessment and plan are led by Dr. Yogesh."],
  ["Where will my consultation and treatment take place?", "Consultations and treatment are arranged at well-equipped clinical facilities in Chennai and other locations, based on your treatment requirements. The exact location is confirmed when your consultation is booked — Dr. Yogesh remains your treating specialist throughout."],
  ["I already have a treatment plan from another dentist. Can I get a second opinion?", "Yes — this is common. Complex cases often come with conflicting plans. Bring your existing records and radiographs; Dr. Yogesh will assess them, explain what each option actually means, and tell you what he would recommend and why."],
  ["My parent is elderly and has lost most of their teeth. How should we start?", "Start with a consultation — and please come along with them. For elderly patients, the relevant family decision-maker is welcome (with the patient's consent). The aim is not simply fixed teeth, but something they can maintain, clean and function with for many years."],
  ["What happens at the first consultation?", "You talk first — your concerns, history and what you would most like to do again. Then a clinical examination, diagnostic records where indicated (including digital TRIOS 3 scans), and a visual explanation of the findings. Options are presented with benefits, limitations, risks, time and maintenance before any decision."],
  ["Who coordinates my care after treatment?", "Dr. Yogesh does. One doctor, one digital record, one treatment plan, one follow-up pathway — with structured reviews at 1, 3 and 6 months and annual maintenance. If anything urgent comes up, there is a defined emergency protocol through the treating facility."],
];

export default function Faq() {
  return (
    <section data-testid="faq-section" id="faq" className="py-28 lg:py-36 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Overline>Questions</Overline>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.1]">
                Before you <em className="text-slate-500">decide</em>
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed">
                The questions patients and families ask most before major dental
                treatment.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible data-testid="faq-accordion">
              {faqs.map(([q, a], i) => (
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
