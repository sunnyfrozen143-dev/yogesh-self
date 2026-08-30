import { Reveal, Overline } from "@/components/Reveal";

const chapters = [
  ["Understand", "Your concerns, dental history, medical history and expectations — beginning with one question: what would you most like to be able to do again?"],
  ["Examine", "A careful clinical examination and the appropriate diagnostic records. Nothing automatic — diagnosis determines the records."],
  ["Analyse", "Digital scans (TRIOS 3), photographs, radiographs and CBCT where indicated — shown to you visually, so you see what I see."],
  ["Plan", "Suitable treatment options discussed openly: benefits, limitations, risks, time, maintenance and alternatives — in plain language."],
  ["Treat", "Treatment carried out in an appropriate clinical setting, with the required infrastructure, team and surgical environment."],
  ["Maintain", "Long-term follow-up and maintenance — 1-month, 3-month, 6-month reviews and annual care. One doctor, one record, one pathway."],
];

export default function Philosophy() {
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
                Treatment philosophy
              </p>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.1]">
                How I approach <em className="text-slate-400">complex cases</em>
              </h2>
              <p className="mt-8 text-slate-300 leading-relaxed max-w-md">
                A complex rehabilitation may span consultation, records, planning,
                surgery, healing, provisional and final prostheses — and years of
                maintenance. My clinic location may evolve. My patient-care system
                does not.
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
                  Continual hands-on surgical training · advanced implant protocols
                </p>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          {chapters.map(([title, body], i) => (
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
