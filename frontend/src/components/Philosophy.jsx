import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/LanguageContext";

export default function Philosophy() {
  const { t } = useLang();
  const p = t.philosophy;

  return (
    <section
      data-testid="philosophy-section"
      id="philosophy"
      className="py-28 lg:py-40 bg-primary text-primary-foreground"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-slate-400">
                {p.overline}
              </p>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.15]">
                {p.title} <em className="text-slate-400">{p.titleEm}</em>
              </h2>
              <p className="mt-8 text-slate-300 leading-relaxed max-w-md">
                {p.para}
              </p>
              <div className="mt-10 relative">
                <div className="absolute top-4 -left-4 w-full h-full border border-slate-600/50 pointer-events-none" />
                <img
                  data-testid="philosophy-training-photo"
                  src="https://customer-assets-7cd3h4nn.emergentagent.net/job_specialist-smile-1/artifacts/mu4d9h9a_photo_2025-04-12_19-46-01.jpg"
                  alt="Dr. Yogesh Kumar M during hands-on advanced surgical training"
                  className="relative w-full max-w-md h-64 lg:h-72 object-cover"
                />
                <p className="mt-4 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                  {p.training}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          {p.chapters.map(([title, body], i) => (
            <Reveal key={title} delay={0.05 * i}>
              <div
                data-testid={`philosophy-chapter-${i + 1}`}
                className="group border-b border-slate-700/60 py-10 first:pt-0 flex gap-8"
              >
                <span className="font-serif text-5xl lg:text-6xl text-slate-500 group-hover:text-slate-200 transition-colors duration-500 leading-none w-24 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-2xl lg:text-3xl italic">{title}</h3>
                  <p className="mt-4 text-slate-300/90 leading-relaxed max-w-lg">
                    {body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
