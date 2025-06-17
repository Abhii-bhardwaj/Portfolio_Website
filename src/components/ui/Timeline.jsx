import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { Briefcase } from "lucide-react";
import useThemeStore from "../../Stores/useThemeStore";

// Theme configuration
const themeConfig = {
  dark: {
    card: "bg-gray-800/80 border-gray-700",
    badge: "bg-blue-600/20 text-blue-400 border-blue-600/30",
    title: "text-white",
    org: "text-purple-400",
    desc: "text-gray-200",
    point: "bg-blue-500 border-gray-800 shadow-blue-500/50",
    pointInner: "bg-blue-400",
    line: "bg-gradient-to-b from-blue-500 to-purple-600",
  },
  light: {
    card: "bg-white/80 border-gray-200",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    title: "text-gray-900",
    org: "text-purple-600",
    desc: "text-gray-700",
    point: "bg-blue-500 border-white shadow-blue-500/30",
    pointInner: "bg-blue-600",
    line: "bg-gradient-to-b from-blue-400 to-purple-500",
  },
};

// CSS constants
const BASE_CLASSES = {
  container: "relative max-w-4xl mx-auto",
  item: "relative flex flex-col md:flex-row mb-10",
  itemReverse: "md:flex-row-reverse",
  card: "p-4 rounded-xl shadow-md backdrop-blur-sm transition-all duration-150 z-10",
  badge: "inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2",
  title: "text-base font-bold mb-1",
  org: "text-xs font-semibold mb-3",
  desc: "text-xs leading-relaxed",
  point:
    "absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-30 w-6 h-6 rounded-full border-2",
  line: "absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1.5 opacity-70 z-20 pointer-events-none",
};

const TimelineItem = memo(({ item, index }) => {
  const { isDarkMode = false } = useThemeStore() || {};
  const currentTheme = isDarkMode ? themeConfig.dark : themeConfig.light;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`${BASE_CLASSES.item} ${
        isEven ? BASE_CLASSES.itemReverse : ""
      }`}
      role="listitem"
      aria-label={`${item.title || "Untitled"} at ${
        item.organization || "Unknown"
      }`}>
      <div
        className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? "md:ml-6" : "md:mr-6"}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className={`${BASE_CLASSES.card} ${currentTheme.card}`}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`${BASE_CLASSES.badge} ${currentTheme.badge}`}>
            {item.period || "N/A"}
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`${BASE_CLASSES.title} ${currentTheme.title}`}>
            {item.title || "Untitled"}
          </motion.h3>
          <motion.h4
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`${BASE_CLASSES.org} ${currentTheme.org}`}>
            {item.organization || "Unknown"}
          </motion.h4>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={`${BASE_CLASSES.desc} ${currentTheme.desc}`}>
            {item.description || "No description"}
          </motion.p>
          {item.icon && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-2 w-fit p-1.5 rounded-full bg-blue-600/20">
              <item.icon size={16} className={currentTheme.org} />
            </motion.div>
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`${BASE_CLASSES.point} ${currentTheme.point}`}
        tabIndex={0}
        aria-label={`Timeline point for ${item.title || "Untitled"}`}>
        <div
          className={`w-full h-full rounded-full ${currentTheme.pointInner}`}
        />
      </motion.div>
    </motion.div>
  );
});

const Timeline = memo(({ items = [] }) => {
  const { isDarkMode = false } = useThemeStore() || {};
  const currentTheme = isDarkMode ? themeConfig.dark : themeConfig.light;
  const timelineItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id || Math.random().toString(36).slice(2),
        title: item.title || "Untitled",
        organization: item.organization || "Unknown",
        period: item.period || "N/A",
        description: item.description || "No description",
        icon: item.icon || Briefcase,
      })),
    [items]
  );

  if (!timelineItems.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.4 }}
        className={`text-center text-xs ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}>
        No timeline items available.
      </motion.div>
    );
  }

  return (
    <div className={BASE_CLASSES.container} role="list">
      <div className={`${BASE_CLASSES.line} ${currentTheme.line}`} />
      {timelineItems.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
});

TimelineItem.displayName = "TimelineItem";
Timeline.displayName = "Timeline";

export default Timeline;
