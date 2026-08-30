import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";

const items = [
  "MDS Prosthodontics",
  "TRIOS 3 Digital Workflow",
  "Specialist-led Assessment",
  "Full-Arch Implant Rehabilitation",
  "Structured Follow-up & Maintenance",
  "Family-inclusive Consultations",
  "Evidence-led Treatment Planning",
];

export default function TrustMarquee() {
  return (
    <div
      data-testid="trust-marquee"
      className="border-y border-border py-5 bg-background"
    >
      <Marquee speed={28} gradient={false} pauseOnHover>
        {items.map((item) => (
          <span key={item} className="flex items-center">
            <span className="font-mono text-xs tracking-[0.22em] uppercase text-muted-foreground px-6">
              {item}
            </span>
            <Asterisk className="w-4 h-4 text-foreground/40" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
