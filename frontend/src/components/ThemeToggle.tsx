import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="pill" type="button" onClick={toggleTheme}>
      {theme === "dark" ? "☀️(még nem jó!)" : "🌙(még nem jó!)"}
    </button>
  );
}