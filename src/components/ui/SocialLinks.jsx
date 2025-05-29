// SocialLinks.jsx - Redesigned with theme support
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import useThemeStore from "../../Stores/useThemeStore";

const SocialLinks = ({ size = "sm" }) => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 26,
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/abhibhardwaj",
      icon: Github,
      hoverColor: currentTheme ? "hover:bg-gray-700" : "hover:bg-gray-100",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/abhibhardwaj",
      icon: Linkedin,
      hoverColor: currentTheme ? "hover:bg-blue-900/50" : "hover:bg-blue-100",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/abhibhardwaj",
      icon: Twitter,
      hoverColor: currentTheme ? "hover:bg-sky-900/50" : "hover:bg-sky-100",
    },
    {
      name: "Email",
      url: "mailto:abhibhardwaj622@gmail.com",
      icon: Mail,
      hoverColor: currentTheme ? "hover:bg-green-900/50" : "hover:bg-green-100",
    },
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className={`${
            sizeClasses[size]
          } rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
            currentTheme
              ? "bg-gray-800 text-gray-300 hover:text-white shadow-lg shadow-gray-900/50"
              : "bg-white text-gray-600 hover:text-gray-900 shadow-lg shadow-gray-200/50"
          } ${link.hoverColor}`}
          aria-label={link.name}>
          <link.icon size={iconSizes[size]} />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
