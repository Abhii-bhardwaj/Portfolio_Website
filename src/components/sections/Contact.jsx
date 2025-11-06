import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo, useState } from "react";

// Mock components - replace with your actual imports
const SectionHeading = ({ title, description }) => (
  <div className="text-center mb-16">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-lg text-gray-400">
      {description}
    </motion.p>
  </div>
);

const ContactForm = () => (
  <div className="space-y-4">
    <input
      type="text"
      placeholder="Your Name"
      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:outline-none transition-all"
    />
    <input
      type="email"
      placeholder="Your Email"
      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:outline-none transition-all"
    />
    <textarea
      placeholder="Your Message"
      rows="4"
      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:outline-none transition-all resize-none"
    />
    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
      Send Message
    </button>
  </div>
);

const useThemeStore = () => ({ isDarkMode: true });

const Contact = () => {
  const { isDarkMode = false } = useThemeStore();
  const currentTheme = useMemo(() => isDarkMode, [isDarkMode]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const contactInfo = useMemo(
    () => [
      {
        icon: Mail,
        label: "Email",
        value: "abhibhardwaj622@gmail.com",
        href: "mailto:abhibhardwaj622@gmail.com",
        gradient: "from-emerald-500 to-teal-500",
        glowColor: "shadow-emerald-500/50",
        ariaLabel: "Send email to Abhishek Bhardwaj",
      },
      {
        icon: Linkedin,
        label: "LinkedIn",
        value: "linkedin.com/in/abhishekbhardwaj",
        href: "https://www.linkedin.com/in/abhishek-bhardwaj-31513b279",
        gradient: "from-blue-500 to-cyan-500",
        glowColor: "shadow-blue-500/50",
        ariaLabel: "Visit Abhishek Bhardwaj's LinkedIn profile",
      },
      {
        icon: Github,
        label: "GitHub",
        value: "github.com/abhiibhardwaj",
        href: "https://github.com/Abhii-bhardwaj",
        gradient: "from-purple-500 to-pink-500",
        glowColor: "shadow-purple-500/50",
        ariaLabel: "Visit Abhishek Bhardwaj's GitHub profile",
      },
      {
        icon: Twitter,
        label: "Twitter",
        value: "@M_AbhiBhardwaj",
        href: "https://x.com/M_AbhiBhardwaj",
        gradient: "from-sky-500 to-blue-500",
        glowColor: "shadow-sky-500/50",
        ariaLabel: "Visit Abhishek Bhardwaj's Twitter profile",
      },
    ],
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="contact"
      className={`relative py-20 overflow-hidden ${
        currentTheme
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-600 to-blue-600 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          title="Get In Touch"
          description="Reach out for project ideas, job opportunities, or just to connect!"
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Contact Cards - Asymmetric Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {contactInfo.map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={
                  contact.href.startsWith("mailto:") ? undefined : "_blank"
                }
                rel={
                  contact.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                className={`group relative p-6 rounded-2xl backdrop-blur-xl transition-all duration-500 ${
                  currentTheme
                    ? "bg-gray-800/40 border border-gray-700/50"
                    : "bg-white/60 border border-gray-200/50"
                } ${
                  index === hoveredIndex
                    ? `shadow-2xl ${contact.glowColor}`
                    : "shadow-lg"
                }`}
                aria-label={contact.ariaLabel}>
                {/* Animated gradient border */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${contact.gradient} blur-xl -z-10`}
                  animate={
                    hoveredIndex === index
                      ? {
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Icon with gradient background */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center mb-4 shadow-lg ${contact.glowColor}`}>
                  <contact.icon size={24} className="text-white" />
                </motion.div>

                <h4
                  className={`text-sm font-bold mb-1 uppercase tracking-wider ${
                    currentTheme ? "text-gray-400" : "text-gray-600"
                  }`}>
                  {contact.label}
                </h4>
                <p
                  className={`text-base font-medium mb-3 ${
                    currentTheme ? "text-white" : "text-gray-900"
                  }`}>
                  {contact.value}
                </p>

                {/* Arrow indicator */}
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  animate={
                    hoveredIndex === index
                      ? { x: 5, opacity: 1 }
                      : { x: 0, opacity: 0 }
                  }
                  className="absolute bottom-6 right-6">
                  <ArrowUpRight
                    size={20}
                    className={currentTheme ? "text-blue-400" : "text-blue-600"}
                  />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form - Larger card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:row-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative p-8 rounded-2xl h-full backdrop-blur-xl ${
                currentTheme
                  ? "bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50"
                  : "bg-white/70 border border-gray-200/50"
              } shadow-2xl`}>
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-bl-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/20 to-blue-500/20 rounded-tr-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  {/* <Sparkles className="text-yellow-500" size={24} /> */}
                  <h3
                    className={`text-2xl font-bold ${
                      currentTheme ? "text-white" : "text-gray-900"
                    }`}>
                    Send a Message
                  </h3>
                </div>
                <ContactForm />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`relative overflow-hidden p-8 sm:p-12 rounded-3xl backdrop-blur-xl ${
              currentTheme
                ? "bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30"
                : "bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border border-blue-300"
            } shadow-2xl`}>
            {/* Animated mesh gradient */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 bg-[length:200%_200%]"
            />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-3xl md:text-4xl font-bold mb-4 ${
                  currentTheme ? "text-white" : "text-gray-900"
                }`}>
                Let's Build Something{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Extraordinary
                </span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`text-lg mb-6 ${
                  currentTheme ? "text-gray-300" : "text-gray-600"
                }`}>
                I'm always excited about new opportunities and innovative
                projects. Let's create something amazing together!
              </motion.p>
              <motion.a
                href="mailto:abhibhardwaj622@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-white shadow-xl shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/60 transition-all duration-300"
                aria-label="Send email to start a conversation">
                <Mail size={20} />
                Start a Conversation
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}>
                  <ArrowUpRight size={20} />
                </motion.div>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Contact);
