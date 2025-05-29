// src/hooks/useTheme.js
import { useEffect } from "react";
import useThemeStore from "../Stores/useThemeStore.js";

const useTheme = () => {
  const { darkMode, isDarkMode, toggleDarkMode, toggleTheme, setTheme } =
    useThemeStore();

  useEffect(() => {
    // Get saved theme or system preference
    const savedTheme = localStorage.getItem("theme-storage");
    let shouldBeDark = false;

    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        shouldBeDark =
          parsedTheme.state?.darkMode || parsedTheme.state?.isDarkMode || false;
      } catch (e) {
        // If parsing fails, check for simple string
        shouldBeDark = savedTheme === "dark";
      }
    } else {
      // No saved preference, use system preference
      shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    // Set the theme in store
    setTheme(shouldBeDark);

    // Apply to document
    document.documentElement.classList.toggle("dark", shouldBeDark);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Only auto-switch if no manual preference is saved
      const hasManualPreference = localStorage.getItem("theme-storage");
      if (!hasManualPreference) {
        setTheme(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme]);

  // Update document class whenever theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode || isDarkMode);
    localStorage.setItem("theme", darkMode || isDarkMode ? "dark" : "light");
  }, [darkMode, isDarkMode]);

  return {
    darkMode: darkMode || isDarkMode,
    isDarkMode: darkMode || isDarkMode,
    toggleDarkMode,
    toggleTheme,
    isDark: darkMode || isDarkMode,
    isLight: !(darkMode || isDarkMode),
  };
};

export default useTheme;
