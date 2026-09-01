import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal, Overline } from "@/components/Reveal";
import { scrollToId } from "@/lib/site";
import { useLang } from "@/lib/LanguageContext";

export default function CaseStories() {
  const { t } = useLang();
  const c = t.cases;
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? c.items : c.items.slice(0, 4);

  return (
    <section
      data-testid="case-stories-section"
      id="cases"
      className="py-28 lg:py-36 bg-white border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-16 lg:mb-24 max-w-3xl">
          <Overline>{c.overline}</Overline>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.15]">
            {c.title} <em className="text-slate-500">{c.titleEm}</em>
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed">{c.para}</p>
        </Reveal>

        <div className="space-y-0">
          {visible.map((cs, i) => (
            <Reveal key={cs.meta[0]} delay={0.05 * i}>
              <article
                data-testid={`case-story-${i + 1}`}
                className="border-t border-border last:border-b py-14 lg:py-20 grid lg:grid-cols-12 gap-10"
              >
                <div className="lg:col-span-3">
                  <div className="lg:sticky lg:top-28 space-y-3">
                    <span className="font-serif text-5xl lg:text-6xl text-slate-300 block leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {cs.meta.slice(1).map((m) => (
                      <p key={m} className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        {m}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-9 max-w-3xl">
                  {cs.img && (
                    <figure className="mb-10">
                      <img
                        data-testid={`case-story-img-${i + 1}`}
                        src={cs.img}
                        alt={cs.imgCaption}
                        loading="lazy"
                        className="w-full max-h-[380px] object-cover border border-border"
                      />
                      <figcaption className="mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
                        {cs.imgCaption}
                      </figcaption>
                    </figure>
                  )}
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.2]">
                    {cs.title}
                  </h3>
                  <div className="mt-10 space-y-8">
                    {[
                      [c.labels[0], cs.presented],
                      [c.labels[1], cs.thinking],
                      [c.labels[2], cs.changed],
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

        {!showAll && (
          <Reveal className="mt-2">
            <button
              data-testid="case-stories-show-more"
              onClick={() => setShowAll(true)}
              className="group w-full border border-border bg-background py-6 flex items-center justify-center gap-3 text-sm tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              {c.showMore}
            </button>
          </Reveal>
        )}

        <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">{c.footNote}</p>
          <button
            data-testid="case-stories-cta"
            onClick={() => scrollToId("consult")}
            className="bg-primary text-primary-foreground text-sm px-8 py-4 hover:bg-slate-700 transition-colors duration-300"
          >
            {c.cta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
