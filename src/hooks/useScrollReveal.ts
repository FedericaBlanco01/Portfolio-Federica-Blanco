import { useEffect, useRef } from "react";

/** Progressive enhancement: content stays visible if motion or observers are unavailable. */
export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let observer: IntersectionObserver | undefined;

    function reveal(element: HTMLElement) {
      element.classList.remove("reveal-pending");
      observer?.unobserve(element);
    }

    function configure() {
      observer?.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
      if (preference.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
          });
        },
        { threshold: 0, rootMargin: "0px 0px -40px 0px" },
      );
      elements.forEach((element) => {
        // Never hide content already visible on a restored scroll position or deep link.
        if (element.getBoundingClientRect().top >= window.innerHeight) {
          element.classList.add("reveal-pending");
          observer?.observe(element);
        }
      });
    }

    function onFocus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-reveal]");
      if (element) reveal(element);
    }

    configure();
    preference.addEventListener("change", configure);
    root.addEventListener("focusin", onFocus);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      root.removeEventListener("focusin", onFocus);
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, []);

  return ref;
}
