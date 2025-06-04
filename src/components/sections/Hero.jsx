// src/components/sections/Hero.jsx
import { motion } from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Sparkles,
  Terminal,
  Zap,
  Layers,
} from "lucide-react";
import AnimatedElement from "../shared/AnimatedElement";
import useThemeStore from "../../Stores/useThemeStore";
import { useState, useEffect, useMemo, useCallback } from "react";

const Hero = () => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  // Typing animation text - memoized for performance
  const roles = useMemo(
    () => [
      "Frontend Developer",
      "React Specialist",
      "UI/UX Enthusiast",
      "Problem Solver",
    ],
    []
  );

  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Optimized typing animation with useCallback
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100; // Faster typing for better performance
    const currentText = roles[currentRole];

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText !== currentText) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else if (isDeleting && displayText !== "") {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      } else if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 1500); // Reduced pause time
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Memoized static data
  const codeSnippets = useMemo(
    () => [
      "const developer = 'Abhishek';",
      "function createAmazingUI() {",
      "  return React.magic();",
      "}",
      "// Building the future...",
      "export default Success;",
    ],
    []
  );

  const techStack = useMemo(
    () => [
      {
        name: "React",
        color: "text-blue-400",
        icon: "⚛️",
        iconColor: "text-blue-400",
      },
      {
        name: "Next.js",
        color: currentTheme ? "text-white" : "text-gray-900",
        icon: "▲",
        iconColor: currentTheme ? "text-white" : "text-gray-900",
      },
      {
        name: "TypeScript",
        color: "text-blue-300",
        icon: "TS",
        iconColor: "text-blue-500",
      },
      {
        name: "Tailwind",
        color: "text-cyan-400",
        icon: "🎨",
        iconColor: currentTheme ? "text-cyan-400" : "text-cyan-600",
      },
      {
        name: "Node.js",
        color: "text-green-400",
        icon: "🟢",
        iconColor: "text-green-400",
      },
      {
        name: "MongoDB",
        color: "text-green-500",
        icon: "🍃",
        iconColor: "text-green-500",
      },
    ],
    [currentTheme]
  );

  // Optimized animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      },
    }),
    []
  );

  // Optimized button handlers
  const handleResumeClick = useCallback(() => {
    window.open(
      "https://drive.google.com/file/d/1K2s3-qPWW9QzbAK7EYTqaZtjJwbX33Kh/view?usp=drive_link"
    );
  }, []);

  const handleConnectClick = useCallback(() => {
    scrollToSection("contact");
  }, [scrollToSection]);

  return (
    <section
      id="hero"
      className={`py-20 transition-colors duration-300 ${
        currentTheme
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                currentTheme
                  ? "bg-green-600/20 text-green-400 border border-green-500/30"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}>
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Available for Opportunities
            </motion.div>

            {/* Greeting */}
            <motion.div
              variants={itemVariants}
              className={`text-lg mb-4 font-medium ${
                currentTheme ? "text-blue-400" : "text-blue-600"
              }`}>
              <span className="inline-block animate-bounce">👋</span> Hello, I'm
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight ${
                currentTheme ? "text-white" : "text-gray-900"
              }`}>
              <span
                className={`${
                  currentTheme ? "text-blue-400" : "text-blue-600"
                } relative`}>
                Abhishek
                <motion.div
                  className={`absolute -top-2 -right-2 ${
                    currentTheme ? "text-yellow-400" : "text-yellow-500"
                  }`}
                  animate={{
                    rotate: [0, 20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}>
                  <Sparkles size={24} />
                </motion.div>
              </span>{" "}
              <span className="block lg:inline">Bhardwaj</span>
            </motion.h1>

            {/* Animated Role Title */}
            <motion.h2
              variants={itemVariants}
              className={`text-xl sm:text-2xl lg:text-3xl mb-6 font-medium min-h-[40px] ${
                currentTheme ? "text-gray-300" : "text-gray-700"
              }`}>
              <span
                className={`${
                  currentTheme ? "text-purple-400" : "text-purple-600"
                }`}>
                {displayText}
              </span>
              <span className="animate-pulse">|</span>
            </motion.h2>

            {/* Enhanced Description */}
            <motion.p
              variants={itemVariants}
              className={`text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
                currentTheme ? "text-gray-300" : "text-gray-700"
              }`}>
              I craft{" "}
              <span
                className={`${
                  currentTheme
                    ? "text-blue-400 font-semibold"
                    : "text-blue-600 font-semibold"
                } relative`}>
                pixel-perfect
              </span>{" "}
              and{" "}
              <span
                className={`${
                  currentTheme
                    ? "text-cyan-400 font-semibold"
                    : "text-cyan-600 font-semibold"
                }`}>
                lightning-fast
              </span>{" "}
              web experiences that drive results. Specialized in{" "}
              <span className="font-semibold">React.js</span>,{" "}
              <span className="font-semibold">Next.js</span>, and modern
              frontend architecture.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <motion.button
                onClick={handleResumeClick}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`group flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 will-change-transform ${
                  currentTheme
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white focus:ring-blue-500/50 shadow-2xl shadow-blue-500/25"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white focus:ring-blue-500/50 shadow-2xl shadow-blue-500/25"
                }`}>
                <Download
                  size={20}
                  className="mr-2 group-hover:animate-bounce"
                />
                Download Resume
                <ExternalLink
                  size={16}
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </motion.button>

              <motion.button
                onClick={handleConnectClick}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 backdrop-blur-sm will-change-transform ${
                  currentTheme
                    ? "border-2 border-gray-500 text-gray-300 hover:bg-gray-700/50 hover:border-gray-400 focus:ring-gray-500/50"
                    : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50/50 hover:border-gray-400 focus:ring-gray-300/50"
                }`}>
                Let's Connect
                <Code
                  size={16}
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Enhanced Right Content - Optimized Code Visualization */}
          <motion.div
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              {/* Floating Code Editor - Optimized */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative w-full h-full rounded-2xl overflow-hidden will-change-transform ${
                  currentTheme
                    ? "bg-gray-900/95 border border-gray-700/50"
                    : "bg-white/95 border border-gray-200/50"
                } backdrop-blur-sm shadow-2xl`}>
                {/* Terminal Header */}
                <div
                  className={`flex items-center px-4 py-3 ${
                    currentTheme ? "bg-gray-800/90" : "bg-gray-100/90"
                  } border-b ${
                    currentTheme ? "border-gray-700/50" : "border-gray-200/50"
                  }`}>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div
                    className={`flex items-center ml-4 ${
                      currentTheme ? "text-gray-400" : "text-gray-600"
                    }`}>
                    <Terminal size={16} className="mr-2" />
                    <span className="text-sm font-mono">developer.js</span>
                  </div>
                </div>

                {/* Code Content - Optimized animations */}
                <div className="p-4 h-full overflow-hidden">
                  <div className="font-mono text-sm space-y-2">
                    {codeSnippets.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.5 + index * 0.1,
                          ease: "easeOut",
                        }}
                        className={`flex items-center ${
                          currentTheme ? "text-gray-300" : "text-gray-700"
                        }`}>
                        <span
                          className={`w-6 text-xs ${
                            currentTheme ? "text-gray-500" : "text-gray-400"
                          }`}>
                          {index + 1}
                        </span>
                        <span
                          className={`ml-2 ${
                            line.includes("const") ||
                            line.includes("function") ||
                            line.includes("export")
                              ? currentTheme
                                ? "text-purple-400"
                                : "text-purple-600"
                              : line.includes("//")
                              ? currentTheme
                                ? "text-green-400"
                                : "text-green-600"
                              : ""
                          }`}>
                          {line}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Optimized Blinking Cursor */}
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`inline-block w-2 h-5 mt-2 ml-8 will-change-auto ${
                      currentTheme ? "bg-blue-400" : "bg-blue-600"
                    }`}
                  />
                </div>
              </motion.div>

              {/* Optimized Floating Tech Stack Icons */}
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.8 + index * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4 + index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse",
                  }}
                  className={`absolute will-change-transform ${
                    index === 0
                      ? "-top-4 -left-4"
                      : index === 1
                      ? "-top-6 right-8"
                      : index === 2
                      ? "top-12 -right-8"
                      : index === 3
                      ? "bottom-16 -right-6"
                      : index === 4
                      ? "-bottom-4 left-8"
                      : "-bottom-6 -left-6"
                  } ${
                    currentTheme
                      ? "bg-gray-800/95 border border-gray-600/50"
                      : "bg-white/95 border border-gray-300/50"
                  } backdrop-blur-sm rounded-xl p-3 shadow-lg`}>
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg ${tech.iconColor || tech.color}`}>
                      {tech.icon}
                    </span>
                    <span className={`text-sm font-semibold ${tech.color}`}>
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Reduced and Optimized Particles */}
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  className={`absolute w-1.5 h-1.5 rounded-full will-change-transform ${
                    currentTheme ? "bg-blue-400/40" : "bg-blue-600/40"
                  }`}
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${30 + index * 15}%`,
                    top: `${40 + index * 10}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
