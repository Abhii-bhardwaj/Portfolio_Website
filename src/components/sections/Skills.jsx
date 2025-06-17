import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import SectionHeading from "../shared/SectionHeading";
import { Code, Paintbrush, Circle } from "lucide-react"; // Specific icons
import skillsData from "../../data/skills";
import useThemeStore from "../../Stores/useThemeStore";

// CSS constants
const BASE_CLASSES = {
  section: "py-20 transition-all duration-200",
  darkSection: "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800",
  lightSection: "bg-gradient-to-br from-gray-50 via-white to-blue-50",
  card: "relative p-6 rounded-2xl text-center cursor-pointer transition-all duration-200 shadow-lg",
  darkCard:
    "bg-gray-800/60 backdrop-blur-sm border-gray-700/50 hover:bg-gray-700/80 hover:shadow-2xl hover:shadow-blue-500/20",
  lightCard:
    "bg-white/80 backdrop-blur-sm border-gray-200/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/20",
  summary: "mt-16 p-8 rounded-2xl text-center shadow-xl",
  darkSummary: "bg-gray-800/60 backdrop-blur-sm border-gray-700/50",
  lightSummary: "bg-white/80 backdrop-blur-sm border-gray-200/50",
};

// Gradient map for skill bars
const GRADIENT_MAP = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  yellow: "from-yellow-500 to-yellow-600",
  red: "from-red-500 to-red-600",
  purple: "from-purple-500 to-purple-600",
  pink: "from-pink-500 to-pink-600",
  indigo: "from-indigo-500 to-indigo-600",
  cyan: "from-cyan-500 to-cyan-600",
  default: "from-gray-500 to-gray-600",
};

// Icon map for lucide-react
const ICON_MAP = {
  Code: Code,
  Paintbrush: Paintbrush,
  // Add more icons as needed based on skillsData
  Default: Circle,
};

const Skills = () => {
  const { isDarkMode = false } = useThemeStore();
  const currentTheme = useMemo(() => isDarkMode, [isDarkMode]);

  // Memoized skill cards
  const skillCards = useMemo(
    () =>
      skillsData.map((skill, index) => {
        const LucideIcon = ICON_MAP[skill.icon] || ICON_MAP.Default;
        const gradient =
          Object.keys(GRADIENT_MAP).find((key) =>
            skill.color.toLowerCase().includes(key)
          ) || "default";

        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{ y: -6, scale: 1.03 }}
            className={`${BASE_CLASSES.card} ${
              currentTheme ? BASE_CLASSES.darkCard : BASE_CLASSES.lightCard
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            role="listitem"
            tabIndex={0}
            aria-label={`Skill: ${skill.name}, proficiency ${
              skill.level || 50
            }%`}>
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                currentTheme
                  ? "bg-gradient-to-r from-blue-600/10 to-purple-600/10"
                  : "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
              }`}
            />
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
              className={`relative w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-white mb-3 ${skill.color} group-hover:scale-105 shadow-md`}>
              <LucideIcon size={24} />
            </motion.div>
            <h3
              className={`font-semibold text-base ${
                currentTheme
                  ? "text-gray-200 group-hover:text-white"
                  : "text-gray-800 group-hover:text-gray-900"
              }`}>
              {skill.name}
            </h3>
            <div className="mt-2">
              <div
                className={`w-full h-2 rounded-full ${
                  currentTheme ? "bg-gray-700" : "bg-gray-200"
                }`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level || 50}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
                  className={`h-full rounded-full bg-gradient-to-r ${GRADIENT_MAP[gradient]}`}
                />
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -4, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.1,
              }}
              className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${
                currentTheme ? "bg-blue-400" : "bg-blue-500"
              } opacity-0 group-hover:opacity-50`}
            />
          </motion.div>
        );
      }),
    [currentTheme]
  );

  return (
    <section
      id="skills"
      className={`${BASE_CLASSES.section} ${
        currentTheme ? BASE_CLASSES.darkSection : BASE_CLASSES.lightSection
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          title="My Skills"
          description="Here are the technologies and tools I work with daily. I'm always learning to stay updated with the latest trends."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skillCards}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`${BASE_CLASSES.summary} ${
            currentTheme ? BASE_CLASSES.darkSummary : BASE_CLASSES.lightSummary
          }`}>
          <h3
            className={`text-xl font-bold mb-3 ${
              currentTheme ? "text-white" : "text-gray-900"
            }`}>
            Always Learning & Growing
          </h3>
          <p
            className={`text-base leading-relaxed max-w-2xl mx-auto ${
              currentTheme ? "text-gray-300" : "text-gray-700"
            }`}>
            Technology evolves fast, and I keep up by exploring new frameworks,
            attending workshops, and contributing to open-source projects.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Skills);
