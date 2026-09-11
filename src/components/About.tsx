export default function About() {
  return (
    <section
      id="about"
      className="mx-auto grid w-[88%] max-w-[1240px] gap-7 py-16 md:grid-cols-[1fr_3fr] md:py-[100px]"
    >
      <div data-reveal className="section-label">
        01 / APPROACH
      </div>
      <div data-reveal>
        <h2>
          Care for the details.
          <br />
          Clarity for the team.
        </h2>
        <div className="grid gap-6 text-sm leading-[1.85] text-muted md:grid-cols-2 md:gap-10">
          <p>
            I’m a full stack developer with experience across web, mobile and
            cloud. Frontend is where I feel most at home: turning complex
            requirements into clear, considered interfaces, with a solid
            understanding of the systems behind them.
          </p>
          <p>
            As a team leader and technical project manager, I’ve connected
            engineering teams with product stakeholders, translated business
            needs into actionable work, and coordinated delivery. I bring the
            same care to the code and the conversations that move a project
            forward.
          </p>
        </div>
        <div className="mt-8 grid gap-4 border-t border-line pt-6 text-xs text-muted sm:grid-cols-3">
          <span>
            Software Engineering
            <br />
            <span className="mt-1 block text-ink">
              Universidad ORT · 2020–2025
            </span>
          </span>
          <span>
            Academic exchange
            <br />
            <span className="mt-1 block text-ink">
              Sapienza, Rome · 2023–2024
            </span>
          </span>
          <span>
            English
            <br />
            <span className="mt-1 block text-ink">
              C1 · Professional proficiency
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
