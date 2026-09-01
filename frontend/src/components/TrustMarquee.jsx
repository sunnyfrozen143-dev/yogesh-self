import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function TrustMarquee() {
  const { t } = useLang();

  return (
    <div
      data-testid="trust-marquee"
      className="border-y border-border py-5 bg-background"
    >
      <Marquee speed={28} gradient={false} pauseOnHover>
        {t.marquee.map((item) => (
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
