import { useEffect, useRef } from "react";

export function useShapeMotion() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;
    let scroll = 0;
    let targetX = 0;
    let targetY = 0;
    let targetScroll = 0;

    function paint() {
      frame = 0;
      if (!element || preference.matches) return;
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      scroll += (targetScroll - scroll) * 0.09;
      element.style.setProperty("--shape-x", `${x}px`);
      element.style.setProperty("--shape-y", `${y}px`);
      element.style.setProperty("--shape-scroll", `${scroll}px`);
      element.style.setProperty(
        "--shape-angle",
        `${x * 0.3 + scroll * 0.12}deg`,
      );
      if (
        Math.abs(targetX - x) +
          Math.abs(targetY - y) +
          Math.abs(targetScroll - scroll) >
        0.05
      ) {
        frame = requestAnimationFrame(paint);
      }
    }
    function schedule() {
      if (!frame && !preference.matches) frame = requestAnimationFrame(paint);
    }
    function onScroll() {
      if (!element || preference.matches) return;
      const rect = element.getBoundingClientRect();
      targetScroll =
        Math.max(
          -1,
          Math.min(
            1,
            (window.innerHeight * 0.5 - rect.top - rect.height * 0.5) /
              window.innerHeight,
          ),
        ) * 70;
      schedule();
    }
    function onPointer(event: PointerEvent) {
      if (!element || event.pointerType === "touch" || preference.matches)
        return;
      const rect = element.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 26;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 26;
      schedule();
    }
    function resetPointer() {
      targetX = targetY = 0;
      schedule();
    }
    function onPreference() {
      cancelAnimationFrame(frame);
      frame = 0;
      x = y = scroll = targetX = targetY = targetScroll = 0;
      element?.style.removeProperty("--shape-x");
      element?.style.removeProperty("--shape-y");
      element?.style.removeProperty("--shape-scroll");
      element?.style.removeProperty("--shape-angle");
      if (!preference.matches) onScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    element.addEventListener("pointermove", onPointer);
    element.addEventListener("pointerleave", resetPointer);
    preference.addEventListener("change", onPreference);
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      element.removeEventListener("pointermove", onPointer);
      element.removeEventListener("pointerleave", resetPointer);
      preference.removeEventListener("change", onPreference);
      for (const property of [
        "--shape-x",
        "--shape-y",
        "--shape-scroll",
        "--shape-angle",
      ]) {
        element.style.removeProperty(property);
      }
    };
  }, []);

  return ref;
}
