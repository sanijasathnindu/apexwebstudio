import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import StructuredData from "@/components/StructuredData";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Manifesto from "@/components/Manifesto";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <StructuredData />
      <Preloader />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
