import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import useThemeStore from "../../Stores/useThemeStore";

// CSS constants
const BASE_CLASSES = {
  base: "rounded-lg font-semibold transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4",
  disabled: "disabled:opacity-50",
  fullWidth: "w-full",
  sizes: {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-7 py-3 text-lg",
  },
  variants: {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500/50 shadow-lg shadow-blue-600/25 disabled:bg-blue-500",
    outline:
      "border-2 text-gray-300 hover:bg-gray-700 hover:border-gray-400 focus:ring-gray-500/50",
    ghost:
      "bg-transparent text-gray-300 hover:bg-gray-800 focus:ring-gray-500/50",
    secondary:
      "bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500/50 shadow-lg disabled:bg-gray-600",
  },
};

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
  const { isDarkMode = false } = useThemeStore();

  // Memoized classes
  const buttonClasses = useMemo(() => {
    const validVariant = BASE_CLASSES.variants[variant] ? variant : "primary";
    const validSize = BASE_CLASSES.sizes[size] ? size : "md";
    return `${BASE_CLASSES.base} ${BASE_CLASSES.sizes[validSize]} ${
      BASE_CLASSES.variants[validVariant]
    } ${fullWidth ? BASE_CLASSES.fullWidth : ""} ${
      BASE_CLASSES.disabled
    } ${className}`;
  }, [variant, size, fullWidth, className]);

  // Aria label for accessibility
  const ariaLabel =
    children && !icon ? undefined : `Button ${children || "with icon"}`;

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.15 }}
      aria-label={ariaLabel}
      aria-disabled={disabled}>
      {icon && iconPosition === "left" && (
        <span className="mr-1.5">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-1.5">{icon}</span>
      )}
    </motion.button>
  );
};

Button.displayName = "Button";

export default memo(Button);
