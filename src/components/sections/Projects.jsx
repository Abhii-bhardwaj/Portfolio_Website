import { ExternalLink, Github, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import SectionHeading from "../shared/SectionHeading";
import projectsData from "../../data/projects";
import useThemeStore from "../../Stores/useThemeStore";

// CSS constants
const BASE_CLASSES = {
  section: "py-20 transition-all duration-200",
  darkSection: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
  lightSection: "bg-gradient-to-br from-blue-50 via-white to-purple-50",
  card: "overflow-hidden h-full flex flex-col rounded-lg shadow-lg transition-all duration-200",
  darkCard: "bg-gray-800 border-gray-700 shadow-2xl shadow-blue-500/10",
  lightCard: "bg-white border-gray-200 shadow-xl shadow-blue-500/10",
  link: "flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-4",
  darkLinkLive:
    "text-blue-400 hover:text-blue-300 hover:bg-gray-700 focus:ring-blue-500/50",
  lightLinkLive:
    "text-blue-600 hover:text-blue-700 hover:bg-blue-50 focus:ring-blue-300/50",
  darkLinkGithub:
    "text-gray-300 hover:text-white hover:bg-gray-700 focus:ring-gray-500/50",
  lightLinkGithub:
    "text-gray-600 hover:text-gray-800 hover:bg-gray-50 focus:ring-gray-300/50",
};

const Projects = () => {
  const { isDarkMode = false } = useThemeStore();
  const currentTheme = useMemo(() => isDarkMode, [isDarkMode]);

  const projectCards = useMemo(
    () =>
      projectsData.map((project, index) => {
        const hasLive = !!project.liveUrl?.trim();
        const hasGithub = !!project.githubUrl?.trim();
        const isComingSoon = project.comingSoon && !hasLive;

        // Determine layout: justify-between only if both buttons exist
        const justifyClass =
          (hasLive && hasGithub) || (isComingSoon && hasGithub)
            ? "justify-between"
            : "justify-end";

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className={`${BASE_CLASSES.card} ${
              currentTheme ? BASE_CLASSES.darkCard : BASE_CLASSES.lightCard
            }`}
            role="article"
            aria-label={`Project: ${project.title}`}>
            <div className="relative overflow-hidden">
              <img
                src={project.image || "/fallback.jpg"}
                alt={`Screenshot of ${project.title} project`}
                loading="lazy"
                decoding="async"
                onError={(e) => (e.target.src = "/fallback.jpg")}
                className="w-full h-56 sm:h-64 object-contain transition-transform duration-300 hover:scale-105"
              />
              <div
                className={`absolute inset-0 transition-opacity duration-200 hover:opacity-0 ${
                  currentTheme
                    ? "bg-gradient-to-t from-gray-900/50 to-transparent"
                    : "bg-gradient-to-t from-white/20 to-transparent"
                }`}
              />
            </div>

            <div className="p-5 flex-grow flex flex-col">
              <h3
                className={`text-lg font-bold mb-2 ${
                  currentTheme ? "text-white" : "text-gray-900"
                }`}>
                {project.title}
              </h3>
              <p
                className={`mb-3 text-sm leading-relaxed flex-grow ${
                  currentTheme ? "text-gray-300" : "text-gray-600"
                }`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech?.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      currentTheme
                        ? "bg-blue-600 text-white hover:bg-blue-500"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }`}>
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Buttons + Coming Soon */}
              <div className={`flex mt-auto gap-3 ${justifyClass}`}>
                {/* Coming Soon Badge */}
                {isComingSoon && (
                  <div
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider border ${
                      currentTheme
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                        : "bg-yellow-100 text-yellow-800 border-yellow-300"
                    }`}
                    aria-label="This project is under development">
                    <Clock size={14} />
                    Coming Soon
                  </div>
                )}

                {/* Live Demo */}
                {hasLive && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${BASE_CLASSES.link} ${
                      currentTheme
                        ? BASE_CLASSES.darkLinkLive
                        : BASE_CLASSES.lightLinkLive
                    }`}
                    aria-label={`View live demo of ${project.title}`}>
                    Live Demo <ExternalLink size={14} className="ml-1" />
                  </motion.a>
                )}

                {/* GitHub */}
                {hasGithub && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${BASE_CLASSES.link} ${
                      currentTheme
                        ? BASE_CLASSES.darkLinkGithub
                        : BASE_CLASSES.lightLinkGithub
                    }`}
                    aria-label={`View GitHub repository for ${project.title}`}>
                    GitHub <Github size={14} className="ml-1" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        );
      }),
    [currentTheme]
  );

  return (
    <section
      id="projects"
      className={`${BASE_CLASSES.section} ${
        currentTheme ? BASE_CLASSES.darkSection : BASE_CLASSES.lightSection
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Featured Projects"
          description="Recent projects built with a focus on user experience, performance, and clean code."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectCards}
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);
