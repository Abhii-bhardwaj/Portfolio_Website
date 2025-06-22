import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import SocialLinks from "../ui/SocialLinks";
import useThemeStore from "../../Stores/useThemeStore";

// CSS constants
const BASE_CLASSES = {
  footer: "py-12 transition-all duration-200",
  darkFooter: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
  lightFooter: "bg-gradient-to-r from-blue-50 via-white to-purple-50",
  text: "text-sm",
  darkText: "text-gray-400",
  lightText: "text-gray-600",
  button:
    "inline-flex items-center px-5 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-4",
  darkButton:
    "text-gray-300 hover:text-white hover:bg-gray-700 focus:ring-blue-500/50",
  lightButton:
    "text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:ring-blue-300/50",
  border: "mt-6 pt-6 border-t",
  darkBorder: "border-gray-700",
  lightBorder: "border-gray-200",
};

const Footer = () => {
  const { isDarkMode = false } = useThemeStore();
  const currentTheme = useMemo(() => isDarkMode, [isDarkMode]);
  const year = useMemo(() => new Date().getFullYear(), []);

  const scrollToSection = () => {
    const element = document.getElementById("hero");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Hero section not found");
    }
  };

  return (
    <footer
      className={`${BASE_CLASSES.footer} ${
        currentTheme ? BASE_CLASSES.darkFooter : BASE_CLASSES.lightFooter
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4 }}
            className="mb-4 md:mb-0 text-center md:text-left">
            <div
              className={`text-xl font-bold mb-1 ${
                currentTheme ? "text-white" : "text-gray-900"
              }`}>
              <span
                className={currentTheme ? "text-blue-400" : "text-blue-500"}>
                Abhishek{" "}
              </span>
              Bhardwaj
            </div>
            <p
              className={`${BASE_CLASSES.text} ${
                currentTheme ? BASE_CLASSES.darkText : BASE_CLASSES.lightText
              }`}>
              © {year} Abhishek Bhardwaj. All rights reserved.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: 0.1 }}>
            <SocialLinks size="sm" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`text-center ${BASE_CLASSES.border} ${
            currentTheme ? BASE_CLASSES.darkBorder : BASE_CLASSES.lightBorder
          }`}>
          <motion.button
            onClick={scrollToSection}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${BASE_CLASSES.button} ${
              currentTheme ? BASE_CLASSES.darkButton : BASE_CLASSES.lightButton
            }`}
            aria-label="Scroll back to top">
            Back to Top
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default memo(Footer);
