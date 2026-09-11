import { useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "light" ? "#f7f6f2" : "#0b0b0b");
    setTheme(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      // Switching still works when the browser disables persistent storage.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex min-h-11 items-center gap-2.5 rounded-sm border border-line px-3 text-xs hover:border-ink"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </>
        ) : (
          <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />
        )}
      </svg>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
