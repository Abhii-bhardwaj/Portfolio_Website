// src/components/sections/About.jsx
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import SectionHeading from "../shared/SectionHeading";
import AnimatedElement from "../shared/AnimatedElement";
import useThemeStore from "../../Stores/useThemeStore";

const About = () => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  const infoData = [
    { label: "Name", value: "Abhishek Bhardwaj", icon: "👨‍💻" },
    { label: "Email", value: "abhibhardwaj622@gmail.com", icon: "📧" },
    { label: "Education", value: "BCA (Final Year)", icon: "🎓" },
    { label: "Location", value: "Agra, India", icon: "📍" },
  ];

  return (
    <section
      id="about"
      className={`py-20 transition-colors duration-300 ${
        currentTheme
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading title="About Me" />

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Professional Image Section */}
          <AnimatedElement
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div className="relative group">
              {/* Geometric Background */}
              <div className="absolute -inset-4">
                <div
                  className={`w-full h-full rounded-3xl transform rotate-3 ${
                    currentTheme
                      ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20"
                      : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                  } backdrop-blur-sm`}
                />
              </div>

              <div className="absolute -inset-2">
                <div
                  className={`w-full h-full rounded-2xl transform -rotate-2 ${
                    currentTheme
                      ? "bg-gradient-to-tl from-purple-600/15 to-pink-600/15"
                      : "bg-gradient-to-tl from-purple-500/15 to-pink-500/15"
                  } backdrop-blur-sm`}
                />
              </div>

              {/* Main Image Container */}
              <motion.div
                className="relative w-72 h-72 sm:w-80 sm:h-80"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}>
                <div
                  className={`w-full h-full rounded-2xl overflow-hidden border-2 ${
                    currentTheme
                      ? "border-gray-700/50 shadow-2xl shadow-blue-500/20"
                      : "border-white/80 shadow-2xl shadow-gray-500/20"
                  } backdrop-blur-sm`}>
                  {/* Loading State */}
                  {!imageLoaded && (
                    <div
                      className={`w-full h-full flex items-center justify-center ${
                        currentTheme ? "bg-gray-800/50" : "bg-gray-100/50"
                      }`}>
                      <div
                        className={`w-8 h-8 border-3 border-t-transparent rounded-full animate-spin ${
                          currentTheme ? "border-blue-400" : "border-blue-500"
                        }`}
                      />
                    </div>
                  )}

                  {/* Lazy Loaded Image */}
                  <img
                    src="/Abhi.jpg"
                    alt="Abhishek Bhardwaj - Frontend Developer"
                    loading="lazy"
                    onLoad={handleImageLoad}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      imageLoaded
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    } group-hover:scale-110`}
                  />

                  {/* Professional Overlay */}
                  <div
                    className={`absolute inset-0 ${
                      currentTheme
                        ? "bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"
                        : "bg-gradient-to-t from-black/20 via-transparent to-transparent"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>

                {/* Floating Badge */}
                <motion.div
                  className={`absolute -bottom-4 -right-4 px-4 py-2 rounded-full ${
                    currentTheme
                      ? "bg-gray-800/90 border border-gray-700/50 text-blue-400"
                      : "bg-white/90 border border-gray-200/50 text-blue-600"
                  } backdrop-blur-md shadow-lg font-medium text-sm`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}>
                  Frontend Dev
                </motion.div>
              </motion.div>
            </div>
          </AnimatedElement>

          {/* Content Section */}
          <AnimatedElement
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div
              className={`p-8 rounded-2xl ${
                currentTheme
                  ? "bg-gray-800/40 backdrop-blur-sm border border-gray-700/30"
                  : "bg-white/60 backdrop-blur-sm border border-gray-200/30"
              } shadow-xl`}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-2xl lg:text-3xl font-bold mb-6 ${
                  currentTheme ? "text-white" : "text-gray-900"
                }`}>
                BCA Final Year Student &
                <span
                  className={`block mt-1 ${
                    currentTheme ? "text-blue-400" : "text-blue-600"
                  }`}>
                  Self-taught Frontend Developer
                </span>
              </motion.h3>

              <div className="space-y-4 mb-8">
                {[
                  "I'm a final-year BCA student with a strong passion for building beautiful and functional web experiences. What started as curiosity with HTML and CSS soon turned into a deep interest in front-end development.",
                  "I specialize in building modern, responsive interfaces using React.js and Tailwind CSS, focusing on both visual appeal and optimal user experience.",
                  "Always learning new technologies and contributing to the developer community. Let's connect and build something amazing together!",
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className={`leading-relaxed ${
                      currentTheme ? "text-gray-300" : "text-gray-700"
                    }`}>
                    {text}
                  </motion.p>
                ))}
              </div>

              {/* Enhanced Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {infoData.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      currentTheme
                        ? "bg-gray-700/30 border border-gray-600/30 hover:bg-gray-700/50 hover:border-blue-500/50"
                        : "bg-gray-50/50 border border-gray-200/50 hover:bg-white/70 hover:border-blue-400/50"
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setActiveCard(index)}
                    onHoverEnd={() => setActiveCard(null)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}>
                    <div className="relative flex items-start gap-3">
                      <motion.span
                        className="text-xl flex-shrink-0 mt-0.5"
                        animate={{
                          scale: activeCard === index ? 1.1 : 1,
                          rotate: activeCard === index ? 5 : 0,
                        }}
                        transition={{ duration: 0.2 }}>
                        {item.icon}
                      </motion.span>

                      <div className="flex-1">
                        <span
                          className={`font-semibold block mb-1 transition-colors duration-300 ${
                            activeCard === index
                              ? currentTheme
                                ? "text-blue-300"
                                : "text-blue-700"
                              : currentTheme
                              ? "text-blue-400"
                              : "text-blue-600"
                          }`}>
                          {item.label}:
                        </span>
                        <span
                          className={`transition-colors duration-300 ${
                            activeCard === index
                              ? currentTheme
                                ? "text-white"
                                : "text-gray-900"
                              : currentTheme
                              ? "text-gray-300"
                              : "text-gray-700"
                          }`}>
                          {item.value}
                        </span>
                      </div>

                      {/* Subtle Hover Indicator */}
                      <motion.div
                        className={`absolute left-0 top-0 w-1 h-full rounded-r ${
                          currentTheme ? "bg-blue-400" : "bg-blue-500"
                        }`}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: activeCard === index ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default About;
