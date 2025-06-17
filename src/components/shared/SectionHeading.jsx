import { motion } from "framer-motion";
import { memo } from "react";
import useThemeStore from "../../Stores/useThemeStore";

// CSS constants
const BASE_CLASSES = {
  container: "text-center mb-8",
  title: "text-2xl sm:text-3xl font-bold mb-3 transition-colors duration-200",
  darkTitle: "text-white",
  lightTitle: "text-gray-900",
  underline: "w-16 h-1 mx-auto transition-colors duration-200",
  darkUnderline: "bg-gradient-to-r from-blue-400 to-purple-400",
  lightUnderline: "bg-gradient-to-r from-blue-600 to-purple-600",
  subtitle:
    "mt-3 max-w-xl mx-auto text-sm leading-relaxed transition-colors duration-200",
  darkSubtitle: "text-gray-300",
  lightSubtitle: "text-gray-600",
};

const SectionHeading = ({ title, subtitle = "" }) => {
  const { isDarkMode = false } = useThemeStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4 }}
      className={BASE_CLASSES.container}
      role="banner"
      aria-labelledby="section-title">
      <h2
        id="section-title"
        className={`${BASE_CLASSES.title} ${
          isDarkMode ? BASE_CLASSES.darkTitle : BASE_CLASSES.lightTitle
        }`}>
        {title}
      </h2>
      <div
        className={`${BASE_CLASSES.underline} ${
          isDarkMode ? BASE_CLASSES.darkUnderline : BASE_CLASSES.lightUnderline
        }`}
      />
      {subtitle && (
        <p
          className={`${BASE_CLASSES.subtitle} ${
            isDarkMode ? BASE_CLASSES.darkSubtitle : BASE_CLASSES.lightSubtitle
          }`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

SectionHeading.displayName = "SectionHeading";

export default memo(SectionHeading);
