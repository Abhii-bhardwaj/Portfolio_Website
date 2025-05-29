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
} from "lucide-react";
import AnimatedElement from "../shared/AnimatedElement";
import useThemeStore from "../../Stores/useThemeStore";
import { useState, useEffect } from "react";

const Hero = () => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  // Typing animation text
  const roles = [
    "Frontend Developer",
    "React Specialist",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 100 : 150;
    const currentText = roles[currentRole];

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText !== currentText) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else if (isDeleting && displayText !== "") {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      } else if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          <AnimatedElement
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-lg mb-4 font-medium ${
                currentTheme ? "text-blue-400" : "text-blue-600"
              }`}>
              <span className="inline-block animate-bounce">👋</span> Hello, I'm
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
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
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}>
                  <Sparkles size={24} />
                </motion.div>
              </span>{" "}
              <span className="block lg:inline">Bhardwaj</span>
            </motion.h1>

            {/* Animated Role Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <motion.button
                onClick={() => window.open("/Abhishek_Bhardwaj_Resume.pdf")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`group flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 ${
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
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection("contact")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 backdrop-blur-sm ${
                  currentTheme
                    ? "border-2 border-gray-500 text-gray-300 hover:bg-gray-700/50 hover:border-gray-400 focus:ring-gray-500/50"
                    : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50/50 hover:border-gray-400 focus:ring-gray-300/50"
                }`}>
                Let's Connect
                <Code
                  size={16}
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.button>
            </motion.div>
          </AnimatedElement>

          {/* Enhanced Right Content - Profile Image */}
          <AnimatedElement
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative">
              {/* Decorative Background */}
              <div
                className={`absolute inset-0 rounded-full ${
                  currentTheme
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                } opacity-20 blur-2xl transform scale-110`}></div>

              {/* Profile Image Container */}
              <div
                className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 ${
                  currentTheme
                    ? "border-blue-500 shadow-2xl shadow-blue-500/25"
                    : "border-blue-400 shadow-2xl shadow-blue-500/25"
                } transform transition-transform duration-300`}>
                <img
                  src="/Abhi.jpg"
                  alt="Abhishek Bhardwaj - Frontend Developer"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay for better contrast */}
                <div
                  className={`absolute inset-0 ${
                    currentTheme
                      ? "bg-gradient-to-t from-gray-900/20 to-transparent"
                      : "bg-gradient-to-t from-white/10 to-transparent"
                  }`}></div>
              </div>
            </motion.div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default Hero;
