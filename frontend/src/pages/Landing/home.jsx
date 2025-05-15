import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/hero/hero";
import About from "../../components/about/about";
import Fitur from "../../components/fitur/fitur";
import Contact from "../../components/contact/contact";

function Home() {
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

export default Home;
