import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import CaseStories from "@/components/CaseStories";
import ConsultForm from "@/components/ConsultForm";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Admin from "@/pages/Admin";

function Landing() {
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
            <CaseStories />
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
