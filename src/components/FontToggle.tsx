import { useState } from "react";

export default function FontToggle() {
  const [isMono, setIsMono] = useState(
    () => document.documentElement.dataset.font === "mono",
  );

  function toggleFont() {
    const next = !isMono;
    document.documentElement.dataset.font = next ? "mono" : "sans";
    setIsMono(next);
    try {
      localStorage.setItem("portfolio-font", next ? "mono" : "sans");
    } catch {
      // The control still works when persistent storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleFont}
      aria-label="Monospace typography"
      aria-pressed={isMono}
      title={isMono ? "Switch to sans-serif" : "Switch to monospace"}
      className="flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-line px-2 font-mono text-xs hover:border-ink aria-pressed:border-accent aria-pressed:text-accent"
    >
      Mono
    </button>
  );
}
