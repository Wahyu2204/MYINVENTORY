import Navbar from "../components/LandingPages/navbar";
import Hero from "../components/LandingPages/hero";
import About from "../components/LandingPages/about";
import Fitur from "../components/LandingPages/fitur";
import Contact from "../components/LandingPages/contact";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Fitur />
      <Contact />
    </div>
  );
}
