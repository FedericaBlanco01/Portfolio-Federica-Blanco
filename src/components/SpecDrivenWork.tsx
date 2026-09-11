export default function SpecDrivenWork() {
  return (
    <div
      data-reveal
      className="mt-16 grid gap-8 border-t border-line pt-10 md:mt-20 md:grid-cols-[1fr_2fr] md:gap-12"
    >
      <div>
        <p className="section-label">RECENT WORK / AI & ENGINEERING</p>
        <h3 className="text-2xl leading-tight tracking-tight">
          Spec-driven development
        </h3>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          OpenSpec · Claude · Human review
        </p>
      </div>
      <div>
        <p className="max-w-2xl text-sm leading-[1.85] text-muted">
          I co-developed an OpenSpec boilerplate to bring spec-driven development
          into our day-to-day work: a shared structure for defining changes,
          reviewing technical decisions and guiding implementation with Claude.
        </p>
        <ol className="mt-7 space-y-6">
          <li className="grid grid-cols-[24px_1fr] gap-3">
            <span className="pt-1 font-mono text-[10px] text-accent">01</span>
            <div>
              <h4 className="text-sm font-medium">A reusable workflow</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Structured changes around <code>proposal.md</code>,{" "}
                <code>design.md</code> and <code>tasks.md</code>, with reusable
                skills and branch naming conventions built into the boilerplate.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[24px_1fr] gap-3">
            <span className="pt-1 font-mono text-[10px] text-accent">02</span>
            <div>
              <h4 className="text-sm font-medium">Human review before code</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We reviewed and corrected the specs together before asking
                Claude to implement them. Scope and design decisions lived in
                shared documents, with follow-up prompts to guide implementation.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[24px_1fr] gap-3">
            <span className="pt-1 font-mono text-[10px] text-accent">03</span>
            <div>
              <h4 className="text-sm font-medium">Managing spec drift</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                When implementation diverged from the plan, we revisited and
                corrected the specs to keep them useful as the source of truth
                for the next change.
              </p>
            </div>
          </li>
        </ol>
        <p className="mt-7 max-w-2xl border-l border-accent pl-4 text-sm leading-[1.85] text-muted">
          The hardest part was making the workflow collaborative. Working in
          two-person teams meant agreeing on the specs and keeping both people
          aligned as the implementation evolved. That coordination took more
          work than handing a task to Claude.
        </p>
      </div>
    </div>
  );
}
