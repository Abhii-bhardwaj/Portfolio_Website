// src/constants/theme.js
export const themeConfig = {
  light: {
    background: "#ffffff",
    backgroundSecondary: "#f9fafb",
    cardBg: "#ffffff",
    text: "#1f2937",
    textSecondary: "#6b7280",
    primary: "#4f46e5", // Indigo-600
    primaryHover: "#4338ca", // Indigo-700
    accent: "#e5e7eb",
    accentHover: "#d1d5db",
    border: "#e5e7eb",
    success: "#10b981", // Green-500
    error: "#ef4444", // Red-500
    warning: "#f59e0b", // Amber-500
  },
  dark: {
    background: "#111827",
    backgroundSecondary: "#1f2937",
    cardBg: "#1f2937",
    text: "#f9fafb",
    textSecondary: "#9ca3af",
    primary: "#818cf8", // Indigo-400
    primaryHover: "#6366f1", // Indigo-500
    accent: "#374151",
    accentHover: "#4b5563",
    border: "#374151",
    success: "#34d399", // Green-400
    error: "#f87171", // Red-400
    warning: "#fbbf24", // Amber-400
  },
};

// CSS variables for use with Tailwind
export const themeVariables = `
  :root {
    --background: ${themeConfig.light.background};
    --backgroundSecondary: ${themeConfig.light.backgroundSecondary};
    --cardBg: ${themeConfig.light.cardBg};
    --text: ${themeConfig.light.text};
    --textSecondary: ${themeConfig.light.textSecondary};
    --primary: ${themeConfig.light.primary};
    --primaryHover: ${themeConfig.light.primaryHover};
    --accent: ${themeConfig.light.accent};
    --accentHover: ${themeConfig.light.accentHover};
    --border: ${themeConfig.light.border};
    --success: ${themeConfig.light.success};
    --error: ${themeConfig.light.error};
    --warning: ${themeConfig.light.warning};
  }
  .dark {
    --background: ${themeConfig.dark.background};
    --backgroundSecondary: ${themeConfig.dark.backgroundSecondary};
    --cardBg: ${themeConfig.dark.cardBg};
    --text: ${themeConfig.dark.text};
    --textSecondary: ${themeConfig.dark.textSecondary};
    --primary: ${themeConfig.dark.primary};
    --primaryHover: ${themeConfig.dark.primaryHover};
    --accent: ${themeConfig.dark.accent};
    --accentHover: ${themeConfig.dark.accentHover};
    --border: ${themeConfig.dark.border};
    --success: ${themeConfig.dark.success};
    --error: ${themeConfig.dark.error};
    --warning: ${themeConfig.dark.warning};
  }
`;
