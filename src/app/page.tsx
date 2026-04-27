import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Treatments from "@/components/sections/Treatments";
import About from "@/components/sections/About";
import Offers from "@/components/sections/Offers";
import Gallery from "@/components/sections/Gallery";
import Visit from "@/components/sections/Visit";
import AnimationObserver from "@/components/AnimationObserver";

export default function Home() {
  return (
    <>
      <AnimationObserver />
      <Header />
      <main id="top">
        <Hero />
        <Treatments />
        <About />
        <Offers />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
