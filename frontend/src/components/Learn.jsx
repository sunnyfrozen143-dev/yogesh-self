import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "@/components/Reveal";
import { articles } from "@/lib/articles";

export default function Learn() {
  return (
    <section
      data-testid="learn-section"
      id="learn"
      className="py-28 lg:py-36 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-16 lg:mb-20 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Overline>Patient education</Overline>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.1]">
              Understand it <em className="text-slate-500">before you decide</em>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground leading-relaxed">
            Plain-language guides to the treatments patients ask about most — no
            jargon, no fear marketing, no prices.
          </p>
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
                  {a.minutes} min
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
