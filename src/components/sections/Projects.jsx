// src/components/sections/Projects.jsx
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import AnimatedElement from "../shared/AnimatedElement";
import Card from "../ui/Card";
import projectsData from "../../data/projects";
import useThemeStore from "../../Stores/useThemeStore";

const Projects = () => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  return (
    <section
      id="projects"
      className={`py-20 transition-colors duration-300 ${
        currentTheme
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Featured Projects"
          description="Here are some of my recent projects. Each project was built with a focus on user experience, performance, and clean code."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <AnimatedElement
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className={`overflow-hidden h-full flex flex-col rounded-lg shadow-lg transition-all duration-300 ${
                  currentTheme
                    ? "bg-gray-800 border border-gray-700 shadow-2xl shadow-blue-500/10"
                    : "bg-white border border-gray-200 shadow-xl shadow-blue-500/10"
                }`}>
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 hover:opacity-0 ${
                      currentTheme
                        ? "bg-gradient-to-t from-gray-900/50 to-transparent"
                        : "bg-gradient-to-t from-white/20 to-transparent"
                    }`}
                  />
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3
                    className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                      currentTheme ? "text-white" : "text-gray-900"
                    }`}>
                    {project.title}
                  </h3>

                  <p
                    className={`mb-4 leading-relaxed flex-grow transition-colors duration-300 ${
                      currentTheme ? "text-gray-300" : "text-gray-600"
                    }`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                          currentTheme
                            ? "bg-blue-600 text-white hover:bg-blue-500"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}>
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex justify-between mt-auto gap-4">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-4 ${
                        currentTheme
                          ? "text-blue-400 hover:text-blue-300 hover:bg-gray-700 focus:ring-blue-500/50"
                          : "text-blue-600 hover:text-blue-700 hover:bg-blue-50 focus:ring-blue-300/50"
                      }`}>
                      Live Demo <ExternalLink size={16} className="ml-1" />
                    </motion.a>

                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-4 ${
                        currentTheme
                          ? "text-gray-300 hover:text-white hover:bg-gray-700 focus:ring-gray-500/50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 focus:ring-gray-300/50"
                      }`}>
                      GitHub <Github size={16} className="ml-1" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
