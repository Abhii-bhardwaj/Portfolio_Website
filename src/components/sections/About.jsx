import { motion } from "framer-motion";
import { useState, useCallback, useMemo, memo } from "react";
import SectionHeading from "../shared/SectionHeading";
import useThemeStore from "../../Stores/useThemeStore";

// Static data
const INFO_DATA = [
  { label: "Name", value: "Abhishek Bhardwaj", icon: "👨‍💻" },
  { label: "Email", value: "abhibhardwaj622@gmail.com", icon: "📧" },
  { label: "Education", value: "MCA (Persuing)", icon: "🎓" },
  { label: "Location", value: "Agra, India", icon: "📍" },
];

const PARAGRAPH_CONTENT = [
  "I'm currently pursuing my MCA at Lovely Professional University, building on my foundation as a BCA graduate with a deep passion for creating modern, interactive web experiences. What began as simple curiosity with HTML and CSS has grown into a strong command of frontend technologies.",
  "I specialize in developing responsive and dynamic web applications using React.js, Tailwind CSS, and DaisyUI. My focus is on building clean, scalable, and visually appealing UIs while experimenting with advanced tools like Framer Motion and Three.js for immersive user experiences.",
  "As I continue growing in the tech world, my goal is to become an industry-level frontend developer and work on impactful, high-quality projects that blend creativity with technology. Let’s connect and create something extraordinary together!",
];



// CSS constants
const BASE_CLASSES = {
  section: "py-20 transition-all duration-200",
  darkSection: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
  lightSection: "bg-gradient-to-br from-blue-50 via-white to-purple-50",
  content: "p-7 rounded-lg backdrop-blur-sm shadow-lg border",
  darkContent: "bg-gray-800/40 border-gray-400/30",
  lightContent: "bg-white/60 border-gray-200/30",
  card: "p-4 rounded-xl cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
  darkCard:
    "bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50 hover:border-blue-500/50",
  lightCard:
    "bg-gray-50/50 border-gray-200/50 hover:bg-white/70 hover:border-blue-400/50",
  darkSpinner: "bg-gray-800/50",
  lightSpinner: "bg-gray-100/50",
  spinnerBorder: "border-2 border-t-transparent rounded-full animate-spin",
};

// Memoized InfoCard
const InfoCard = memo(
  ({ item, index, activeCard, setActiveCard, currentTheme }) => {
    const isActive = activeCard === index;

    const cardStyles = useMemo(
      () => ({
        base: `${BASE_CLASSES.card} ${
          currentTheme ? BASE_CLASSES.darkCard : BASE_CLASSES.lightCard
        }`,
        label: isActive
          ? currentTheme
            ? "text-blue-300"
            : "text-blue-700"
          : currentTheme
          ? "text-blue-400"
          : "text-blue-600",
        value: isActive
          ? currentTheme
            ? "text-white"
            : "text-gray-900"
          : currentTheme
          ? "text-gray-300"
          : "text-gray-700",
      }),
      [currentTheme, isActive]
    );

    const handleInteraction = useCallback(() => {
      setActiveCard(isActive ? null : index);
    }, [isActive, index, setActiveCard]);

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleInteraction();
        }
      },
      [handleInteraction]
    );

    return (
      <motion.div
        className={cardStyles.base}
        whileTap={{ scale: 0.99 }}
        onClick={handleInteraction}
        onHoverStart={handleInteraction}
        onKeyDown={handleKeyDown}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        role="button"
        tabIndex={0}
        aria-label={`Toggle ${item.label} information`}>
        <div className="relative flex items-start gap-2">
          <motion.span
            className="text-lg flex-shrink-0 mt-0.5"
            transition={{ duration: 0.2 }}>
            {item.icon}
          </motion.span>
          <div className="flex-1">
            <span
              className={`font-semibold block mb-1 transition-colors duration-200 ${cardStyles.label}`}>
              {item.label}:
            </span>
            <span
              className={`transition-colors duration-200 ${cardStyles.value}`}>
              {item.value}
            </span>
          </div>
          <motion.div
            className={`absolute left-0 top-0 w-1 h-full rounded-r ${
              currentTheme ? "bg-blue-400" : "bg-blue-500"
            }`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isActive ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>
    );
  }
);

// Memoized ParagraphContent
const ParagraphContent = memo(({ currentTheme }) => (
  <div className="space-y-4 mb-8">
    {PARAGRAPH_CONTENT.map((text, index) => (
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
        className={`leading-relaxed ${
          currentTheme ? "text-gray-300" : "text-gray-700"
        }`}>
        {text}
      </motion.p>
    ))}
  </div>
));

// Memoized ImageSection
const ImageSection = memo(
  ({
    currentTheme,
    imageLoaded,
    imageError,
    handleImageLoad,
    handleImageError,
  }) => (
    <motion.div
      className="lg:w-1/2 flex justify-center"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5 }}>
      <div className="relative group">
        <div className="absolute -inset-4">
          <div
            className={`w-full h-full rounded-3xl transform rotate-3 ${
              currentTheme
                ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20"
                : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
            } backdrop-blur-sm transition-all duration-200`}
          />
        </div>
        <div className="absolute -inset-2">
          <div
            className={`w-full h-full rounded-2xl transform -rotate-2 ${
              currentTheme
                ? "bg-gradient-to-tl from-purple-600/15 to-pink-600/15"
                : "bg-gradient-to-tl from-purple-500/15 to-pink-500/15"
            } backdrop-blur-sm transition-all duration-200`}
          />
        </div>
        <motion.div
          className="relative w-72 h-72 sm:w-80 sm:h-80"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}>
          <div
            className={`w-full h-full rounded-2xl overflow-hidden border-2 ${
              currentTheme
                ? "border-gray-700/50 shadow-2xl shadow-blue-500/20"
                : "border-white/80 shadow-2xl shadow-gray-500/20"
            } backdrop-blur-sm`}>
            {imageError ? (
              <div
                className={`w-full h-full flex items-center justify-center ${
                  currentTheme
                    ? "bg-gray-800/50 text-gray-300"
                    : "bg-gray-100/50 text-gray-700"
                }`}>
                <span className="text-sm">Image Failed to Load</span>
              </div>
            ) : !imageLoaded ? (
              <div
                className={`w-full h-full flex items-center justify-center ${
                  currentTheme
                    ? BASE_CLASSES.darkSpinner
                    : BASE_CLASSES.lightSpinner
                }`}>
                <div
                  className={`w-8 h-8 ${BASE_CLASSES.spinnerBorder} ${
                    currentTheme ? "border-blue-400" : "border-blue-500"
                  }`}
                />
              </div>
            ) : null}
            <img
              src="/Abhi.jpeg"
              alt="Abhishek Bhardwaj, Frontend Developer and BCA Student"
              loading="lazy"
              fetchPriority="high"
              decoding="async"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-contain transition-all duration-500 ${
                imageLoaded && !imageError
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              } group-hover:scale-110`}
            />
            <div
              className={`absolute inset-0 ${
                currentTheme
                  ? "bg-gradient-to-t from-gray-800/40 via-transparent to-transparent"
                  : "bg-gradient-to-t from-black/20 via-transparent to-transparent"
              } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
            />
          </div>
          <motion.div
            className={`absolute -bottom-4 -right-4 px-4 py-2 rounded-full ${
              currentTheme
                ? "bg-gray-800/90 border-gray-700/50 text-blue-400"
                : "bg-white/90 border-gray-200/50 text-blue-600"
            } border backdrop-blur-md shadow-lg font-medium text-sm`}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.3 }}>
            Frontend Dev
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
);

const About = () => {
  const { isDarkMode = false } = useThemeStore();
  const currentTheme = useMemo(() => isDarkMode, [isDarkMode]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoaded(false);
    setImageError(true);
  }, []);

  return (
    <section
      id="about"
      className={`${BASE_CLASSES.section} ${
        currentTheme ? BASE_CLASSES.darkSection : BASE_CLASSES.lightSection
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading title="About Me" />
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <ImageSection
            currentTheme={currentTheme}
            imageLoaded={imageLoaded}
            imageError={imageError}
            handleImageLoad={handleImageLoad}
            handleImageError={handleImageError}
          />
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5 }}>
            <div
              className={`${BASE_CLASSES.content} ${
                currentTheme
                  ? BASE_CLASSES.darkContent
                  : BASE_CLASSES.lightContent
              }`}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={`text-2xl lg:text-3xl font-bold mb-6 ${
                  currentTheme ? "text-white" : "text-gray-900"
                }`}>
                Frontend {}
                <span
                  className={` mt-1 ${
                    currentTheme ? "text-blue-400" : "text-blue-600"
                  }`}>
                  Developer
                </span>
              </motion.h3>
              <ParagraphContent currentTheme={currentTheme} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INFO_DATA.map((item, index) => (
                  <InfoCard
                    key={item.label}
                    item={item}
                    index={index}
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                    currentTheme={currentTheme}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
