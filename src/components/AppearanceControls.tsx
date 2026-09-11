import ThemeToggle from "./ThemeToggle";
import FontToggle from "./FontToggle";

export default function AppearanceControls() {
  return (
    <aside className="appearance-controls" aria-label="Appearance settings">
      <ThemeToggle />
      <FontToggle />
    </aside>
  );
}
