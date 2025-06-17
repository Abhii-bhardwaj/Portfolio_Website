import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import useThemeStore from "../../Stores/useThemeStore";

// Define styles object within the component file
const styles = {
  dark: {
    header: "bg-gray-900/90 border-gray-700",
    logo: "text-white",
    nav: "text-gray-100 hover:text-blue-400",
    button: "bg-gray-700 hover:bg-gray-600 text-yellow-400",
    mobile: "bg-gray-900 border-gray-700 text-gray-100",
    mobileNav: "text-gray-100 hover:text-blue-400", // Added for mobile nav consistency
  },
  light: {
    header: "bg-white/90 border-gray-200",
    logo: "text-gray-900",
    nav: "text-gray-800 hover:text-blue-600",
    button: "bg-gray-200 hover:bg-gray-300 text-gray-700",
    mobile: "bg-white border-gray-200 text-gray-800",
    mobileNav: "text-gray-800 hover:text-blue-600", // Added for mobile nav consistency
  },
  base: {
    header: "fixed top-0 left-0 right-0 z-50 py-2",
    container: "container mx-auto px-2 sm:px-4 flex justify-between items-center",
    logo: "text-sm sm:text-base font-bold",
    nav: "hidden md:flex items-center space-x-3",
    navLink:
      "px-2 py-1 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded relative group",
    underline:
      "absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full",
    button:
      "p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 z-50",
    mobile: "fixed top-0 right-0 bottom-0 z-50 w-32 max-w-[80%]",
    mobileNav: "flex flex-col space-y-0.5 p-3",
    mobileLink:
      "py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group",
    footer: "absolute bottom-0 left-0 right-0 p-3 border-t text-xs text-center",
  },
};

const navLinks = [
  { name: "Home", href: "hero" },
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Experience", href: "experience" },
  { name: "Contact", href: "contact" },
];

const Header = memo(() => {
  const { isDarkMode = false, toggleTheme } = useThemeStore();
  const theme = isDarkMode ? styles.dark : styles.light;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize scroll state on mount
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll(); // Run on mount to set initial state
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Scroll to section
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Theme toggle
  const toggleThemeAndClass = () => {
    toggleTheme();
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <>
      <header
        className={`${styles.base.header} ${theme.header} ${
          scrolled ? "shadow-md" : ""
        }`} // Simplified background logic
      >
        <div className={styles.base.container}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.base.logo}
          >
            <span className="text-blue-500">Abhishek's </span>
            <span className={theme.logo}>Portfolio</span>
          </motion.div>
          <nav className={styles.base.nav}>
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => scrollToSection(link.href)}
                className={`${styles.base.navLink} ${theme.nav}`}
              >
                {link.name}
                <span className={styles.base.underline} />
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }} // Added delay
              onClick={toggleThemeAndClass}
              className={`${styles.base.button} ${theme.button} `} // Ensure button visibility
              aria-label={isDarkMode ? "Light mode" : "Dark mode"}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
          </nav>
          <div className="flex items-center space-x-1  md:hidden">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={toggleThemeAndClass}
              className={`${styles.base.button} ${theme.button} min-w-[32px] min-h-[32px]`}
              aria-label={isDarkMode ? "Light mode" : "Dark mode"}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${styles.base.button} ${theme.nav} min-w-[32px] min-h-[32px]`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-gray-800/50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2 }}
              className={`${styles.base.mobile} ${theme.mobile}`}
            >
              <div
                className={`flex items-center justify-between p-3 border-b ${theme.mobile}`}
              >
                <div className="text-sm font-bold text-blue-500">Menu</div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${styles.base.button} ${theme.nav}`}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>
              <nav className={styles.base.mobileNav}>
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`${styles.base.mobileLink} ${theme.mobileNav}`}
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
              <div className={`${styles.base.footer} ${theme.mobile}`}>
                Abhishek's Portfolio
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Header.displayName = "Header";

export default Header;