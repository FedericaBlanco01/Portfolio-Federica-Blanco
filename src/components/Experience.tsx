import { experience } from "../data/experience";
import Tags from "./Tags";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 md:py-[100px] mx-auto w-[88%] max-w-[1240px] border-t border-line"
    >
      <div
        data-reveal
        className="mb-9 flex flex-col gap-7 md:flex-row md:items-end md:justify-between [&_h2]:mb-0 [&>p]:max-w-60 [&>p]:text-[13px] [&>p]:leading-relaxed [&>p]:text-muted"
      >
        <div>
          <div className="mb-7 font-mono text-[10px] tracking-[1.3px] text-muted">
            02 / EXPERIENCE
          </div>
          <h2>
            Engineering with <em>ownership.</em>
          </h2>
        </div>
        <span className="hidden font-mono text-[9px] tracking-wider text-muted lg:inline">
          DEVELOPMENT / DELIVERY / LEADERSHIP
        </span>
      </div>
      {experience.map((job, index) => (
        <article
          data-reveal
          key={job.company}
          className="grid gap-2.5 border-t border-line py-7 last:pb-0 md:grid-cols-[1fr_3fr] md:gap-7 md:py-9"
        >
          <div className="font-mono text-[10px] leading-relaxed tracking-wider text-muted md:pt-2.5">
            {job.date}
            {job.current && (
              <span className="ml-3 font-sans text-[11px] tracking-normal text-accent md:ml-0 md:mt-3 md:block">
                Current role
              </span>
            )}
          </div>
          <div className="[&_h4]:mt-2.5 [&_h4]:mb-5 [&_h4]:text-[13px] [&_h4]:font-normal [&_h4]:text-accent [&_p]:max-w-[740px] [&_p]:text-sm [&_p]:leading-[1.85] [&_p]:text-muted">
            <div className="flex items-center justify-between [&_h3]:text-[26px] [&_h3]:font-medium [&_h3]:tracking-tight md:[&_h3]:text-[28px] [&>span]:font-mono [&>span]:text-xs [&>span]:text-muted">
              <h3>{job.company}</h3>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h4>{job.role}</h4>
            <p>{job.description}</p>
            {job.projects && (
              <div
                className={`mt-7 grid gap-6 ${job.projects.length > 1 ? "md:grid-cols-2" : ""}`}
              >
                {job.projects.map((project) => (
                  <div key={project.name} className="border-l border-line pl-5">
                    <span className="font-mono text-[10px] tracking-wide text-muted">
                      {project.focus}
                    </span>
                    <h5 className="mt-2 mb-3 text-base font-medium text-ink">
                      {project.name}
                    </h5>
                    <p>{project.description}</p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex min-h-11 items-center gap-3 text-xs hover:text-accent"
                      >
                        Visit {project.name} <span aria-hidden="true">↗</span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            {job.details && (
              <details>
                <summary>
                  Scope & responsibilities <span>＋</span>
                </summary>
                <p>{job.details}</p>
              </details>
            )}
            <Tags items={job.tags} />
          </div>
        </article>
      ))}
    </section>
  );
}
