// ContactForm.jsx - Redesigned with theme support
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, FileText } from "lucide-react";
import Button from "./Button";
import Card from "./Card";
import useThemeStore from "../../Stores/useThemeStore";

const FormInput = ({
  label,
  id,
  type = "text",
  required = false,
  value,
  onChange,
  placeholder = "",
  icon: Icon,
}) => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}>
      <label
        htmlFor={id}
        className={`block text-sm font-semibold mb-2 ${
          currentTheme ? "text-gray-200" : "text-gray-700"
        }`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={20}
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              currentTheme ? "text-gray-400" : "text-gray-500"
            }`}
          />
        )}
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full ${
            Icon ? "pl-12" : "pl-4"
          } pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-4 transition-all duration-300 ${
            currentTheme
              ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
        />
      </div>
    </motion.div>
  );
};

const ContactForm = () => {
  const { isDarkMode, darkMode } = useThemeStore();
  const currentTheme = isDarkMode || darkMode;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

    setTimeout(() => {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, isSubmitted: false }));
      }, 5000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`rounded-2xl p-8 shadow-2xl ${
        currentTheme
          ? "bg-gray-800/80 backdrop-blur-sm border border-gray-700"
          : "bg-white/80 backdrop-blur-sm border border-gray-200"
      }`}>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Your Name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
          icon={User}
        />

        <FormInput
          label="Your Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
          icon={Mail}
        />

        <FormInput
          label="Subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder="Project Inquiry / Collaboration"
          icon={FileText}
        />

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}>
          <label
            htmlFor="message"
            className={`block text-sm font-semibold mb-2 ${
              currentTheme ? "text-gray-200" : "text-gray-700"
            }`}>
            Your Message <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MessageSquare
              size={20}
              className={`absolute left-3 top-4 ${
                currentTheme ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Hello! I would like to discuss a project with you. Let me know when would be a good time to connect..."
              className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-4 transition-all duration-300 resize-none ${
                currentTheme
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
              }`}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <Button
            type="submit"
            disabled={formStatus.isSubmitting}
            fullWidth
            icon={formStatus.isSubmitting ? null : <Send size={18} />}
            className="text-lg py-4">
            {formStatus.isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </motion.div>

        {formStatus.isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-lg border-l-4 ${
              currentTheme
                ? "bg-green-900/30 border-green-400 text-green-300"
                : "bg-green-50 border-green-400 text-green-700"
            }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">
                  Thank you! Your message has been sent successfully.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {formStatus.error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-lg border-l-4 ${
              currentTheme
                ? "bg-red-900/30 border-red-400 text-red-300"
                : "bg-red-50 border-red-400 text-red-700"
            }`}>
            {formStatus.error}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;
