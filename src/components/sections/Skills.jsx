// src/components/sections/Skills.jsx
import SectionHeading from "../shared/SectionHeading";
import AnimatedElement from "../shared/AnimatedElement";
import { motion } from "framer-motion";
import skillsData from "../../data/skills";
import * as Icons from "lucide-react";
import useThemeStore from "../../Stores/useThemeStore";

const Skills = () => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  return (
    <section
      id="skills"
      className={`py-20 transition-colors duration-300 ${
        currentTheme
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          title="My Skills"
          description="Here are the technologies and tools I work with on a daily basis. I'm constantly learning and expanding my skillset to stay up-to-date with the latest trends."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skillsData.map((skill, index) => {
            const LucideIcon = Icons[skill.icon] || Icons.Circle;

            return (
              <AnimatedElement
                key={skill.name}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className={`group relative p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 ${
                  currentTheme
                    ? "bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/80 hover:shadow-2xl hover:shadow-blue-500/20"
                    : "bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/20"
                } shadow-lg`}>
                {/* Background Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    currentTheme
                      ? "bg-gradient-to-r from-blue-600/10 to-purple-600/10"
                      : "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  }`}></div>

                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`relative w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white mb-4 transition-all duration-300 ${skill.color} group-hover:scale-110 shadow-lg`}>
                  <LucideIcon size={28} />
                </motion.div>

                <h3
                  className={`relative font-semibold text-lg transition-colors duration-300 ${
                    currentTheme
                      ? "text-gray-200 group-hover:text-white"
                      : "text-gray-800 group-hover:text-gray-900"
                  }`}>
                  {skill.name}
                </h3>

                {/* Skill Level Indicator */}
                <div className="relative mt-3">
                  <div
                    className={`w-full h-2 rounded-full ${
                      currentTheme ? "bg-gray-700" : "bg-gray-200"
                    }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level || 75}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className={`h-full rounded-full bg-gradient-to-r ${
                        skill.color.includes("blue")
                          ? "from-blue-500 to-blue-600"
                          : skill.color.includes("green")
                          ? "from-green-500 to-green-600"
                          : skill.color.includes("yellow")
                          ? "from-yellow-500 to-yellow-600"
                          : skill.color.includes("red")
                          ? "from-red-500 to-red-600"
                          : skill.color.includes("purple")
                          ? "from-purple-500 to-purple-600"
                          : skill.color.includes("pink")
                          ? "from-pink-500 to-pink-600"
                          : skill.color.includes("indigo")
                          ? "from-indigo-500 to-indigo-600"
                          : "from-gray-500 to-gray-600"
                      }`}></motion.div>
                  </div>
                </div>

                {/* Floating Particles Effect */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                    currentTheme ? "bg-blue-400" : "bg-blue-500"
                  } opacity-0 group-hover:opacity-60`}></motion.div>
              </AnimatedElement>
            );
          })}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`mt-16 p-8 rounded-2xl text-center ${
            currentTheme
              ? "bg-gray-800/60 backdrop-blur-sm border border-gray-700/50"
              : "bg-white/80 backdrop-blur-sm border border-gray-200/50"
          } shadow-xl`}>
          <h3
            className={`text-2xl font-bold mb-4 ${
              currentTheme ? "text-white" : "text-gray-900"
            }`}>
            Always Learning & Growing
          </h3>
          <p
            className={`text-lg leading-relaxed max-w-3xl mx-auto ${
              currentTheme ? "text-gray-300" : "text-gray-700"
            }`}>
            Technology evolves rapidly, and I believe in continuous learning. I
            regularly explore new frameworks, attend workshops, and contribute
            to open-source projects to stay at the forefront of web development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
