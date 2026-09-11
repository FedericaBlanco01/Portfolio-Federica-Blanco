export type Form = "Orbit" | "Sphere" | "Wave";
export type Point = { x: number; y: number; z: number };
export const POINT_COUNT = 720;

export function sculpturePoint(index: number, form: Form): Point {
  const u = ((index % 36) / 36) * Math.PI * 2;
  const v = (Math.floor(index / 36) / 20) * Math.PI * 2;
  if (form === "Orbit") {
    const radius = 1 + 0.36 * Math.cos(v);
    return {
      x: radius * Math.cos(u),
      y: radius * Math.sin(u),
      z: 0.36 * Math.sin(v),
    };
  }
  if (form === "Sphere") {
    const y = 1 - (2 * (index + 0.5)) / POINT_COUNT;
    const radius = Math.sqrt(1 - y * y);
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    return {
      x: radius * Math.cos(angle) * 1.3,
      y: y * 1.3,
      z: radius * Math.sin(angle) * 1.3,
    };
  }
  const x = ((index % 36) / 35 - 0.5) * 2.7;
  const y = (Math.floor(index / 36) / 19 - 0.5) * 2.2;
  return { x, y, z: Math.sin(x * 2.4 + y * 2) * 0.4 };
}
