import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useMemo, useCallback, memo, useEffect } from "react";
import SectionHeading from "../shared/SectionHeading";
import useThemeStore from "../../Stores/useThemeStore";
import AchievementCard from "../ui/AchivementCard";
import { ACHIEVEMENTS_DATA } from "../../data/achievements";

// Compact background particle
const BackgroundParticle = memo(({ i, dark }) => (
  <motion.div
    className={`absolute w-72 h-72 rounded-full blur-3xl ${
      dark ? "bg-blue-500/2" : "bg-purple-500/2"
    }`}
    style={{ left: `${10 + i * 40}%`, top: `${20 + (i % 2) * 30}%` }}
    animate={{ x: [0, 30, 0], y: [0, -15, 0], scale: [1, 1.03, 1] }}
    transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "easeInOut" }}
  />
));

// Carousel Navigation Button
const NavButton = memo(({ direction, onClick, disabled, dark }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`
      absolute ${
        direction === "prev" ? "left-4" : "right-4"
      } top-1/2 -translate-y-1/2 z-30
      w-12 h-12 rounded-full backdrop-blur-xl shadow-lg transition-all duration-200
      ${
        dark
          ? "bg-gray-800/80 border border-gray-700/50 text-white"
          : "bg-white/90 border border-gray-200/60 text-gray-900"
      }
      ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:scale-110 active:scale-95"
      }
    `}
    whileHover={!disabled ? { scale: 1.1 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}>
    <svg
      className="w-5 h-5 mx-auto"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  </motion.button>
));

// Progress Indicators
const ProgressDots = memo(({ total, current, onClick, dark }) => (
  <div className="flex justify-center space-x-2 mt-8">
    {ACHIEVEMENTS_DATA.map((_, i) => (
      <motion.button
        key={i}
        onClick={() => onClick(i)}
        className={`w-2 h-2 rounded-full transition-all duration-200 ${
          current === i
            ? dark
              ? "bg-blue-400"
              : "bg-blue-600"
            : dark
            ? "bg-gray-600"
            : "bg-gray-300"
        }`}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
      />
    ))}
  </div>
));

const Achievements = () => {
  const { isDarkMode } = useThemeStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const theme = useMemo(() => isDarkMode, [isDarkMode]);
  const totalCards = ACHIEVEMENTS_DATA.length;

  // Auto-play functionality - always running
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalCards]);

  // Navigation handlers
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  }, [totalCards]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const goToSlide = useCallback((slideIndex) => {
    setCurrentIndex(slideIndex);
  }, []);

  // Get card position for each index
  const getCardPosition = (cardIndex) => {
    const diff = cardIndex - currentIndex;

    if (diff === 0) return "center";
    if (diff === 1 || diff === -(totalCards - 1)) return "right";
    if (diff === -1 || diff === totalCards - 1) return "left";
    return "hidden";
  };

  const sectionClass = `relative py-20 transition-all duration-300 overflow-hidden ${
    theme
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
  }`;

  const ctaClass = `inline-block p-6 rounded-2xl backdrop-blur-xl shadow-xl transition-all duration-300 ${
    theme
      ? "bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-gray-700/50"
      : "bg-gradient-to-r from-white/90 to-gray-50/90 border border-gray-200/60"
  }`;

  const handleContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="achievements" className={sectionClass}>
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <BackgroundParticle key={i} i={i} dark={theme} />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading title="Achievements & Certifications" />

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Viewport */}
          <div className="relative h-[500px] overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              {ACHIEVEMENTS_DATA.map((achievement, index) => {
                const position = getCardPosition(index);

                let transform = "";
                let scale = 1;
                let opacity = 1;
                let zIndex = 1;

                switch (position) {
                  case "center":
                    transform = "translateX(0%)";
                    scale = 1;
                    opacity = 1;
                    zIndex = 20;
                    break;
                  case "right":
                    transform = "translateX(70%)";
                    scale = 0.8;
                    opacity = 0.6;
                    zIndex = 10;
                    break;
                  case "left":
                    transform = "translateX(-70%)";
                    scale = 0.8;
                    opacity = 0.6;
                    zIndex = 10;
                    break;
                  default:
                    transform = "translateX(200%)";
                    scale = 0.6;
                    opacity = 0;
                    zIndex = 1;
                }

                return (
                  <motion.div
                    key={achievement.id}
                    className="absolute w-80 h-full"
                    style={{ left: "50%", marginLeft: "-160px" }}
                    animate={{
                      x: transform.includes("translateX(")
                        ? transform.match(/-?\d+/)[0] + "%"
                        : "0%",
                      scale,
                      opacity,
                      zIndex,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    onClick={() => position !== "center" && goToSlide(index)}>
                    <div className="w-full h-full cursor-pointer">
                      <AchievementCard
                        achievement={achievement}
                        index={index}
                        currentTheme={theme}
                        isHovered={false}
                        setHoveredCard={() => {}}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <NavButton
              direction="prev"
              onClick={goToPrev}
              disabled={false}
              dark={theme}
            />
            <NavButton
              direction="next"
              onClick={goToNext}
              disabled={false}
              dark={theme}
            />
          </div>

          {/* Progress Dots */}
          <ProgressDots
            total={totalCards}
            current={currentIndex}
            onClick={goToSlide}
            dark={theme}
          />
        </div>

        {/* Compact CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}>
          <motion.div className={ctaClass} whileHover={{ scale: 1.02, y: -2 }}>
            <p
              className={`text-xl font-bold mb-4 ${
                theme ? "text-white" : "text-gray-900"
              }`}>
              Let's create something amazing together!
            </p>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={handleContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Start Project 🚀
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Achievements);
