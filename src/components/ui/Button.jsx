// Button.jsx - Redesigned with theme support
import { motion } from "framer-motion";
import useThemeStore from "../../Stores/useThemeStore";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  fullWidth = false,
  icon = null,
  iconPosition = "left",
}) => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  // Base classes
  const baseClasses =
    "rounded-lg font-semibold transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 transform";

  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Variant classes with theme support
  const variantClasses = {
    primary: currentTheme
      ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500/50 shadow-lg shadow-blue-600/25 disabled:bg-blue-800 disabled:opacity-50"
      : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500/50 shadow-lg shadow-blue-600/25 disabled:bg-blue-400 disabled:opacity-50",

    outline: currentTheme
      ? "border-2 border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400 focus:ring-gray-500/50 disabled:opacity-50"
      : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-300/50 disabled:opacity-50",

    ghost: currentTheme
      ? "bg-transparent text-gray-300 hover:bg-gray-800 focus:ring-gray-500/50 disabled:opacity-50"
      : "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300/50 disabled:opacity-50",

    secondary: currentTheme
      ? "bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500/50 shadow-lg disabled:bg-gray-800 disabled:opacity-50"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300/50 shadow-lg disabled:bg-gray-100 disabled:opacity-50",
  };

  // Width class
  const widthClass = fullWidth ? "w-full" : "";

  // Icon positioning
  const iconElement = icon && (
    <span className={iconPosition === "left" ? "mr-2" : "ml-2"}>{icon}</span>
  );

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}>
      {iconPosition === "left" && iconElement}
      {children}
      {iconPosition === "right" && iconElement}
    </motion.button>
  );
};

export default Button;
