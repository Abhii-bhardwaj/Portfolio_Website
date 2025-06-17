import { motion } from "framer-motion";
import { memo, useMemo } from "react";

// Direction lookup table
const DIRECTION_CONFIG = {
  left: { initial: { x: -20 }, animate: { x: 0 } },
  right: { initial: { x: 20 }, animate: { x: 0 } },
  up: { initial: { y: 20 }, animate: { y: 0 } },
  down: { initial: { y: -20 }, animate: { y: 0 } },
};

const AnimatedElement = memo(
  ({
    children,
    delay = 0,
    direction = "up",
    className = "",
    onClick = null,
    hover = false,
  }) => {
    // Memoized animation config
    const animationConfig = useMemo(() => {
      const base = { initial: { opacity: 0 }, animate: { opacity: 1 } };
      const directionProps = DIRECTION_CONFIG[direction] || DIRECTION_CONFIG.up;

      return {
        initial: { ...base.initial, ...directionProps.initial },
        animate: { ...base.animate, ...directionProps.animate },
        transition: { duration: 0.4, delay, ease: "easeOut" },
        viewport: { once: true, margin: "-20px" },
        hover: hover ? { scale: 1.03 } : {},
        tap: hover ? { scale: 0.97 } : {},
      };
    }, [delay, direction, hover]);

    return (
      <motion.div
        className={className}
        initial={animationConfig.initial}
        whileInView={animationConfig.animate}
        viewport={animationConfig.viewport}
        transition={animationConfig.transition}
        whileHover={animationConfig.hover}
        whileTap={animationConfig.tap}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={onClick ? "Interactive element" : undefined}>
        {children}
      </motion.div>
    );
  }
);

AnimatedElement.displayName = "AnimatedElement";

export default AnimatedElement;
