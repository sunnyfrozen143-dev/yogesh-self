import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Learn from "@/components/Learn";
import Testimonials from "@/components/Testimonials";
import ConsultForm from "@/components/ConsultForm";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Admin from "@/pages/Admin";
import Article from "@/pages/Article";

function Landing() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

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
            <Learn />
            <Testimonials />
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
        <Route path="/learn/:slug" element={<Article />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
