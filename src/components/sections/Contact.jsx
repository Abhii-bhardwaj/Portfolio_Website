// src/components/sections/Contact.jsx
import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import AnimatedElement from "../shared/AnimatedElement";
import ContactForm from "../ui/ContactForm";
import useThemeStore from "../../Stores/useThemeStore";

const Contact = () => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abhibhardwaj622@gmail.com",
      href: "mailto:abhibhardwaj622@gmail.com",
      color: currentTheme ? "hover:text-green-400" : "hover:text-green-600",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/abhishekbhardwaj",
      href: "https://www.linkedin.com/in/abhishek-bhardwaj-31513b279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
      color: currentTheme ? "hover:text-blue-400" : "hover:text-blue-600",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/abhiibhardwaj",
      href: "https://github.com/Abhii-bhardwaj/",
      color: currentTheme ? "hover:text-gray-300" : "hover:text-gray-700",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@M_AbhiBhardwaj",
      href: "https://x.com/M_AbhiBhardwaj?t=BkxfIjEz_MW6P7eiImD1Cw&s=09",
      color: currentTheme ? "hover:text-cyan-400" : "hover:text-cyan-600",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-20 transition-colors duration-300 ${
        currentTheme
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Get In Touch"
          description="Feel free to reach out if you have a project in mind, job opportunity, or just want to connect!"
        />

        <div className="flex flex-col md:flex-row gap-8">
          <AnimatedElement
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`p-8 rounded-lg h-full transition-all duration-300 shadow-lg ${
                currentTheme
                  ? "bg-gray-800 border border-gray-700 shadow-2xl shadow-blue-500/10"
                  : "bg-white border border-gray-200 shadow-xl shadow-blue-500/10"
              }`}>
              <h3
                className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                  currentTheme ? "text-white" : "text-gray-900"
                }`}>
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center group">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${
                        currentTheme
                          ? "bg-blue-600 text-white group-hover:bg-blue-500 shadow-lg shadow-blue-500/25"
                          : "bg-blue-500 text-white group-hover:bg-blue-600 shadow-lg shadow-blue-500/25"
                      }`}>
                      <contact.icon size={20} />
                    </motion.div>

                    <div>
                      <h4
                        className={`font-semibold transition-colors duration-300 ${
                          currentTheme ? "text-gray-200" : "text-gray-800"
                        }`}>
                        {contact.label}
                      </h4>
                      <motion.a
                        href={contact.href}
                        target={
                          contact.href.startsWith("mailto:")
                            ? "_self"
                            : "_blank"
                        }
                        rel={
                          contact.href.startsWith("mailto:")
                            ? ""
                            : "noopener noreferrer"
                        }
                        whileHover={{ scale: 1.05 }}
                        className={`transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 rounded px-1 ${
                          currentTheme
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        } ${contact.color}`}>
                        {contact.value}
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Elements */}
              {/* <div className="mt-8 relative">
                <div
                  className={`absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 ${
                    currentTheme ? "bg-blue-500" : "bg-blue-400"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-16 h-16 rounded-full opacity-10 ${
                    currentTheme ? "bg-purple-500" : "bg-purple-400"
                  }`}
                />
              </div> */}
            </motion.div>
          </AnimatedElement>

          <AnimatedElement
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`p-8 rounded-lg h-full transition-all duration-300 shadow-lg ${
                currentTheme
                  ? "bg-gray-800 border border-gray-700 shadow-2xl shadow-blue-500/10"
                  : "bg-white border border-gray-200 shadow-xl shadow-blue-500/10"
              }`}>
              <ContactForm />
            </motion.div>
          </AnimatedElement>
        </div>

        {/* Additional CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16">
          <div
            className={`p-8 rounded-lg transition-all duration-300 ${
              currentTheme
                ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30"
                : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
            }`}>
            <h3
              className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                currentTheme ? "text-white" : "text-gray-900"
              }`}>
              Let's Build Something Amazing Together
            </h3>
            <p
              className={`text-lg mb-6 transition-colors duration-300 ${
                currentTheme ? "text-gray-300" : "text-gray-600"
              }`}>
              I'm always interested in new opportunities and exciting projects.
            </p>
            <motion.a
              href="mailto:abhibhardwaj622@gmail.com"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform focus:outline-none focus:ring-4 ${
                currentTheme
                  ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500/50 shadow-lg shadow-blue-500/25"
                  : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500/50 shadow-lg shadow-blue-500/25"
              }`}>
              <Mail size={20} className="mr-2" />
              Start a Conversation
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
