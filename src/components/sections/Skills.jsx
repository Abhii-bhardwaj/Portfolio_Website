import { motion } from "framer-motion";
import { memo, useMemo, useState, useCallback } from "react";
import SectionHeading from "../shared/SectionHeading";
import {
  Code,
  Atom,
  FileCode,
  LayoutTemplate,
  Settings2,
  Github,
  Smartphone,
  PlugZap,
  Move3D,
  Zap,
  Box,
  Hexagon,
  ImagePlus,
  Triangle,
  Paintbrush,
  Circle,
  Database,
  Wifi,
  Palette,
  Globe,
  Container,
  TestTube,
  Key,
  CheckCircle,
  FileType,
  Grid3X3,
  Layers,
} from "lucide-react";
import { skillCategories, skills as allSkills } from "../../data/skills";
import useThemeStore from "../../Stores/useThemeStore";

// Optimized CSS constants
const CLASSES = {
  section: "py-16 transition-colors duration-300",
  darkBg: "bg-gradient-to-br from-gray-900 to-gray-800",
  lightBg: "bg-gradient-to-br from-gray-50 to-blue-50",
  card: "relative p-4 rounded-xl cursor-pointer transition-all duration-300 group",
  darkCard:
    "bg-gray-800/50 border border-gray-700/30 hover:bg-gray-700/60 hover:border-gray-600/50",
  lightCard:
    "bg-white/70 border border-gray-200/50 hover:bg-white hover:border-gray-300/60",
  categoryBtn:
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2",
  activeCategoryBtn: "bg-blue-500 text-white shadow-md",
  inactiveCategoryBtn: "hover:bg-gray-100 dark:hover:bg-gray-700",
};

// Optimized icon mapping
const ICONS = {
  Code,
  Atom,
  FileCode,
  LayoutTemplate,
  Settings2,
  Github,
  Smartphone,
  PlugZap,
  Move3D,
  Zap,
  Box,
  Hexagon,
  ImagePlus,
  Triangle,
  Paintbrush,
  Database,
  Wifi,
  Palette,
  Globe,
  Container,
  TestTube,
  Key,
  CheckCircle,
  FileType,
  Grid3X3,
  Layers,
  Default: Circle,
};

// Level to percentage mapping
const LEVEL_MAP = { Advanced: 90, Intermediate: 70, Beginner: 50 };

// Optimized SkillCard with minimal animations
const SkillCard = memo(({ skill, index, isVisible = true }) => {
  const { isDarkMode } = useThemeStore();

  if (!isVisible) return null;

  const Icon = ICONS[skill.icon] || ICONS.Default;
  const percentage = LEVEL_MAP[skill.level] || 50;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={`${CLASSES.card} ${
        isDarkMode ? CLASSES.darkCard : CLASSES.lightCard
      }`}>
      {/* Icon */}
      <div
        className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-white mb-2 ${skill.color}`}>
        <Icon size={20} />
      </div>

      {/* Name */}
      <h3
        className={`font-medium text-sm mb-1 ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}>
        {skill.name}
      </h3>

      {/* Progress Bar */}
      <div
        className={`w-full h-1.5 rounded-full ${
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        }`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: index * 0.02 + 0.2 }}
          className={`h-full rounded-full ${skill.color
            .replace("bg-", "bg-gradient-to-r from-")
            .replace(/-([\d]+)/, "-$1 to-$1")}`}
        />
      </div>

      {/* Level Badge */}
      <span
        className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
          skill.level === "Advanced"
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            : skill.level === "Intermediate"
            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        }`}>
        {skill.level}
      </span>
    </motion.div>
  );
});

const Skills = () => {
  const { isDarkMode } = useThemeStore();
  const [activeCategory, setActiveCategory] = useState("all");

  // Optimized category filtering
  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return allSkills;
    const category = skillCategories.find(
      (cat) => cat.category === activeCategory
    );
    return category ? category.skills : [];
  }, [activeCategory]);

  // Optimized category change handler
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  // Compact category tabs
  const categoryTabs = useMemo(
    () => [
      { id: "all", name: "All", icon: Grid3X3, count: allSkills.length },
      ...skillCategories.map((cat) => ({
        id: cat.category,
        name: cat.category.split(" ")[0], // First word only
        icon: ICONS[cat.icon] || ICONS.Default,
        count: cat.skills.length,
      })),
    ],
    []
  );

  return (
    <section
      className={`${CLASSES.section} ${
        isDarkMode ? CLASSES.darkBg : CLASSES.lightBg
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          title="My Skills"
          description="Technologies and tools I work with daily"
        />

        {/* Compact Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`${CLASSES.categoryBtn} ${
                  isActive
                    ? CLASSES.activeCategoryBtn
                    : `${CLASSES.inactiveCategoryBtn} ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`
                }`}>
                <Icon size={16} />
                <span className="text-sm">{tab.name}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid - Optimized Layout */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={`${activeCategory}-${skill.name}`}
              skill={skill}
              index={index}
              isVisible={true}
            />
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center">
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <div
              className={`px-4 py-2 rounded-lg ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/70"
              }`}>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                Showing{" "}
                <span className="font-semibold text-blue-500">
                  {filteredSkills.length}
                </span>{" "}
                skills
              </span>
            </div>
            <div
              className={`px-4 py-2 rounded-lg ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/70"
              }`}>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                <span className="font-semibold text-green-500">
                  {filteredSkills.filter((s) => s.level === "Advanced").length}
                </span>{" "}
                Advanced
              </span>
            </div>
            <div
              className={`px-4 py-2 rounded-lg ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/70"
              }`}>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                Always learning & growing 🚀
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Skills);
