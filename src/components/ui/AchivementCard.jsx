import { motion } from "framer-motion";
import { useCallback, useMemo, memo, useState } from "react";

const AchievementCard = memo(
  ({ achievement, index, currentTheme, isHovered, setHoveredCard }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Memoized event handlers
    const handleMouseEnter = useCallback(() => {
      setHoveredCard(index);
    }, [index, setHoveredCard]);

    const handleMouseLeave = useCallback(() => {
      setHoveredCard(null);
    }, [setHoveredCard]);

    const handleCertificateClick = useCallback(
      (e) => {
        e.stopPropagation();
        if (achievement.certificateLink) {
          window.open(
            achievement.certificateLink,
            "_blank",
            "noopener,noreferrer"
          );
        }
      },
      [achievement.certificateLink]
    );

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    // Memoized computed values
    const computedValues = useMemo(
      () => ({
        cardClasses: `
        relative group cursor-pointer overflow-hidden h-full
        ${
          currentTheme
            ? "bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 border border-gray-700/50"
            : "bg-gradient-to-br from-white/98 via-gray-50/95 to-white/98 border border-gray-200/60"
        }
        backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:-translate-y-1
      `,
        categoryClasses: `
        text-xs font-semibold uppercase tracking-wider
        ${currentTheme ? "text-gray-400" : "text-gray-600"}
      `,
        titleClasses: `
        text-lg font-bold leading-tight mb-2
        ${currentTheme ? "text-white" : "text-gray-900"}
      `,
        descriptionClasses: `
        text-sm leading-relaxed
        ${currentTheme ? "text-gray-300" : "text-gray-700"}
      `,
        iconContainerClasses: `
        text-3xl p-2 rounded-xl
        ${currentTheme ? "bg-gray-800/50" : "bg-gray-100/80"}
        backdrop-blur-sm
      `,
      }),
      [currentTheme]
    );

    // Optimized animation variants
    const cardVariants = useMemo(
      () => ({
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.4,
            delay: index * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }),
      [index]
    );

    const overlayVariants = useMemo(
      () => ({
        initial: { opacity: 0, scale: 1 },
        hover: { opacity: 0.08, scale: 1.01 },
      }),
      []
    );

    const glowVariants = useMemo(
      () => ({
        initial: { opacity: 0, scale: 1 },
        hover: { opacity: 0.3, scale: 1.02 },
      }),
      []
    );

    // Reduced particles for better performance
    const particles = useMemo(
      () =>
        [...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full ${
              currentTheme ? "bg-white/10" : "bg-blue-500/10"
            }`}
            style={{
              left: `${30 + i * 30}%`,
              top: `${25 + i * 25}%`,
            }}
            animate={
              isHovered
                ? {
                    y: [-5, -10, -5],
                    opacity: [0.1, 0.4, 0.1],
                    scale: [1, 1.2, 1],
                  }
                : {
                    y: [0, -2, 0],
                    opacity: [0.05, 0.15, 0.05],
                    scale: [0.8, 1, 0.8],
                  }
            }
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )),
      [currentTheme, isHovered]
    );

    return (
      <motion.div
        className={computedValues.cardClasses}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        layout={false}>
        {/* Optimized Dynamic Gradient Overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${achievement.gradient} rounded-3xl`}
          variants={overlayVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          transition={{ duration: 0.25 }}
        />

        {/* Optimized Glowing Border Effect */}
        <motion.div
          className={`absolute -inset-0.5 bg-gradient-to-r ${achievement.gradient} rounded-3xl blur-lg`}
          variants={glowVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          transition={{ duration: 0.25 }}
        />

        {/* Optimized Background Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {particles}
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Certificate Image Section - Clickable */}
          {achievement.certificateImage && (
            <motion.div
              className="mb-4 relative overflow-hidden rounded-xl cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              onClick={handleCertificateClick}>
              <div className="relative group/image">
                {/* Image loading placeholder */}
                {!imageLoaded && (
                  <div
                    className={`w-full h-40 rounded-xl animate-pulse ${
                      currentTheme ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  />
                )}

                <img
                  src={achievement.certificateImage}
                  alt={`${achievement.title} Certificate`}
                  className={`w-full h-40 object-cover rounded-xl shadow-lg transition-all duration-300 group-hover/image:scale-105 ${
                    imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
                  }`}
                  loading="lazy"
                  onLoad={handleImageLoad}
                  decoding="async"
                />

                {/* Click to View Overlay */}
                {imageLoaded && achievement.certificateLink && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 rounded-xl flex items-end justify-center pb-3"
                    whileHover={{ opacity: 1 }}>
                    <motion.span
                      className="text-white font-semibold text-sm px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/20"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}>
                      🔗 Click to View Certificate
                    </motion.span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <motion.div
                className={`text-2xl font-bold mb-1 bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent`}
                animate={{ scale: isHovered ? 1.03 : 1 }}
                transition={{ duration: 0.2 }}>
                {achievement.count}
              </motion.div>

              <div className={computedValues.categoryClasses}>
                {achievement.category}
              </div>
            </div>

            <motion.div
              className={computedValues.iconContainerClasses}
              animate={{
                rotate: isHovered ? [0, -3, 3, 0] : 0,
                scale: isHovered ? 1.03 : 1,
              }}
              transition={{ duration: 0.3 }}>
              {achievement.icon}
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col">
            <h3 className={computedValues.titleClasses}>{achievement.title}</h3>

            <p className={`${computedValues.descriptionClasses} flex-1`}>
              {achievement.description}
            </p>

            {/* Achievement Badge */}
            {achievement.certificateLink && (
              <motion.div
                className={`mt-4 self-start px-3 py-1.5 rounded-full text-xs font-semibold ${
                  currentTheme
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}>
                ✓ Certified
              </motion.div>
            )}
          </div>
        </div>

        {/* Simplified Corner Accent */}
        <motion.div
          className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${achievement.gradient} rounded-bl-2xl`}
          animate={{
            scale: isHovered ? 1.05 : 1,
            opacity: isHovered ? 0.15 : 0.06,
          }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>
    );
  }
);

AchievementCard.displayName = "AchievementCard";

export default AchievementCard;
