import { useEffect, useRef, useState } from "react";
import {
  POINT_COUNT,
  sculpturePoint,
  type Form,
  type Point,
} from "../lib/sculpture";

export default function HeroArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const rotation = useRef({ x: -0.5, y: 0.35 });
  const [form, setForm] = useState<Form>("Orbit");
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    change();
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const target = Array.from({ length: POINT_COUNT }, (_, i) =>
      sculpturePoint(i, form),
    );
    if (!pointsRef.current.length || reduced)
      pointsRef.current = target.map((p) => ({ ...p }));
    let frame = 0,
      width = 0,
      height = 0,
      previousTime = 0;
    let visible = true;
    let dragging = false;
    let lastX = 0,
      lastY = 0;
    let pointer = { x: -10000, y: -10000 };
    let accent = "#ff2020";

    function schedule() {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    }
    function draw(time: number) {
      frame = 0;
      if (!context || !canvas) return;
      const delta = Math.min((time - (previousTime || time)) / 16.67, 2);
      previousTime = time;
      if (playing && !reduced && !dragging)
        rotation.current.y += 0.0025 * delta;
      context.clearRect(0, 0, width, height);
      const { x: rx, y: ry } = rotation.current;
      const cosX = Math.cos(rx),
        sinX = Math.sin(rx),
        cosY = Math.cos(ry),
        sinY = Math.sin(ry);
      let changing = false;
      const projected = pointsRef.current
        .map((p, i) => {
          const t = target[i];
          const difference =
            Math.abs(t.x - p.x) + Math.abs(t.y - p.y) + Math.abs(t.z - p.z);
          if (difference > 0.001) changing = true;
          const ease = reduced ? 1 : 1 - Math.pow(0.91, Math.max(delta, 0.5));
          p.x += (t.x - p.x) * ease;
          p.y += (t.y - p.y) * ease;
          p.z += (t.z - p.z) * ease;
          const x = p.x * cosY - p.z * sinY;
          const z = p.x * sinY + p.z * cosY;
          const y = p.y * cosX - z * sinX;
          const depth = p.y * sinX + z * cosX;
          const perspective = 4 / (4 - depth);
          const scale = width * 0.235;
          let px = width / 2 + x * scale * perspective;
          let py = height / 2 + y * scale * perspective;
          if (!reduced && !dragging) {
            const dx = px - pointer.x,
              dy = py - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0 && distance < 85) {
              const force = (1 - distance / 85) ** 2 * 24;
              px += (dx / distance) * force;
              py += (dy / distance) * force;
            }
          }
          return {
            x: px,
            y: py,
            depth,
            size: Math.max(0.8, (width / 260) * perspective),
          };
        })
        .sort((a, b) => a.depth - b.depth);
      context.fillStyle = accent;
      for (const p of projected) {
        context.globalAlpha = Math.max(0.2, Math.min(1, (p.depth + 2) / 3.2));
        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      if ((playing && !reduced) || changing) schedule();
    }
    function resize() {
      if (!canvas || !context) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      accent =
        getComputedStyle(canvas).getPropertyValue("--color-accent").trim() ||
        "#ff2020";
      schedule();
    }
    function move(event: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (dragging) {
        rotation.current.y += (event.clientX - lastX) * 0.009;
        rotation.current.x += (event.clientY - lastY) * 0.009;
      }
      lastX = event.clientX;
      lastY = event.clientY;
      schedule();
    }
    function down(event: PointerEvent) {
      if (!event.isPrimary || event.button !== 0) return;
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas?.setPointerCapture(event.pointerId);
    }
    function up() {
      dragging = false;
      pointer = { x: -10000, y: -10000 };
      schedule();
    }
    function key(event: KeyboardEvent) {
      if (
        !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
      )
        return;
      event.preventDefault();
      if (event.key === "ArrowLeft") rotation.current.y -= 0.15;
      if (event.key === "ArrowRight") rotation.current.y += 0.15;
      if (event.key === "ArrowUp") rotation.current.x -= 0.15;
      if (event.key === "ArrowDown") rotation.current.x += 0.15;
      schedule();
    }
    function visibility() {
      previousTime = 0;
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else schedule();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
      } else schedule();
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const themeObserver = new MutationObserver(resize);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("pointerleave", up);
    canvas.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", visibility);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("pointerleave", up);
      canvas.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [form, playing, reduced]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label={`Interactive red ${form.toLowerCase()} sculpture. Drag or use arrow keys to rotate.`}
        aria-describedby="sculpture-help"
        className="block aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-accent"
      >
        Interactive red particle sculpture.
      </canvas>
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center pb-2">
        <div
          className="mx-auto flex w-fit flex-wrap justify-center gap-1"
          role="group"
          aria-label="Sculpture shape"
        >
          {(["Orbit", "Sphere", "Wave"] as const).map((shape) => (
            <button
              key={shape}
              type="button"
              aria-pressed={form === shape}
              onClick={() => setForm(shape)}
              className="min-h-11 px-3 font-mono text-[10px] text-muted hover:text-ink aria-pressed:text-accent"
            >
              {shape}
            </button>
          ))}
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              aria-label={
                playing ? "Pause automatic rotation" : "Play automatic rotation"
              }
              className="min-h-11 px-3 font-mono text-[10px] text-muted hover:text-ink"
            >
              {playing ? "Pause Ⅱ" : "Play ▷"}
            </button>
          )}
        </div>
        <p
          id="sculpture-help"
          className="mt-1 text-center font-mono text-[9px] tracking-wider text-muted"
        >
          DRAG TO ROTATE · CHANGE FORM ABOVE
        </p>
      </div>
    </div>
  );
}
