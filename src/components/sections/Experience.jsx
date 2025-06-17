import React, { memo, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Book, Rocket, Zap, Award } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
import Timeline from "../ui/Timeline";
import experienceData from "../../data/experiences";
import useThemeStore from "../../Stores/useThemeStore";

// Theme configuration
const themeConfig = {
  dark: {
    section: "bg-gradient-to-br from-gray-900 to-gray-800",
    container: "bg-gray-800/50 border-gray-700/30",
    stat: "bg-gray-800/70 hover:bg-gray-700/90 hover:shadow-blue-500/20",
    cta: "bg-gradient-to-r from-blue-600/70 to-purple-800/70 border-gray-700/30",
    button: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20",
    heading: "text-white",
    text: "text-gray-300",
    glow: "bg-blue-600",
  },
  light: {
    section: "bg-gradient-to-br from-blue-50 to-purple-50",
    container: "bg-white/80 border-gray-200/30",
    stat: "bg-white/80 hover:bg-white hover:shadow-blue-500/20",
    cta: "bg-gradient-to-r from-blue-500/70 to-purple-500/70 border-gray-200/30",
    button: "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20",
    heading: "text-gray-900",
    text: "text-gray-700",
    glow: "bg-blue-400",
  },
};

// CSS constants
const BASE_CLASSES = {
  section: "py-16 transition-colors duration-200",
  container: "relative p-6 rounded-xl shadow-lg backdrop-blur-sm",
  stat: "text-center p-4 rounded-lg shadow-md transition-all duration-150",
  cta: "mt-10 p-6 rounded-xl text-center shadow-lg",
  button:
    "px-6 py-2 rounded-lg font-semibold transition-all duration-150 focus:ring-4 focus:ring-blue-500/50",
  heading: "text-lg font-bold mb-3",
  text: "text-sm mb-4 max-w-xl mx-auto",
};

const Experience = memo(() => {
  const { isDarkMode = false } = useThemeStore() || {};
  const currentTheme = isDarkMode ? themeConfig.dark : themeConfig.light;

  const stats = useMemo(
    () => [
      {
        number: "2+",
        label: "Years Learning",
        icon: Book,
        color: "text-blue-400",
      },
      {
        number: "5+",
        label: "Projects Built",
        icon: Rocket,
        color: "text-purple-400",
      },
      {
        number: "8+",
        label: "Technologies",
        icon: Zap,
        color: "text-yellow-400",
      },
      {
        number: "100%",
        label: "Dedication",
        icon: Award,
        color: "text-green-400",
      },
    ],
    []
  );

  const handleCtaClick = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Contact section not found");
    }
  }, []);

  return (
    <section
      id="experience"
      className={`${BASE_CLASSES.section} ${currentTheme.section}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading title="Experience & Education" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4 }}
          className={`${BASE_CLASSES.container} ${currentTheme.container}`}>
          <div
            className={`absolute top-0 left-0 w-20 h-20 rounded-full opacity-10 blur-xl ${currentTheme.glow}`}
          />
          {experienceData.length ? (
            <Timeline items={experienceData} />
          ) : (
            <p
              className={`text-sm text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
              No experience data available.
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`${BASE_CLASSES.stat} ${currentTheme.stat}`}
              role="listitem"
              tabIndex={0}
              aria-describedby={`stat-${index}`}>
              <stat.icon
                size={24}
                className={`mx-auto mb-2 ${stat.color} group-hover:scale-105 transition-transform duration-150`}
              />
              <div
                id={`stat-${index}`}
                className={`text-lg font-bold mb-1 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}>
                {stat.number}
              </div>
              <div className={`text-xs font-medium ${currentTheme.text}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={`${BASE_CLASSES.cta} ${currentTheme.cta}`}>
          <h3 className={`${BASE_CLASSES.heading} ${currentTheme.heading}`}>
            Seeking New Challenges
          </h3>
          <p className={`${BASE_CLASSES.text} ${currentTheme.text}`}>
            Eager to join innovative teams as an intern or full-time developer,
            bringing creativity and technical expertise.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCtaClick}
            className={`${BASE_CLASSES.button} ${currentTheme.button}`}
            aria-label="Scroll to contact section">
            Let's Connect
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

export default Experience;
