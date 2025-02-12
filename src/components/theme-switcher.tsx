"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isLightTheme = currentTheme === "light";
  const Icon = isLightTheme ? SunIcon : MoonIcon;

  function toggleTheme() {
    setTheme(isLightTheme ? "dark" : "light");
  }

  return (
    <button onClick={toggleTheme}>
      <Icon className="h-5 w-5" />
    </button>
  );
}
