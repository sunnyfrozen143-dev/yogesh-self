import { ExternalLink } from "lucide-react";
import { Reveal, Overline } from "@/components/Reveal";
import { GOOGLE_REVIEW_URL } from "@/lib/site";
import { useLang } from "@/lib/LanguageContext";

export default function Testimonials() {
  const { t } = useLang();
  const v = t.voices;
  const featured = v.items.find((x) => x.featured);
  const rest = v.items.filter((x) => !x.featured);

  return (
    <section
      data-testid="testimonials-section"
      id="voices"
      className="py-28 lg:py-36 bg-white border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-16 lg:mb-20 max-w-2xl">
          <Overline>{v.overline}</Overline>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.15]">
            {v.title} <em className="text-slate-500">{v.titleEm}</em>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <figure data-testid="testimonial-featured" className="h-full border-l-2 border-foreground pl-8 lg:pl-10 flex flex-col justify-between">
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.3]">
                “{featured.quote}”
              </blockquote>
              <figcaption className="mt-10 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                {featured.who} · {featured.where}
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {rest.map((x, i) => (
              <Reveal key={x.who} delay={0.06 * i} className="bg-white">
                <figure data-testid={`testimonial-${i + 1}`} className="p-7 lg:p-8 h-full flex flex-col justify-between">
                  <blockquote className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    “{x.quote}”
                  </blockquote>
                  <figcaption className="mt-6 font-mono text-[9px] tracking-[0.2em] uppercase text-slate-400">
                    {x.who} · {x.where}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-md">{v.disclaimer}</p>
          <a
            data-testid="google-review-link"
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-foreground/25 px-6 py-3.5 text-sm hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            {v.review}
            <ExternalLink className="w-4 h-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
