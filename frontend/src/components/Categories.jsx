import { ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "@/components/Reveal";
import { scrollToId } from "@/lib/site";

const categories = [
  {
    title: "Full-Mouth Rehabilitation",
    tags: ["Severely worn teeth", "Multiple missing teeth", "Functional & occlusal rehabilitation", "Complex restorative cases"],
  },
  {
    title: "Full-Arch Implant Rehabilitation",
    tags: ["All-on-4", "All-on-6", "Full-arch fixed teeth", "Implant-supported rehabilitation"],
  },
  {
    title: "Advanced Implant Rehabilitation",
    tags: ["Zygomatic implants", "Pterygoid implants", "Remote anchorage", "Bone grafting & augmentation"],
  },
  {
    title: "Smile & Aesthetic Rehabilitation",
    tags: ["Smile design", "Veneers", "Crowns", "Aesthetic rehabilitation"],
  },
];

export default function Categories() {
  return (
    <section
      data-testid="categories-section"
      id="expertise"
      className="py-28 lg:py-36 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-16 lg:mb-20 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Overline>Clinical scope</Overline>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.1]">
              Four areas of <em className="text-slate-500">specialist focus</em>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground leading-relaxed">
            Not “everyone who needs dental treatment” — patients whose problems
            require specialist planning.
          </p>
        </Reveal>

        <div>
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={0.05 * i}>
              <button
                data-testid={`category-row-${i + 1}`}
                onClick={() => scrollToId("consult")}
                className="group w-full text-left border-t border-border last:border-b py-10 lg:py-12 grid lg:grid-cols-12 gap-6 items-center hover:bg-primary hover:text-primary-foreground hover:px-6 transition-all duration-500"
              >
                <span className="lg:col-span-1 font-serif text-4xl lg:text-5xl text-slate-400 group-hover:text-slate-300 transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="lg:col-span-5 font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                  {cat.title}
                </h3>
                <p className="lg:col-span-5 text-sm text-muted-foreground group-hover:text-slate-300 leading-relaxed transition-colors duration-500">
                  {cat.tags.join("  ·  ")}
                </p>
                <span className="hidden lg:flex lg:col-span-1 justify-end">
                  <ArrowUpRight className="w-6 h-6 text-slate-400 group-hover:text-primary-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
