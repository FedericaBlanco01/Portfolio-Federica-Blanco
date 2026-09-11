import { useCallback, useState } from "react";
import Entrance, { shouldShowEntrance } from "./components/Entrance";
import AppearanceControls from "./components/AppearanceControls";
import { useScrollReveal } from "./hooks/useScrollReveal";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Stack from "./components/Stack";
import Contact from "./components/Contact";

export default function App() {
  const mainRef = useScrollReveal();
  const [entering, setEntering] = useState(shouldShowEntrance);
  const completeEntrance = useCallback(() => {
    try {
      sessionStorage.setItem("portfolio-entered", "yes");
    } catch {}
    setEntering(false);
  }, []);
  return (
    <>
      {entering && <Entrance onComplete={completeEntrance} />}
      <div inert={entering} className={entering ? "intro-active" : undefined}>
        <a
          className="fixed -top-25 left-5 z-10 bg-ink p-4 text-paper focus:top-4"
          href="#home"
        >
          Skip to content
        </a>
        <Header />
        <AppearanceControls />
        <main ref={mainRef}>
          <Hero />
          <About />
          <Experience />
          <Stack />
          <Contact />
        </main>
        <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-line py-6 [&>p]:text-[10px] [&>p]:text-muted [&>span]:text-[10px] [&>span]:text-muted mx-auto w-[88%] max-w-[1240px]">
          <a
            className="text-[33px] font-extrabold tracking-[-4px] md:text-[39px] [&_span]:ml-[5px] [&_span]:inline-block [&_span]:align-top [&_span]:text-[28px] [&_span]:tracking-normal [&_span]:text-accent"
            href="#home"
            aria-label="Back to top"
          >
            fb<span>.</span>
          </a>
          <p>Based in Montevideo, Uruguay.</p>
          <span>© {new Date().getFullYear()} Federica Blanco</span>
        </footer>
      </div>
    </>
  );
}
