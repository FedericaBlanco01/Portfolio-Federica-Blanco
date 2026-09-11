import HeroArt from "./HeroArt";

export default function Hero() {
  return (
    <section
      id="home"
      tabIndex={-1}
      className="hero-stage relative mx-auto flex min-h-[calc(100svh-80px)] w-[88%] max-w-[1440px] flex-col pt-7 md:min-h-[calc(100svh-104px)] md:pt-9"
    >
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[1.3px] text-muted">
        <span className="flex items-center gap-2.5">
          <span className="size-1.5 bg-accent" />
          MONTEVIDEO, URUGUAY
        </span>
        <span className="hidden sm:inline">
          SOFTWARE ENGINEER / TEAM LEADER
        </span>
      </div>
      <div className="hero-entrance relative flex flex-1 flex-col justify-center py-12 md:min-h-[600px] md:py-20">
        <div className="relative z-10 w-fit md:pointer-events-none">
          <p className="mb-5 font-mono text-[10px] tracking-[2px] text-muted">
            ENGINEERING WITH INTENT.
          </p>
          <h1 className="hero-name">
            Federica
            <br />
            <span className="inline-flex items-baseline gap-2">
              Blanco<span className="text-accent">.</span>
            </span>
          </h1>
          <p className="mt-7 max-w-[320px] text-sm leading-relaxed text-muted md:text-base">
            Full stack thinking.
            <br />
            <span className="text-ink">Frontend precision. People first.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-7 text-xs md:pointer-events-auto">
            <a
              href="#experience"
              className="group inline-flex items-center gap-5 border-b border-accent py-3"
            >
              Explore my work{" "}
              <span className="text-accent transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                ↗
              </span>
            </a>
            <a
              href="/assets/CV_Federica_Blanco.pdf"
              download
              className="inline-flex items-center gap-4 py-3 text-muted hover:text-ink"
            >
              Download CV <span>↓</span>
            </a>
          </div>
        </div>
        <div className="mt-6 w-full self-center md:absolute md:inset-y-0 md:right-[-3%] md:mt-0 md:flex md:w-[55%] md:items-center">
          <HeroArt />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-line py-6 font-mono text-[9px] tracking-wider text-muted">
        <span>CODE / CRAFT / COLLABORATION</span>
        <a href="#about" className="flex items-center gap-4 hover:text-ink">
          SCROLL TO EXPLORE{" "}
          <span className="scroll-cue inline-block text-accent">↓</span>
        </a>
      </div>
    </section>
  );
}
