import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Offers from "@/components/sections/Offers";
import Gallery from "@/components/sections/Gallery";
import Visit from "@/components/sections/Visit";
import Booking from "@/components/sections/Booking";
import AnimationObserver from "@/components/AnimationObserver";
import { fetchServices } from "@/lib/services";

export default async function Home() {
  const services = await fetchServices();

  return (
    <>
      <AnimationObserver />
      <Header />
      <main id="top">
        <Hero />
        <Booking services={services} />
        <About />
        <Offers />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
