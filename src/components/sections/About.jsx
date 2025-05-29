// src/components/sections/About.jsx
import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import AnimatedElement from "../shared/AnimatedElement";
import useThemeStore from "../../Stores/useThemeStore";

const About = () => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

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

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <AnimatedElement
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
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
                  alt="About Me"
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

          <AnimatedElement
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div
              className={`p-8 rounded-2xl ${
                currentTheme
                  ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl"
                  : "bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-2xl"
              }`}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-2xl lg:text-3xl font-bold mb-6 ${
                  currentTheme ? "text-white" : "text-gray-900"
                }`}>
                BCA Final Year Student &
                <span
                  className={`block ${
                    currentTheme ? "text-blue-400" : "text-blue-600"
                  }`}>
                  Self-taught Frontend Developer
                </span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`mb-4 leading-relaxed text-lg ${
                  currentTheme ? "text-gray-300" : "text-gray-700"
                }`}>
                I'm a final-year BCA student with a strong passion for building
                beautiful and functional web experiences. What started as
                curiosity with HTML and CSS soon turned into a deep interest in
                front-end development.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`mb-8 leading-relaxed text-lg ${
                  currentTheme ? "text-gray-300" : "text-gray-700"
                }`}>
                Over time, I've specialized in building modern, responsive, and
                accessible user interfaces using React.js, Tailwind CSS, and
                component libraries like DaisyUI. My focus is not just on
                creating visually appealing designs, but also ensuring great
                user experience and performance.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`mb-8 leading-relaxed text-lg ${
                  currentTheme ? "text-gray-300" : "text-gray-700"
                }`}>
                I'm constantly exploring new technologies, improving my skills,
                and staying up-to-date with industry trends. Outside of coding,
                I love contributing to open-source projects, learning from the
                community, and sharing what I know with fellow developers.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`mb-8 leading-relaxed text-lg ${
                  currentTheme ? "text-gray-300" : "text-gray-700"
                }`}>
                If you're looking for someone who's both creative and
                technically sharp — and always eager to learn — let's connect!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Name", value: "Abhishek Bhardwaj" },
                  { label: "Email", value: "abhibhardwaj622@gmail.com" },
                  { label: "Education", value: "BCA (Final Year)" },
                  { label: "Location", value: "Agra, India" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className={`p-4 rounded-lg ${
                      currentTheme
                        ? "bg-gray-700/50 border border-gray-600/50"
                        : "bg-gray-50/80 border border-gray-200/50"
                    }`}>
                    <span
                      className={`font-bold block mb-1 ${
                        currentTheme ? "text-blue-400" : "text-blue-600"
                      }`}>
                      {item.label}:
                    </span>
                    <span
                      className={
                        currentTheme ? "text-gray-300" : "text-gray-700"
                      }>
                      {item.value}
                    </span>
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
