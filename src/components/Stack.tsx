import Tags from "./Tags";
import SpecDrivenWork from "./SpecDrivenWork";

export default function Stack() {
  return (
    <section id="stack" className="border-y border-line bg-surface">
      <div className="mx-auto w-[88%] max-w-[1240px] py-16 md:py-[100px]">
        <div data-reveal className="mb-9 [&_h2]:mb-0">
          <div>
            <div className="mb-7 font-mono text-[10px] tracking-[1.3px] text-muted">
              03 / CAPABILITIES
            </div>
            <h2>Technologies & skills</h2>
          </div>
        </div>
        <div className="mt-9 grid gap-9 md:mt-12 md:grid-cols-3 md:[&>article:nth-child(2)]:[--reveal-delay:100ms] md:[&>article:nth-child(3)]:[--reveal-delay:200ms] [&>article]:border-t [&>article]:border-line [&>article]:pt-6 [&_h3]:mb-3 [&_h3]:text-[19px] [&_h3]:font-medium [&_p]:text-xs [&_p]:text-muted">
          <article data-reveal>
            <h3>Frontend & mobile</h3>
            <p>Interfaces across web and mobile.</p>
            <Tags
              items={[
                "React",
                "React Native",
                "TypeScript",
                "Flutter",
                "Dart",
                "Cubit",
                "FFmpeg",
                "Tailwind CSS",
                "Zustand",
                "React Query",
              ]}
            />
          </article>
          <article data-reveal>
            <h3>Backend & cloud</h3>
            <p>APIs, application logic and infrastructure.</p>
            <Tags
              items={[
                "Node.js",
                "Express.js",
                "PHP",
                "Laravel",
                "Firebase",
                "SQL",
                "AWS",
                "Docker",
                "Git",
              ]}
            />
          </article>
          <article data-reveal>
            <h3>Leadership & delivery</h3>
            <p>Clear priorities. Shared understanding.</p>
            <Tags
              items={[
                "Technical leadership",
                "Agile / Scrum",
                "Planning",
                "Client communication",
                "Requirements",
              ]}
            />
          </article>
        </div>
        <SpecDrivenWork />
      </div>
    </section>
  );
}
