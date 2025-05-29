// Footer.jsx - Redesigned with theme support
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import SocialLinks from "../ui/SocialLinks";
import useThemeStore from "../../Stores/useThemeStore";

const Footer = () => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className={`py-12 transition-all duration-300 ${
        currentTheme
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-r from-blue-50 via-white to-purple-50"
      }`}>
      <div className="container mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-0 text-center md:text-left">
            <div
              className={`text-2xl font-bold mb-2 ${
                currentTheme ? "text-white" : "text-gray-900"
              }`}>
              <span
                className={currentTheme ? "text-blue-400" : "text-blue-600"}>
                Dev
              </span>
              Portfolio
            </div>
            <p
              className={`text-sm ${
                currentTheme ? "text-gray-400" : "text-gray-600"
              }`}>
              © {new Date().getFullYear()} Abhishek Bhardwaj. All rights
              reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <SocialLinks size="md" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`mt-8 pt-8 border-t text-center ${
            currentTheme ? "border-gray-700" : "border-gray-200"
          }`}>
          <motion.button
            onClick={() => scrollToSection("hero")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-4 ${
              currentTheme
                ? "text-gray-300 hover:text-white hover:bg-gray-700 focus:ring-blue-500/50"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:ring-blue-300/50"
            }`}>
            Back to Top
            <motion.svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
