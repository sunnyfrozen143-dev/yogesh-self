import { Reveal, Overline } from "@/components/Reveal";
import { scrollToId } from "@/lib/site";

const cases = [
  {
    meta: ["Case 01", "Full-Arch Implant Rehabilitation", "Patient in their late 60s"],
    title: "Ten years of failing dentures — and a family afraid of surgery",
    presented:
      "A retired teacher who had worn complete dentures for a decade. The lower denture no longer stayed in place, eating had become a private struggle, and the family arrived with three conflicting opinions — from \"nothing can be done at this age\" to \"extract everything and place eight implants tomorrow.\"",
    thinking:
      "Age alone is never the deciding factor — bone volume, medical history and what the patient can realistically maintain are. Digital scans and 3D imaging showed enough bone for a fixed full-arch solution on four implants in the lower jaw, avoiding grafting entirely. The daughter sat in on every discussion, because for elderly patients the family carries the decision too.",
    changed:
      "A fixed lower arch the patient cleans with a simple routine, a relined upper denture that now had something stable to bite against — and a first meal out with the family in years. The plan chosen was the one the patient could maintain, not the largest one possible.",
  },
  {
    meta: ["Case 02", "Full-Mouth Rehabilitation", "Patient in their mid 40s"],
    title: "Teeth worn flat by two decades of silent grinding",
    presented:
      "A working professional whose front teeth had shortened year by year until the smile looked aged and chewing was uncomfortable. Previous dentists had patched individual teeth — each repair failing within months, because the underlying bite collapse was never addressed.",
    thinking:
      "When every tooth is worn, the question is not \"which tooth do we fix\" but \"at what height should the entire bite function?\" The lost vertical dimension was rebuilt provisionally first — the patient lived with a reversible trial of the new bite for weeks before anything permanent was done. Only once function, speech and comfort were proven did definitive ceramic work begin.",
    changed:
      "A full-mouth rehabilitation completed in a planned sequence rather than emergency patches — with a night guard and structured reviews to protect the result from the same forces that caused the damage.",
  },
  {
    meta: ["Case 03", "Advanced Implant Rehabilitation", "Patient in their late 50s"],
    title: "Told 'not enough bone' — three plans, none of them explained",
    presented:
      "A patient with long-standing missing upper teeth and severe bone loss, carrying three different treatment plans: one recommending major bone grafting over 18 months, one suggesting removable dentures, and one quoting zygomatic implants with no explanation of what that meant.",
    thinking:
      "Each option was mapped against the same questions — surgical burden, time to fixed teeth, long-term maintenance, and what could go wrong. For this anatomy, remote-anchorage implants (zygomatic and pterygoid) offered fixed teeth without staged grafting — but the patient needed to understand why, not just be told. The consultation used their own 3D imaging to walk through every alternative.",
    changed:
      "The patient chose graftless full-arch rehabilitation — not because it was suggested loudest, but because they finally understood the trade-offs of all three plans. Understanding came first; the procedure followed.",
  },
];

export default function CaseStories() {
  return (
    <section
      data-testid="case-stories-section"
      id="cases"
      className="py-28 lg:py-36 bg-white border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-16 lg:mb-24 max-w-3xl">
          <Overline>Case stories</Overline>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.1]">
            How complex cases are <em className="text-slate-500">actually thought through</em>
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed">
            Not before-and-after photographs — the reasoning behind real decisions.
            Details are altered to protect patient identity; the clinical thinking is not.
          </p>
        </Reveal>

        <div className="space-y-0">
          {cases.map((c, i) => (
            <Reveal key={c.meta[0]} delay={0.05 * i}>
              <article
                data-testid={`case-story-${i + 1}`}
                className="border-t border-border last:border-b py-14 lg:py-20 grid lg:grid-cols-12 gap-10"
              >
                <div className="lg:col-span-3">
                  <div className="lg:sticky lg:top-28 space-y-3">
                    <span className="font-serif text-5xl lg:text-6xl text-slate-300 block leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c.meta.slice(1).map((m) => (
                      <p key={m} className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        {m}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-9 max-w-3xl">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.15]">
                    {c.title}
                  </h3>
                  <div className="mt-10 space-y-8">
                    {[
                      ["How they presented", c.presented],
                      ["The thinking", c.thinking],
                      ["What changed", c.changed],
                    ].map(([label, text]) => (
                      <div key={label}>
                        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-3">
                          {label}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            Every case is different. These stories show an approach — not a promise
            of outcome. Your plan starts with understanding your problem.
          </p>
          <button
            data-testid="case-stories-cta"
            onClick={() => scrollToId("consult")}
            className="bg-primary text-primary-foreground text-sm px-8 py-4 hover:bg-slate-700 transition-colors duration-300"
          >
            Discuss your case
          </button>
        </Reveal>
      </div>
    </section>
  );
}
