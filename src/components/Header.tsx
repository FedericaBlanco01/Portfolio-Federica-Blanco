import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  return (
    <header className="relative mx-auto flex h-20 w-[88%] max-w-[1240px] items-center justify-between border-b border-line lg:h-[104px]">
      <a
        href="#home"
        aria-label="Federica Blanco, home"
        className="text-[39px] font-extrabold tracking-[-4px]"
      >
        fb
        <span className="ml-1 inline-block align-top text-[28px] tracking-normal text-accent">
          .
        </span>
      </a>
      <div className="ml-auto flex items-center gap-1.5 lg:order-last lg:ml-6">
        <button
          ref={menuButton}
          type="button"
          className="flex min-h-11 items-center gap-2 rounded-sm border border-line px-2 py-2.5 text-xs lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          Menu <span aria-hidden="true">{isOpen ? "−" : "＋"}</span>
        </button>
      </div>
      <nav
        id="navigation"
        aria-label="Main navigation"
        className={`${isOpen ? "flex" : "hidden"} absolute top-[70px] right-0 left-0 z-10 flex-col gap-6 border border-line bg-paper p-6 text-[13px] shadow-lg lg:static lg:ml-auto lg:flex lg:flex-row lg:items-center lg:gap-9 lg:border-0 lg:p-0 lg:shadow-none`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="hover:text-accent"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setIsOpen(false)}
          className="flex justify-between gap-6 rounded-sm border border-ink px-5 py-3 hover:text-accent"
        >
          Get in touch <span>↗</span>
        </a>
      </nav>
    </header>
  );
}
