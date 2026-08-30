import { Reveal, Overline } from "@/components/Reveal";

export default function Positioning() {
  return (
    <section className="py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-3">
          <Overline>Positioning</Overline>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal delay={0.1}>
            <p
              data-testid="positioning-statement"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.2] tracking-tight text-balance max-w-4xl"
            >
              I help patients and families understand complex dental treatment
              options{" "}
              <em className="text-slate-500">
                before making major treatment decisions.
              </em>
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl text-muted-foreground leading-relaxed text-base">
              Patients rarely wake up thinking “I need a zygomatic implant.” They
              think: my teeth are gone, I can't chew, my dentures don't stay. My
              role is to help you understand the problem — then make the right
              decision, together.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
