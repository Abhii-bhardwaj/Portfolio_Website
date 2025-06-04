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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? `py-2 shadow-lg backdrop-blur-md ${
                currentTheme
                  ? "bg-gray-900/90 border-b border-gray-700"
                  : "bg-white/90 border-b border-gray-200"
              }`
            : "py-4 bg-transparent"
        }`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl font-bold z-50">
            <span className="text-primary">Abhishek's </span>
            <span className={currentTheme ? "text-white" : "text-gray-900"}>
              Portfolio
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className={`${
                  currentTheme
                    ? "text-gray-200 hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded px-3 py-2 font-medium relative group`}>
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}

            {/* Theme Toggle - Desktop */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={handleThemeToggle}
              className={`p-2 rounded-full transition-all duration-300 ${
                currentTheme
                  ? "bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:scale-110"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700 hover:scale-110"
              } focus:outline-none focus:ring-2 focus:ring-primary`}
              aria-label={
                currentTheme ? "Switch to light mode" : "Switch to dark mode"
              }>
              <motion.div
                key={currentTheme ? "sun" : "moon"}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}>
                {currentTheme ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </motion.button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-full transition-all duration-300 ${
                currentTheme
                  ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-primary`}
              aria-label={
                currentTheme ? "Switch to light mode" : "Switch to dark mode"
              }>
              <motion.div
                key={currentTheme ? "sun" : "moon"}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}>
                {currentTheme ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg transition-all duration-300 ${
                currentTheme
                  ? "text-white hover:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}>
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 bottom-0 z-50 w-72 shadow-2xl md:hidden ${
                currentTheme ? "bg-gray-900" : "bg-white"
              }`}>
              {/* Mobile Menu Header */}
              <div
                className={`flex items-center justify-between p-6 border-b ${
                  currentTheme ? "border-gray-700" : "border-gray-200"
                }`}>
                <div className="text-lg font-bold">
                  <span className="text-primary">Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    currentTheme
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(link.href)}
                    className={`${
                      currentTheme
                        ? "text-gray-200 hover:text-blue-400 hover:bg-gray-800"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    } transition-all duration-200 py-3 px-4 text-left rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary group`}>
                    <span className="flex items-center justify-between">
                      {link.name}
                      <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}>
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 border-t ${
                  currentTheme ? "border-gray-700" : "border-gray-200"
                }`}>
                <div
                  className={`text-sm text-center ${
                    currentTheme ? "text-gray-400" : "text-gray-500"
                  }`}>
                  Abhishek's Portfolio
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
