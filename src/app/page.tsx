import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Rituals from "@/components/sections/Rituals";
import Packages from "@/components/sections/Packages";
import About from "@/components/sections/About";
import Offers from "@/components/sections/Offers";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Book from "@/components/sections/Book";
import Visit from "@/components/sections/Visit";
import AnimationObserver from "@/components/AnimationObserver";

export default function Home() {
  return (
    <>
      <AnimationObserver />
      <Header />
      <main id="top">
        <Hero />
        <Rituals />
        <Packages />
        <About />
        <Offers />
        <Gallery />
        <Testimonials />
        <Book />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
