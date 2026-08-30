import { ExternalLink } from "lucide-react";
import { Reveal, Overline } from "@/components/Reveal";
import { GOOGLE_REVIEW_URL } from "@/lib/site";

const voices = [
  {
    quote:
      "For ten years I chewed on one side and smiled with my mouth closed. He didn't start with a procedure — he started with my story. That's when I knew this was different.",
    who: "Full-arch implant rehabilitation",
    where: "Chennai",
    featured: true,
  },
  {
    quote:
      "We came with three different treatment plans and total confusion. He put my father's scan on the screen and explained all three — including the two he doesn't do.",
    who: "Daughter of a patient · Second opinion",
    where: "Coimbatore",
  },
  {
    quote:
      "I was told my mother was too old for implants. Dr. Yogesh asked about her health, her bone and what she could maintain — not her age.",
    who: "Son of a patient · Implant overdenture",
    where: "Chennai",
  },
  {
    quote:
      "The online screening call saved us a trip. By the time we travelled to Chennai, he already understood the case.",
    who: "Full-mouth rehabilitation",
    where: "Madurai",
  },
  {
    quote:
      "I approved my new smile on a trial before a single tooth was touched. No surprises on the final day — I had already seen it in the mirror.",
    who: "Smile rehabilitation · Veneers",
    where: "Chennai",
  },
];

export default function Testimonials() {
  const featured = voices.find((v) => v.featured);
  const rest = voices.filter((v) => !v.featured);

  return (
    <section
      data-testid="testimonials-section"
      id="voices"
      className="py-28 lg:py-36 bg-white border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-16 lg:mb-20 max-w-2xl">
          <Overline>Patient voices</Overline>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.1]">
            What patients and families <em className="text-slate-500">say afterwards</em>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <figure data-testid="testimonial-featured" className="h-full border-l-2 border-foreground pl-8 lg:pl-10 flex flex-col justify-between">
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.25]">
                “{featured.quote}”
              </blockquote>
              <figcaption className="mt-10 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                {featured.who} · {featured.where}
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {rest.map((v, i) => (
              <Reveal key={v.who} delay={0.06 * i} className="bg-white">
                <figure data-testid={`testimonial-${i + 1}`} className="p-7 lg:p-8 h-full flex flex-col justify-between">
                  <blockquote className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    “{v.quote}”
                  </blockquote>
                  <figcaption className="mt-6 font-mono text-[9px] tracking-[0.2em] uppercase text-slate-400">
                    {v.who} · {v.where}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
            Shared with permission. Names withheld and details lightly edited to
            protect patient privacy. Individual experiences vary — no outcome is promised.
          </p>
          <a
            data-testid="google-review-link"
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-foreground/25 px-6 py-3.5 text-sm hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Treated by Dr. Yogesh? Review us on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
