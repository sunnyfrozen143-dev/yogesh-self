import { Check } from "lucide-react";
import { Reveal, Overline } from "@/components/Reveal";

const items = [
  "Multiple missing teeth",
  "Severely worn teeth",
  "Loose or uncomfortable dentures",
  "Difficulty chewing",
  "Multiple failed dental treatments",
  "Full-mouth rehabilitation",
  "Full-arch implant treatment",
  "Complex aesthetic rehabilitation",
  "Major smile rehabilitation",
];

export default function WhoShouldConsult() {
  return (
    <section
      data-testid="who-should-consult-section"
      className="py-28 lg:py-36 border-t border-border bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Overline>Who should consult</Overline>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.1]">
                When should you consult a{" "}
                <em className="text-slate-500">Prosthodontist?</em>
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
                If you recognise your situation below, your problem may need
                specialist assessment rather than another routine procedure.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          {items.map((item, i) => (
            <Reveal key={item} delay={i * 0.05}>
              <div
                data-testid={`consult-reason-${i}`}
                className="group flex items-center gap-6 border-b border-border py-6 hover:pl-4 transition-all duration-500"
              >
                <span className="font-mono text-xs text-muted-foreground w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-lg md:text-xl">{item}</span>
                <Check className="w-5 h-5 text-slate-400 group-hover:text-foreground group-hover:scale-110 transition-all duration-300" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
