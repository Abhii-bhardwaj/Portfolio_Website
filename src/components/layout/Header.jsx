// src/components/layout/Header.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import useThemeStore from "../../Stores/useThemeStore";

const Header = () => {
  const { isDarkMode, darkMode, toggleTheme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Use either isDarkMode or darkMode (they should be the same now)
  const currentTheme = isDarkMode || darkMode;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: "Home", href: "hero" },
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
    { name: "Experience", href: "experience" },
    { name: "Contact", href: "contact" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    // Force document update
    setTimeout(() => {
      const newTheme =
        useThemeStore.getState().isDarkMode ||
        useThemeStore.getState().darkMode;
      document.documentElement.classList.toggle("dark", newTheme);
    }, 0);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? `py-2 shadow-md ${currentTheme ? "bg-gray-900" : "bg-white"}`
          : "py-4 bg-transparent"
      }`}>
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold">
          <span className="text-primary">Dev</span>
          <span className={currentTheme ? "text-white" : "text-gray-900"}>
            Portfolio
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`${
                currentTheme
                  ? "text-gray-200 hover:text-blue-400"
                  : "text-gray-700 hover:text-blue-600"
              } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1`}>
              {link.name}
            </button>
          ))}
          <button
            onClick={handleThemeToggle}
            className={`p-2 rounded-full ${
              currentTheme
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200`}
            aria-label={
              currentTheme ? "Switch to light mode" : "Switch to dark mode"
            }>
            {currentTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex text-right space-x-3 md:hidden">
          <button
            onClick={handleThemeToggle}
            className={`p-2 rounded-full ${
              currentTheme
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200`}
            aria-label={
              currentTheme ? "Switch to light mode" : "Switch to dark mode"
            }>
            {currentTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded ${
              currentTheme ? "text-white" : "text-gray-900"
            }`}
            aria-label="Toggle mobile menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`text-left items-end md:hidden shadow-lg ${
              currentTheme ? "bg-gray-800" : "bg-gray-100"
            }`}>
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col items-end space-y-4 py-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`${
                      currentTheme
                        ? "text-gray-200 hover:text-blue-400"
                        : "text-gray-700 hover:text-blue-600"
                    } transition-colors duration-200 py-2 text-left focus:outline-none focus:ring-2 focus:ring-primary rounded px-2`}>
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
