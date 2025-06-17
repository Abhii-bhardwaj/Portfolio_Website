import { memo } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import useThemeStore from "../../Stores/useThemeStore";
import { socialLinks } from "../../data/socialLinks";

// CSS constants
const BASE_CLASSES = {
  container: "flex space-x-3",
  link: "rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50",
  darkLink:
    "bg-gray-800 text-gray-300 hover:text-white shadow-md shadow-gray-900/50",
  lightLink:
    "bg-white text-gray-600 hover:text-gray-900 shadow-md shadow-gray-200/50",
  sizes: {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-13 h-13",
  },
  iconSizes: {
    sm: 16,
    md: 20,
    lg: 24,
  },
};

const SocialLinks = memo(({ size = "sm" }) => {
  const { isDarkMode = false } = useThemeStore();
  const validSize = BASE_CLASSES.sizes[size] ? size : "sm";

  return (
    <div className={BASE_CLASSES.container}>
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, delay: index * 0.08 }}
          whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.97 }}
          className={`${BASE_CLASSES.link} ${BASE_CLASSES.sizes[validSize]} ${
            isDarkMode ? BASE_CLASSES.darkLink : BASE_CLASSES.lightLink
          } ${link.hoverColor(isDarkMode)}`}
          aria-label={`Visit my ${link.name} profile`}
          tabIndex={0}>
          <link.icon size={BASE_CLASSES.iconSizes[validSize]} />
        </motion.a>
      ))}
    </div>
  );
});

SocialLinks.displayName = "SocialLinks";

export default SocialLinks;
