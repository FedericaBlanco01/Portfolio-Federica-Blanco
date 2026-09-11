import { useEffect, useRef, useState } from "react";

export function shouldShowEntrance() {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.location.hash ||
    window.scrollY > 0
  )
    return false;
  try {
    return sessionStorage.getItem("portfolio-entered") !== "yes";
  } catch {
    return true;
  }
}

export default function Entrance({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => {
      if (media.matches) onComplete();
    };
    const exit = window.setTimeout(() => setLeaving(true), 850);
    const finish = window.setTimeout(onComplete, 1750);
    media.addEventListener("change", reduce);
    return () => {
      clearTimeout(exit);
      clearTimeout(finish);
      media.removeEventListener("change", reduce);
      document.body.style.overflow = originalOverflow;
      if (overlay.current?.contains(document.activeElement)) {
        requestAnimationFrame(() =>
          document
            .querySelector<HTMLElement>("#home")
            ?.focus({ preventScroll: true }),
        );
      }
    };
  }, [onComplete]);

  return (
    <div
      ref={overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Federica Blanco’s portfolio"
      className={`entrance ${leaving ? "entrance-leaving" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") onComplete();
      }}
    >
      <div className="entrance-panel entrance-panel-top" />
      <div className="entrance-panel entrance-panel-bottom" />
      <div className="entrance-identity">
        <span className="entrance-overline">
          SOFTWARE ENGINEER & TEAM LEADER
        </span>
        <div className="entrance-name">
          Federica Blanco<span>.</span>
        </div>
        <span className="entrance-line" />
        <span className="entrance-caption">CODE / CRAFT / COLLABORATION</span>
      </div>
      <button
        autoFocus
        type="button"
        onClick={onComplete}
        className="entrance-skip"
      >
        Skip intro ↗
      </button>
    </div>
  );
}
