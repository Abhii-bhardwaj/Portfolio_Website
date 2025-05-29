// src/components/sections/Experience.jsx
import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import Timeline from "../ui/Timeline";
import experienceData from "../../data/experiences";
import useThemeStore from "../../Stores/useThemeStore";

const Experience = () => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  return (
    <section
      id="experience"
      className={`py-20 transition-colors duration-300 ${
        currentTheme
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading title="Experience & Education" />

        {/* Enhanced Timeline Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative p-8 rounded-2xl ${
            currentTheme
              ? "bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
              : "bg-white/50 backdrop-blur-sm border border-gray-200/50"
          } shadow-2xl`}>
          {/* Decorative Background Elements */}
          <div
            className={`absolute top-0 left-0 w-32 h-32 rounded-full opacity-10 ${
              currentTheme ? "bg-blue-500" : "bg-blue-400"
            } blur-2xl`}></div>
          <div
            className={`absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-10 ${
              currentTheme ? "bg-purple-500" : "bg-purple-400"
            } blur-2xl`}></div>

          <Timeline items={experienceData} />
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { number: "2+", label: "Years Learning", icon: "📚" },
            { number: "5+", label: "Projects Built", icon: "🚀" },
            { number: "8+", label: "Technologies", icon: "⚡" },
            { number: "100%", label: "Dedication", icon: "💪" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className={`text-center p-6 rounded-2xl transition-all duration-300 ${
                currentTheme
                  ? "bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/80 hover:shadow-2xl hover:shadow-blue-500/20"
                  : "bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/20"
              } shadow-lg group cursor-pointer`}>
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                className={`text-2xl md:text-3xl font-bold mb-2 ${
                  currentTheme ? "text-blue-400" : "text-blue-600"
                }`}>
                {stat.number}
              </motion.div>

              <div
                className={`font-medium ${
                  currentTheme ? "text-gray-300" : "text-gray-700"
                }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`mt-16 p-8 rounded-2xl text-center ${
            currentTheme
              ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-gray-700/50"
              : "bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-gray-200/50"
          } shadow-xl`}>
          <h3
            className={`text-2xl font-bold mb-4 ${
              currentTheme ? "text-white" : "text-gray-900"
            }`}>
            Ready for New Opportunities
          </h3>

          <p
            className={`text-lg mb-6 max-w-2xl mx-auto ${
              currentTheme ? "text-gray-300" : "text-gray-700"
            }`}>
            I'm actively seeking internship and full-time opportunities where I
            can contribute my skills while continuing to learn and grow as a
            developer.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentTheme
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
            } focus:outline-none focus:ring-4 focus:ring-blue-500/50`}>
            Let's Connect
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
