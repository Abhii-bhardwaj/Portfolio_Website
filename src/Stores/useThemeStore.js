// src/store/useThemeStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set, get) => ({
      darkMode: false,
      isDarkMode: false, // Add this for consistency

      toggleDarkMode: () => {
        const newDarkMode = !get().darkMode;
        set({
          darkMode: newDarkMode,
          isDarkMode: newDarkMode, // Keep both in sync
        });
        return newDarkMode;
      },

      // Add toggleTheme method that Header.jsx is expecting
      toggleTheme: () => {
        const newDarkMode = !get().darkMode;
        set({
          darkMode: newDarkMode,
          isDarkMode: newDarkMode,
        });
        return newDarkMode;
      },

      setTheme: (isDark) => {
        set({
          darkMode: isDark,
          isDarkMode: isDark,
        });
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({
        darkMode: state.darkMode,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

export default useThemeStore;
