// src/components/ui/Card.jsx
import { motion } from "framer-motion";
import useThemeStore from "../../Stores/useThemeStore";

const Card = ({
  children,
  className = "",
  hover = false,
  onClick = null,
  padding = "p-6",
  shadow = "shadow-md",
}) => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  return (
    <motion.div
      className={`rounded-lg ${padding} ${shadow} transition-all duration-300 ${
        currentTheme
          ? "bg-gray-800 border border-gray-700 shadow-lg shadow-gray-900/25"
          : "bg-white border border-gray-100 shadow-lg shadow-gray-500/10"
      } ${className}`}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      onClick={onClick}>
      {children}
    </motion.div>
  );
};

export const SkillCard = ({ icon, name, color }) => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  // Default color based on theme if not provided
  const cardColor =
    color ||
    (currentTheme
      ? "bg-gradient-to-br from-blue-600 to-purple-600"
      : "bg-gradient-to-br from-blue-500 to-purple-500");

  return (
    <Card hover>
      <div className="text-center">
        <div
          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${cardColor} text-white text-2xl font-bold mb-4 shadow-lg`}>
          {icon}
        </div>
        <h3
          className={`font-medium text-lg transition-colors duration-300 ${
            currentTheme ? "text-white" : "text-gray-900"
          }`}>
          {name}
        </h3>
      </div>
    </Card>
  );
};

export const ProjectCard = ({
  image,
  title,
  description,
  tech,
  liveUrl,
  githubUrl,
}) => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  return (
    <Card padding="p-0" hover>
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div
          className={`absolute inset-0 ${
            currentTheme
              ? "bg-gradient-to-t from-gray-900/40 to-transparent"
              : "bg-gradient-to-t from-white/20 to-transparent"
          }`}></div>
      </div>
      <div className="p-6">
        <h3
          className={`text-xl font-bold mb-2 transition-colors duration-300 ${
            currentTheme ? "text-white" : "text-gray-900"
          }`}>
          {title}
        </h3>
        <p
          className={`mb-4 leading-relaxed transition-colors duration-300 ${
            currentTheme ? "text-gray-300" : "text-gray-600"
          }`}>
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <span
              key={item}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                currentTheme
                  ? "bg-gray-700 text-blue-400 border border-gray-600"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}>
              {item}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg px-2 py-1 ${
              currentTheme
                ? "text-blue-400 hover:text-blue-300 focus:ring-blue-500 focus:ring-offset-gray-800"
                : "text-blue-600 hover:text-blue-700 focus:ring-blue-500 focus:ring-offset-white"
            }`}>
            Live Demo
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg px-2 py-1 ${
              currentTheme
                ? "text-gray-300 hover:text-white focus:ring-gray-500 focus:ring-offset-gray-800"
                : "text-gray-600 hover:text-gray-900 focus:ring-gray-500 focus:ring-offset-white"
            }`}>
            GitHub
            <svg
              className="w-4 h-4 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default Card;
