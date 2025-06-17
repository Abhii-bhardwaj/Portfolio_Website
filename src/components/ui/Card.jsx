import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import useThemeStore from "../../Stores/useThemeStore";

// CSS constants
const BASE_CLASSES = {
  card: "rounded-lg transition-all duration-200",
  darkCard: "bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/25",
  lightCard: "bg-white border-gray-100 shadow-lg shadow-gray-500/10",
  padding: {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  },
  shadow: {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  },
  skillIcon:
    "w-14 h-14 mx-auto rounded-full flex items-center justify-center text-white text-xl font-bold mb-3 shadow-lg",
  projectImage:
    "w-full h-56 sm:h-60 object-cover transition-transform duration-300 hover:scale-105",
  projectOverlay: "absolute inset-0",
  darkOverlay: "bg-gradient-to-t from-gray-900/40 to-transparent",
  lightOverlay: "bg-gradient-to-t from-white/20 to-transparent",
  projectTitle: "text-lg font-bold mb-2 transition-colors duration-200",
  darkTitle: "text-white",
  lightTitle: "text-gray-900",
  projectDesc: "mb-3 text-sm leading-relaxed transition-colors duration-200",
  darkDesc: "text-gray-300",
  lightDesc: "text-gray-600",
  techTag:
    "px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200",
  darkTech: "bg-gray-700 text-blue-400 border-gray-600",
  lightTech: "bg-blue-50 text-blue-700 border-blue-200",
  link: "flex items-center font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg px-2 py-1",
  darkLiveLink:
    "text-blue-400 hover:text-blue-300 focus:ring-blue-500 focus:ring-offset-gray-800",
  lightLiveLink:
    "text-blue-600 hover:text-blue-700 focus:ring-blue-500 focus:ring-offset-white",
  darkGithubLink:
    "text-gray-300 hover:text-white focus:ring-gray-500 focus:ring-offset-gray-800",
  lightGithubLink:
    "text-gray-600 hover:text-gray-900 focus:ring-gray-500 focus:ring-offset-white",
};

const Card = memo(
  ({
    children,
    className = "",
    hover = false,
    onClick = null,
    padding = "p-6",
    shadow = "shadow-md",
  }) => {
    const { isDarkMode = false } = useThemeStore();
    const validPadding = BASE_CLASSES.padding[padding] ? padding : "md";
    const validShadow = BASE_CLASSES.shadow[shadow] ? shadow : "md";

    const cardClasses = useMemo(
      () =>
        `${BASE_CLASSES.card} ${BASE_CLASSES.padding[validPadding]} ${
          BASE_CLASSES.shadow[validShadow]
        } ${
          isDarkMode ? BASE_CLASSES.darkCard : BASE_CLASSES.lightCard
        } ${className}`,
      [validPadding, validShadow, isDarkMode, className]
    );

    return (
      <motion.div
        className={cardClasses}
        whileHover={hover ? { y: -3, transition: { duration: 0.15 } } : {}}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={onClick ? "Interactive card" : undefined}>
        {children}
      </motion.div>
    );
  }
);

export const SkillCard = memo(({ icon, name, color }) => {
  const { isDarkMode = false } = useThemeStore();
  const cardColor = useMemo(
    () =>
      color ||
      (isDarkMode
        ? "bg-gradient-to-br from-blue-600 to-purple-600"
        : "bg-gradient-to-br from-blue-500 to-purple-500"),
    [color, isDarkMode]
  );

  return (
    <Card hover>
      <div className="text-center">
        <div className={`${BASE_CLASSES.skillIcon} ${cardColor}`}>
          {icon || "?"}
        </div>
        <h3
          className={`font-medium text-base ${
            isDarkMode ? BASE_CLASSES.darkTitle : BASE_CLASSES.lightTitle
          }`}>
          {name || "Unknown"}
        </h3>
      </div>
    </Card>
  );
});

export const ProjectCard = memo(
  ({ image, title, description, tech = [], liveUrl, githubUrl }) => {
    const { isDarkMode = false } = useThemeStore();

    return (
      <Card padding="none" hover>
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image || "/fallback.jpg"}
            alt={title || "Project image"}
            loading="lazy"
            decoding="async"
            onError={(e) => (e.target.src = "/fallback.jpg")}
            className={BASE_CLASSES.projectImage}
          />
          <div
            className={`${BASE_CLASSES.projectOverlay} ${
              isDarkMode ? BASE_CLASSES.darkOverlay : BASE_CLASSES.lightOverlay
            }`}
          />
        </div>
        <div className="p-5">
          <h3
            className={`${BASE_CLASSES.projectTitle} ${
              isDarkMode ? BASE_CLASSES.darkTitle : BASE_CLASSES.lightTitle
            }`}>
            {title || "Untitled"}
          </h3>
          <p
            className={`${BASE_CLASSES.projectDesc} ${
              isDarkMode ? BASE_CLASSES.darkDesc : BASE_CLASSES.lightDesc
            }`}>
            {description || "No description available"}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {tech.map((item) => (
              <span
                key={item}
                className={`${BASE_CLASSES.techTag} ${
                  isDarkMode ? BASE_CLASSES.darkTech : BASE_CLASSES.lightTech
                }`}>
                {item}
              </span>
            ))}
          </div>
          <div className="flex justify-between">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BASE_CLASSES.link} ${
                  isDarkMode
                    ? BASE_CLASSES.darkLiveLink
                    : BASE_CLASSES.lightLiveLink
                }`}
                aria-label={`View live demo of ${title || "project"}`}>
                Live Demo
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BASE_CLASSES.link} ${
                  isDarkMode
                    ? BASE_CLASSES.darkGithubLink
                    : BASE_CLASSES.lightGithubLink
                }`}
                aria-label={`View GitHub repository for ${title || "project"}`}>
                GitHub
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </Card>
    );
  }
);

Card.displayName = "Card";
SkillCard.displayName = "SkillCard";
ProjectCard.displayName = "ProjectCard";

export default Card;
