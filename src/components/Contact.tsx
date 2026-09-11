import { useState } from "react";

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("fefiveiga@gmail.com");
      setCopyStatus("Email copied.");
    } catch {
      setCopyStatus("Copy this address: fefiveiga@gmail.com");
    }
  }
  return (
    <section
      id="contact"
      className="relative [&>h2]:relative [&>h2]:text-[43px] [&>h2]:leading-[1.1] md:[&>h2]:text-[clamp(43px,5vw,68px)] [&>p]:text-[13px] [&>p]:leading-relaxed [&>p]:text-muted md:[&>p]:text-sm mx-auto w-[88%] max-w-[1240px] py-16 md:py-[100px]"
    >
      <div className="mb-7 font-mono text-[10px] tracking-[1.3px] text-muted">
        04 / CONTACT
      </div>

      <h2 data-reveal>
        Something in mind?
        <br />
        Let’s talk.
      </h2>
      <p data-reveal>
        For thoughtful products, engineering challenges and teams that care.
        <br />
        I’d be happy to hear from you.
      </p>
      <a
        data-reveal
        className="inline-flex gap-6 border-b border-ink py-5 text-[clamp(19px,2.5vw,32px)] tracking-tight hover:text-accent md:gap-12"
        href="mailto:fefiveiga@gmail.com"
      >
        fefiveiga@gmail.com <span>↗</span>
      </a>
      <div
        data-reveal
        className="mt-7 flex flex-wrap items-center gap-6 text-xs [&_a:hover]:text-accent [&_button]:py-2 [&_button:hover]:text-accent"
      >
        <a
          href="https://github.com/FedericaBlanco01"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
        <a
          href="https://www.linkedin.com/in/federica-blanco-8b61901a6/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
        <button type="button" onClick={copyEmail}>
          Copy email <span>⧉</span>
        </button>
        <span className="text-accent" role="status">
          {copyStatus}
        </span>
      </div>
    </section>
  );
}
