import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "@/components/Reveal";
import { articles } from "@/lib/articles";
import { useLang } from "@/lib/LanguageContext";

export default function Learn() {
  const { t } = useLang();
  const l = t.learn;

  return (
    <section
      data-testid="learn-section"
      id="learn"
      className="py-28 lg:py-36 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-16 lg:mb-20 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Overline>{l.overline}</Overline>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.15]">
              {l.title} <em className="text-slate-500">{l.titleEm}</em>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-muted-foreground leading-relaxed">{l.para}</p>
            {l.note && (
              <p data-testid="learn-lang-note" className="mt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-slate-400">
                {l.note}
              </p>
            )}
          </div>
        </Reveal>

        <div>
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={0.04 * i}>
              <Link
                to={`/learn/${a.slug}`}
                data-testid={`learn-article-${a.slug}`}
                className="group w-full border-t border-border last:border-b py-8 lg:py-10 grid lg:grid-cols-12 gap-4 lg:gap-6 items-baseline hover:bg-white hover:px-6 transition-all duration-500"
              >
                <span className="lg:col-span-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  {a.category}
                </span>
                <h3 className="lg:col-span-6 font-serif text-2xl sm:text-3xl tracking-tight group-hover:text-slate-600 transition-colors duration-300">
                  {a.title}
                </h3>
                <p className="lg:col-span-3 text-sm text-muted-foreground leading-relaxed">
                  {a.dek}
                </p>
                <span className="lg:col-span-1 flex items-center gap-3 lg:justify-end font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {a.minutes} {l.min}
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
