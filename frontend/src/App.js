import "@/App.css";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import Positioning from "@/components/Positioning";
import WhoShouldConsult from "@/components/WhoShouldConsult";
import Philosophy from "@/components/Philosophy";
import Categories from "@/components/Categories";
import ConsultForm from "@/components/ConsultForm";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.09, duration: 1.1 }}>
      <MotionConfig reducedMotion="user">
        <div className="grain bg-background text-foreground">
          <Navbar />
          <main>
            <Hero />
            <TrustMarquee />
            <Positioning />
            <WhoShouldConsult />
            <Philosophy />
            <Categories />
            <ConsultForm />
            <Faq />
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </MotionConfig>
    </ReactLenis>
  );
}

export default App;
