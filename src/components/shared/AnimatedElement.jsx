// src/components/shared/AnimatedElement.jsx
import { motion } from "framer-motion";
import useThemeStore from "../../Stores/useThemeStore";

const AnimatedElement = ({
  children,
  delay = 0,
  direction = null,
  className = "",
  onClick = null,
  hover = false,
}) => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  // Base animation properties
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  // Add directional animation if specified
  if (direction === "left") {
    initial.x = -30;
    animate.x = 0;
  } else if (direction === "right") {
    initial.x = 30;
    animate.x = 0;
  } else if (direction === "up") {
    initial.y = 30;
    animate.y = 0;
  } else if (direction === "down") {
    initial.y = -30;
    animate.y = 0;
  } else {
    initial.y = 20;
    animate.y = 0;
  }

  // Hover animation
  const hoverAnimation = hover ? { scale: 1.05 } : {};
  const tapAnimation = hover ? { scale: 0.95 } : {};

  // Apply theme-aware classes to className if not already themed
  const themeAwareClassName =
    className.includes("bg-") || className.includes("text-")
      ? className
      : `${className} transition-colors duration-300`;

  return (
    <motion.div
      className={themeAwareClassName}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      onClick={onClick}>
      {children}
    </motion.div>
  );
};

export default AnimatedElement;
