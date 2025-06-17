// src/components/layout/Layout.jsx
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import useThemeStore from "../../Stores/useThemeStore";
import { themeConfig } from "../../constants/theme";

const Layout = ({ children }) => {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    // Apply theme variables
    const theme = isDarkMode ? themeConfig.dark : themeConfig.light;
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });

    // Toggle dark class
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen font-sans bg-background text-text transition-colors duration-200">
      <Header />
      <main className="md:pt-20 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
