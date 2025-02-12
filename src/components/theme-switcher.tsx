"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function handleClick() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <button onClick={handleClick}>
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
