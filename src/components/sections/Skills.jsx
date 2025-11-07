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
  PlugZap,
  Move3D,
  Zap,
  Box,
  Hexagon,
  Triangle,
  Paintbrush,
  Database,
  Wifi,
  Palette,
  Globe,
  Key,
  FileType,
  Grid3X3,
  Wrench,
  Monitor,
  Server,
  Circle,
  Heart,
  Lightbulb,
  MessageSquare,
  Users,
  Clock,
  RefreshCw,
  Brain,
  Sparkles,
  Award,
  Eye,
  BookOpen,
} from "lucide-react";

import { skillCategories, allSkills } from "../../data/skills";
import useThemeStore from "../../Stores/useThemeStore";

// CSS Classes
const CLASSES = {
  section: "py-16 transition-colors duration-300",
  darkBg: "bg-gradient-to-br from-gray-900 to-gray-800",
  lightBg: "bg-gradient-to-br from-gray-50 to-blue-50",
  card: "relative p-6 rounded-2xl cursor-pointer transition-all duration-300 group flex flex-col items-center justify-center h-32",
  darkCard:
    "bg-gray-800/50 border border-gray-700/30 hover:bg-gray-700/60 hover:border-gray-600/50",
  lightCard:
    "bg-white/70 border border-gray-200/50 hover:bg-white hover:border-gray-300/60",
  categoryBtn:
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2",
  activeCategoryBtn: "bg-blue-500 text-white shadow-md",
  inactiveCategoryBtn: "hover:bg-gray-100 dark:hover:bg-gray-700",
};

// Icon mapping - Updated with soft skill icons
const ICONS = {
  Code,
  Atom,
  FileCode,
  LayoutTemplate,
  Settings2,
  Github,
  PlugZap,
  Move3D,
  Zap,
  Box,
  Hexagon,
  Triangle,
  Paintbrush,
  Database,
  Wifi,
  Palette,
  Globe,
  Key,
  FileType,
  Grid3X3,
  Wrench,
  Monitor,
  Server,
  Heart,
  Lightbulb,
  MessageSquare,
  Users,
  Clock,
  RefreshCw,
  Brain,
  Sparkles,
  Award,
  Eye,
  BookOpen,
  Default: Circle,
};

// Skill Card – No progress bar, only level badge
const SkillCard = memo(({ skill, index }) => {
  const { isDarkMode } = useThemeStore();
  const Icon = ICONS[skill.icon] || ICONS.Default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.05 }}
      className={`${CLASSES.card} ${
        isDarkMode ? CLASSES.darkCard : CLASSES.lightCard
      }`}>
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-3 ${skill.color} shadow-lg`}>
        <Icon size={28} />
      </div>

      {/* Skill Name */}
      <h3
        className={`font-semibold text-base text-center ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}>
        {skill.name}
      </h3>

      {/* Level Badge */}
      <span
        className={`mt-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${
          skill.level === "Advanced"
            ? "bg-green-500/20 text-green-400 border border-green-500/40"
            : skill.level === "Intermediate"
            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
            : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
        }`}>
        {skill.level}
      </span>
    </motion.div>
  );
});

const Skills = () => {
  const { isDarkMode } = useThemeStore();
  const [activeCategory, setActiveCategory] = useState("all");

  // Show ALL skills in the selected category
  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return allSkills;
    const cat = skillCategories.find((c) => c.category === activeCategory);
    return cat ? cat.skills : [];
  }, [activeCategory]);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
  }, []);

  // Only 3 tabs: All, Technical, Soft Skills
  const categoryTabs = useMemo(
    () => [
      { id: "all", name: "All Skills", icon: Grid3X3, count: allSkills.length },
      ...skillCategories.map((cat) => ({
        id: cat.category,
        name: cat.category,
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
          description="Technical expertise and soft skills that drive success"
        />

        {/* Category Tabs - Now only 3 buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
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
                  className={`text-xs px-2 py-0.5 rounded-full ${
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

        {/* Responsive Grid – Max 5 columns */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {filteredSkills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center">
          <div className="flex justify-center gap-6 flex-wrap">
            <div
              className={`px-5 py-2.5 rounded-lg ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/70"
              }`}>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                Showing{" "}
                <span className="font-bold text-blue-500">
                  {filteredSkills.length}
                </span>{" "}
                skills
              </span>
            </div>
            <div
              className={`px-5 py-2.5 rounded-lg ${
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
              className={`px-5 py-2.5 rounded-lg ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/70"
              }`}>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                Always learning & growing
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Skills);
