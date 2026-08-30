import { Reveal, Overline } from "@/components/Reveal";
import { scrollToId } from "@/lib/site";

const cases = [
  {
    meta: ["Case 01", "Zygomatic + All-on-4 · Dual-Arch", "Patient in their early 60s"],
    title: "No lower teeth, a failing upper arch — and almost no bone at the back",
    presented:
      "A retired gentleman with a completely edentulous lower jaw and an upper arch where the remaining teeth were beyond saving. Imaging showed severe atrophy of the posterior maxilla — the areas where implants would normally go simply had no usable native bone left.",
    thinking:
      "Two jaws, two different problems, one coordinated plan. The lower jaw had good anatomy, so a proven All-on-4 protocol was chosen there. The upper jaw could not support conventional posterior implants — instead of months of staged grafting, zygomatic implants anchored in the cheekbone were combined with two conventional implants in the front, giving stable support where the jaw itself offered none.",
    changed:
      "The compromised upper teeth were removed and both arches rehabilitated with fixed, screw-retained hybrid prostheses — no removable dentures, and no grafting marathon before treatment could even begin.",
  },
  {
    meta: ["Case 02", "Implant Rescue & Revision", "Patient in their mid 40s"],
    title: "A failing upper implant prosthesis — rescued, not restarted",
    presented:
      "A patient whose lower implant teeth were perfectly stable, but whose upper implant-supported prosthesis had become mobile and was failing. The instinctive answer elsewhere was to remove everything and start again.",
    thinking:
      "CBCT assessment showed two of the four existing upper implants were fully intact and salvageable — only two had failed. Rather than sacrificing sound implants, the foundation was rebuilt around them: one new conventional implant in the front and two zygomatic implants at the back created a five-implant support system, engineered around the severe posterior bone deficiency.",
    changed:
      "A new fixed full-arch prosthesis on the upper jaw, designed to bite correctly against the stable lower restoration. Revision surgery preserved what was working — the patient paid, healed and recovered only for what had actually failed.",
  },
  {
    meta: ["Case 03", "Aesthetic Zone · Staged Grafting", "Patient in their mid 20s"],
    title: "A front tooth lost in a road accident — and a ridge too thin to build on",
    presented:
      "A young professional in the final stages of orthodontic treatment, missing an upper central incisor after a traffic accident. CBCT showed a severe horizontal ridge defect at the site — roughly 2 mm of bone width where an implant would eventually need far more.",
    thinking:
      "Placing an implant into that ridge would have compromised the one thing that matters most in the smile zone: natural-looking gum and bone contour. The plan was staged — autogenous bone from the chin (symphysis graft) to rebuild the ridge width first, and a bonded Maryland bridge as a conservative, aesthetic long-term provisional while the graft matured and orthodontics finished. No healthy adjacent teeth were cut down.",
    changed:
      "A natural-looking bonded tooth within a week of surgery, a ridge rebuilt for a predictable future implant, and a treatment sequence timed precisely around the orthodontic finish — aesthetics never left to chance.",
  },
  {
    meta: ["Case 04", "Full-Mouth Rehab · Sinus Lift", "Patient in their mid 50s"],
    title: "Fifteen years of missing back teeth — and a bite that had quietly collapsed",
    presented:
      "A patient who had lost upper back teeth fifteen years earlier, after a jaw fracture. In the years since, the opposing lower teeth had over-erupted into the empty space, the remaining teeth had worn down, and there was no longer room to place anything — with only 4 mm of native bone below the sinus.",
    thinking:
      "The missing teeth were the visible problem; the lost inter-arch space was the real one. The sequence mattered: first regain the space — splint therapy, root canal treatment and correction of the over-erupted teeth — then a direct sinus lift to rebuild bone height with simultaneous implant placement, and only after healing, the prosthetic phase.",
    changed:
      "A full-mouth rehabilitation with implant-supported teeth where bone had been missing for fifteen years, a corrected bite plane, and chewing function the patient had stopped expecting to get back.",
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
            Real cases from practice — not before-and-after marketing. Names and
            identifying details are changed to protect patient privacy; the
            clinical thinking is not.
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
