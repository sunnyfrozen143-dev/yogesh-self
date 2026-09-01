import { Reveal, Overline } from "@/components/Reveal";
import { useLang } from "@/lib/LanguageContext";

export default function Positioning() {
  const { t } = useLang();
  const p = t.positioning;

  return (
    <section className="py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-3">
          <Overline>{p.overline}</Overline>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal delay={0.1}>
            <p
              data-testid="positioning-statement"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.25] tracking-tight text-balance max-w-4xl"
            >
              {p.statement}{" "}
              <em className="text-slate-500">{p.statementEm}</em>
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl text-muted-foreground leading-relaxed text-base">
              {p.para}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
