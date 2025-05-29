// Timeline.jsx - Redesigned with theme support
import { motion } from "framer-motion";
import Card from "./Card";
import useThemeStore from "../../Stores/useThemeStore";

const TimelineItem = ({ item, index }) => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex flex-col md:flex-row ${
        isEven ? "md:flex-row-reverse" : ""
      } mb-16`}>
      <div className="ml-12 md:ml-0 md:w-1/2">
        <div className={`${isEven ? "md:ml-8" : "md:mr-8"}`}>
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-2xl shadow-xl transition-all duration-300 ${
              currentTheme
                ? "bg-gray-800/80 backdrop-blur-sm border border-gray-700"
                : "bg-white/80 backdrop-blur-sm border border-gray-200"
            }`}>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
                currentTheme
                  ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                  : "bg-blue-100 text-blue-700 border border-blue-200"
              }`}>
              {item.period}
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-xl font-bold mb-2 ${
                currentTheme ? "text-white" : "text-gray-900"
              }`}>
              {item.title}
            </motion.h3>

            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={`font-semibold mb-4 ${
                currentTheme ? "text-purple-400" : "text-purple-600"
              }`}>
              {item.organization}
            </motion.h4>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`leading-relaxed ${
                currentTheme ? "text-gray-300" : "text-gray-600"
              }`}>
              {item.description}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Timeline Point */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-10">
        <div
          className={`w-6 h-6 rounded-full border-4 ${
            currentTheme
              ? "bg-blue-500 border-gray-800 shadow-lg shadow-blue-500/50"
              : "bg-blue-500 border-white shadow-lg shadow-blue-500/30"
          }`}>
          <div
            className={`w-full h-full rounded-full ${
              currentTheme ? "bg-blue-400" : "bg-blue-600"
            } animate-pulse`}></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Timeline = ({ items }) => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline Line */}
      <div
        className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 ${
          currentTheme
            ? "bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"
            : "bg-gradient-to-b from-blue-400 via-purple-400 to-blue-400"
        } opacity-50`}></div>

      {items.map((item, index) => (
        <TimelineItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default Timeline;
