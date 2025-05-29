// src/components/shared/SectionHeading.jsx
import { motion } from "framer-motion";
import useThemeStore from "../../Stores/useThemeStore";

const SectionHeading = ({ title, subtitle }) => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12">
      <h2
        className={`text-3xl sm:text-4xl font-bold mb-4 transition-colors duration-300 ${
          currentTheme ? "text-white" : "text-gray-900"
        }`}>
        {title}
      </h2>
      <div
        className={`w-16 h-1 mx-auto transition-colors duration-300 ${
          currentTheme
            ? "bg-gradient-to-r from-blue-400 to-purple-400"
            : "bg-gradient-to-r from-blue-600 to-purple-600"
        }`}></div>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
            currentTheme ? "text-gray-300" : "text-gray-600"
          }`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
