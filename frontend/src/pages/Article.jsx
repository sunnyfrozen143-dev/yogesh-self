import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import { getArticle, articles } from "@/lib/articles";
import { waLink, WHATSAPP_DISPLAY, setMeta, DEFAULT_TITLE, DEFAULT_DESC } from "@/lib/site";

export default function Article() {
  const { slug } = useParams();
  const article = getArticle(slug);

  useEffect(() => {
    if (article) {
      setMeta(`${article.title} — Dr. Yogesh Kumar`, article.dek);
      window.scrollTo(0, 0);
    }
    return () => {
      setMeta(DEFAULT_TITLE, DEFAULT_DESC);
    };
  }, [article]);

  if (!article) return <Navigate to="/" replace />;

  const others = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div data-testid="article-page" className="grain bg-background text-foreground min-h-screen">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" data-testid="article-brand-link" className="text-left">
            <span className="font-serif text-xl leading-none block">Dr. Yogesh Kumar</span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              Prosthodontist & Implantologist
            </span>
          </Link>
          <Link
            to="/#consult"
            data-testid="article-consult-btn"
            className="bg-primary text-primary-foreground text-sm px-5 py-2.5 hover:bg-slate-700 transition-colors duration-300"
          >
            Request a Consultation
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link
            to="/#learn"
            data-testid="article-back-link"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> All patient guides
          </Link>

          <p className="mt-10 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            {article.category} · {article.minutes} min read
          </p>
          <h1 data-testid="article-title" className="mt-5 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.08]">
            {article.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{article.dek}</p>

          <div className="mt-14 space-y-12">
            {article.sections.map(([h, p]) => (
              <section key={h}>
                <h2 className="font-serif text-2xl sm:text-3xl tracking-tight">{h}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{p}</p>
              </section>
            ))}
          </div>

          <p className="mt-14 text-xs text-muted-foreground leading-relaxed border-t border-border pt-6">
            This guide is general patient education by Dr. Yogesh Kumar M, MDS
            Prosthodontics. It is not a diagnosis or a treatment recommendation
            for your specific case — that requires a clinical examination and
            appropriate records.
          </p>

          <div data-testid="article-cta" className="mt-14 border border-border bg-white p-8 lg:p-12">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              Your case is specific
            </p>
            <h3 className="mt-4 font-serif text-3xl tracking-tight">
              Discuss it with the specialist, not a search engine.
            </h3>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/#consult"
                data-testid="article-cta-consult"
                className="bg-primary text-primary-foreground px-8 py-4 text-sm hover:bg-slate-700 transition-colors duration-300"
              >
                Request a Consultation
              </Link>
              <a
                data-testid="article-cta-whatsapp"
                href={waLink(`Hello Dr. Yogesh, I read your guide "${article.title}" and would like to discuss my case.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground/25 px-8 py-4 text-sm flex items-center gap-3 hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>

          <div className="mt-20">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">
              Keep reading
            </p>
            {others.map((a) => (
              <Link
                key={a.slug}
                to={`/learn/${a.slug}`}
                data-testid={`article-related-${a.slug}`}
                className="group flex items-baseline justify-between gap-6 border-t border-border last:border-b py-5 hover:pl-3 transition-all duration-300"
              >
                <span className="font-serif text-xl sm:text-2xl tracking-tight group-hover:text-slate-600 transition-colors duration-300">
                  {a.title}
                </span>
                <ArrowUpRight className="w-5 h-5 shrink-0 text-slate-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
