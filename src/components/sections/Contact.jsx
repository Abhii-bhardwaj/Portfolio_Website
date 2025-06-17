import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import SectionHeading from "../shared/SectionHeading";
import ContactForm from "../ui/ContactForm";
import useThemeStore from "../../Stores/useThemeStore";

// CSS constants
const BASE_CLASSES = {
  section: "py-20 transition-all duration-200",
  darkSection: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
  lightSection: "bg-gradient-to-br from-blue-50 via-white to-purple-50",
  card: "p-6 sm:p-8 rounded-lg h-full transition-all duration-200 shadow-lg",
  darkCard: "bg-gray-800 border-gray-700 shadow-2xl shadow-blue-500/10",
  lightCard: "bg-white border-gray-200 shadow-xl shadow-blue-500/10",
  cta: "p-6 sm:p-8 rounded-lg text-center transition-all duration-200",
  darkCta:
    "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30",
  lightCta: "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200",
  button:
    "inline-flex items-center px-6 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50",
  darkButton:
    "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25",
  lightButton:
    "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25",
  icon: "w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-all duration-200",
  darkIcon:
    "bg-blue-600 text-white group-hover:bg-blue-500 shadow-lg shadow-blue-500/25",
  lightIcon:
    "bg-blue-500 text-white group-hover:bg-blue-600 shadow-lg shadow-blue-500/25",
};

const Contact = () => {
  const { isDarkMode = false } = useThemeStore();
  const currentTheme = useMemo(() => isDarkMode, [isDarkMode]);

  // Memoized contact info
  const contactInfo = useMemo(
    () => [
      {
        icon: Mail,
        label: "Email",
        value: "abhibhardwaj622@gmail.com",
        href: "mailto:abhibhardwaj622@gmail.com",
        color: currentTheme ? "hover:text-green-400" : "hover:text-green-600",
        ariaLabel: "Send email to Abhishek Bhardwaj",
      },
      {
        icon: Linkedin,
        label: "LinkedIn",
        value: "linkedin.com/in/abhishekbhardwaj",
        href: "https://www.linkedin.com/in/abhishek-bhardwaj-31513b279",
        color: currentTheme ? "hover:text-blue-400" : "hover:text-blue-600",
        ariaLabel: "Visit Abhishek Bhardwaj's LinkedIn profile",
      },
      {
        icon: Github,
        label: "GitHub",
        value: "github.com/abhiibhardwaj",
        href: "https://github.com/Abhii-bhardwaj",
        color: currentTheme ? "hover:text-gray-300" : "hover:text-gray-700",
        ariaLabel: "Visit Abhishek Bhardwaj's GitHub profile",
      },
      {
        icon: Twitter,
        label: "Twitter",
        value: "@M_AbhiBhardwaj",
        href: "https://x.com/M_AbhiBhardwaj",
        color: currentTheme ? "hover:text-cyan-400" : "hover:text-cyan-600",
        ariaLabel: "Visit Abhishek Bhardwaj's Twitter profile",
      },
    ],
    [currentTheme]
  );

  return (
    <section
      id="contact"
      className={`${BASE_CLASSES.section} ${
        currentTheme ? BASE_CLASSES.darkSection : BASE_CLASSES.lightSection
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Get In Touch"
          description="Reach out for project ideas, job opportunities, or just to connect!"
        />
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6 }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`${BASE_CLASSES.card} ${
                currentTheme ? BASE_CLASSES.darkCard : BASE_CLASSES.lightCard
              }`}>
              <h3
                className={`text-xl font-bold mb-4 ${
                  currentTheme ? "text-white" : "text-gray-900"
                }`}>
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`${BASE_CLASSES.icon} ${
                        currentTheme
                          ? BASE_CLASSES.darkIcon
                          : BASE_CLASSES.lightIcon
                      }`}>
                      <contact.icon size={18} />
                    </motion.div>
                    <div>
                      <h4
                        className={`text-sm font-semibold ${
                          currentTheme ? "text-gray-200" : "text-gray-800"
                        }`}>
                        {contact.label}
                      </h4>
                      <a
                        href={contact.href}
                        target={
                          contact.href.startsWith("mailto:")
                            ? undefined
                            : "_blank"
                        }
                        rel={
                          contact.href.startsWith("mailto:")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className={`text-sm ${
                          currentTheme
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        } ${
                          contact.color
                        } focus:outline-none focus:ring-4 focus:ring-blue-500/50 rounded px-1`}
                        aria-label={contact.ariaLabel}>
                        {contact.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6 }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`${BASE_CLASSES.card} ${
                currentTheme ? BASE_CLASSES.darkCard : BASE_CLASSES.lightCard
              }`}>
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12">
          <div
            className={`${BASE_CLASSES.cta} ${
              currentTheme ? BASE_CLASSES.darkCta : BASE_CLASSES.lightCta
            }`}>
            <h3
              className={`text-xl font-bold mb-3 ${
                currentTheme ? "text-white" : "text-gray-900"
              }`}>
              Let's Build Something Amazing Together
            </h3>
            <p
              className={`text-base mb-4 ${
                currentTheme ? "text-gray-300" : "text-gray-600"
              }`}>
              I'm open to new opportunities and exciting projects.
            </p>
            <motion.a
              href="mailto:abhibhardwaj622@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${BASE_CLASSES.button} ${
                currentTheme
                  ? BASE_CLASSES.darkButton
                  : BASE_CLASSES.lightButton
              }`}
              aria-label="Send email to start a conversation">
              <Mail size={18} className="mr-1" />
              Start a Conversation
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Contact);
