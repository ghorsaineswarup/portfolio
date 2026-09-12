import "./index.css";

import About from "./components/About";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Learning from "./components/Learning";
import Marquee from "./components/Marquee";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import Skills from "./components/Skills";
import WhatIBuild from "./components/WhatIBuild";

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <About />
        <WhatIBuild />
        <Projects />
        <Journey />
        <Skills />
        <Learning />
        <Contact />
      </main>

      <Footer />
    </>
  );
}