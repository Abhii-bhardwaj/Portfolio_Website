
import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { User, Send, Mail, FileText, Loader, CheckCircle, AlertCircle } from "lucide-react";
import Button from "./Button";
import useThemeStore from "../../Stores/useThemeStore";

// Constants
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const TO_EMAIL = "abhibhardwaj622@gmail.com";
const MESSAGE_TIMEOUT = 5000;

// CSS constants
const BASE_CLASSES = {
  container: "rounded-xl p-6 shadow-xl",
  darkContainer: "bg-gray-800/80 backdrop-blur-sm border-gray-700",
  lightContainer: "bg-white/80 backdrop-blur-sm border-gray-200",
  label: "block text-xs font-semibold mb-1.5",
  darkLabel: "text-gray-200",
  lightLabel: "text-gray-700",
  input: "w-full pr-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-4 transition-all duration-200",
  darkInput: "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20",
  lightInput: "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20",
  success: "mb-5 p-3 rounded-lg border-l-4 flex items-center",
  darkSuccess: "bg-green-900/30 border-green-400 text-green-300",
  lightSuccess: "bg-green-50 border-green-400 text-green-700",
  error: "mb-5 p-3 rounded-lg border-l-4 flex items-center",
  darkError: "bg-red-900/30 border-red-400 text-red-300",
  lightError: "bg-red-50 border-red-400 text-red-700",
  footer: "mt-5 text-center text-xs border-t pt-5",
  darkFooter: "text-gray-400 border-gray-700",
  lightFooter: "text-gray-600 border-gray-200",
  link: "font-semibold transition-colors duration-200 hover:underline",
  darkLink: "text-blue-400 hover:text-blue-300",
  lightLink: "text-blue-600 hover:text-blue-700",
};

const FormField = memo(
  ({ label, id, type = "text", as = "input", required = false, value, onChange, placeholder = "", icon: Icon }) => {
    const { isDarkMode = false } = useThemeStore();

    return (
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.3 }}
      >
        <label
          htmlFor={id}
          className={`${BASE_CLASSES.label} ${isDarkMode ? BASE_CLASSES.darkLabel : BASE_CLASSES.lightLabel}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {Icon && (
            <Icon
              size={18}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          )}
          {as === "textarea" ? (
            <textarea
              id={id}
              name={id}
              value={value}
              onChange={onChange}
              required={required}
              rows="5"
              placeholder={placeholder}
              className={`${BASE_CLASSES.input} ${isDarkMode ? BASE_CLASSES.darkInput : BASE_CLASSES.lightInput} ${
                Icon ? "pl-11" : "pl-3"
              } resize-none`}
              aria-label={label}
              aria-required={required}
            />
          ) : (
            <input
              type={type}
              id={id}
              name={id}
              value={value}
              onChange={onChange}
              required={required}
              placeholder={placeholder}
              className={`${BASE_CLASSES.input} ${isDarkMode ? BASE_CLASSES.darkInput : BASE_CLASSES.lightInput} ${
                Icon ? "pl-11" : "pl-3"
              }`}
              aria-label={label}
              aria-required={required}
            />
          )}
        </div>
      </motion.div>
    );
  }
);

const ContactForm = memo(() => {
  const { isDarkMode = false } = useThemeStore();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState({ isSubmitting: false, isSubmitted: false, error: null });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message ||
        !validateEmail(formData.email)
      ) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          error: "Please fill in all required fields with a valid email.",
        });
        return;
      }

      setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

      try {
        if (
          !EMAILJS_CONFIG.SERVICE_ID ||
          !EMAILJS_CONFIG.TEMPLATE_ID ||
          !EMAILJS_CONFIG.PUBLIC_KEY
        ) {
          throw new Error("EmailJS configuration is incomplete.");
        }

        const emailjs = (await import("@emailjs/browser")).default;
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: TO_EMAIL,
          reply_to: formData.email,
        };

        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );

        setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => setFormStatus((prev) => ({ ...prev, isSubmitted: false })), MESSAGE_TIMEOUT);
      } catch (error) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          error: "Failed to send message. Try again or contact via email.",
        });
        setTimeout(() => setFormStatus((prev) => ({ ...prev, error: null })), MESSAGE_TIMEOUT);
      }
    },
    [formData]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4 }}
      className={`${BASE_CLASSES.container} ${isDarkMode ? BASE_CLASSES.darkContainer : BASE_CLASSES.lightContainer}`}
    >
      {formStatus.isSubmitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${BASE_CLASSES.success} ${isDarkMode ? BASE_CLASSES.darkSuccess : BASE_CLASSES.lightSuccess}`}
          role="alert"
          aria-describedby="success-message"
        >
          <CheckCircle size={18} className="mr-2 flex-shrink-0" />
          <div id="success-message">
            <p className="font-medium">Message sent successfully!</p>
            <p className="text-xs opacity-80">I'll respond soon.</p>
          </div>
        </motion.div>
      )}
      {formStatus.error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${BASE_CLASSES.error} ${isDarkMode ? BASE_CLASSES.darkError : BASE_CLASSES.lightError}`}
          role="alert"
          aria-describedby="error-message"
        >
          <AlertCircle size={18} className="mr-2 flex-shrink-0" />
          <div id="error-message">
            <p className="font-medium">Error</p>
            <p className="text-xs">{formStatus.error}</p>
          </div>
        </motion.div >
      )}
      <form onSubmit={handleSubmit}>
        <FormField
          label="Name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
          icon={User}
        />
        <FormField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
          icon={Mail}
        />
        <FormField
          label="Subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder="Project Inquiry"
          icon={FileText}
        />
        <FormField
          label="Message"
          id="message"
          as="textarea"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Let's discuss a project..."
          
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            type="submit"
            disabled={formStatus.isSubmitting}
            fullWidth
            icon={formStatus.isSubmitting ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
            className={`text-base py-3 ${formStatus.isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            aria-disabled={formStatus.isSubmitting}
          >
            {formStatus.isSubmitting ? "Sending..." : "Send Email"}
          </Button>
        </motion.div>
      </form>
      <div
        className={`${BASE_CLASSES.footer} ${isDarkMode ? BASE_CLASSES.darkFooter : BASE_CLASSES.lightFooter}`}
      >
        <p>
          Or email{" "}
          <a
            href={`mailto:${TO_EMAIL}`}
            className={`${BASE_CLASSES.link} ${isDarkMode ? BASE_CLASSES.darkLink : BASE_CLASSES.lightLink}`}
          >
            {TO_EMAIL}
          </a>
        </p>
      </div>
    </motion.div>
  );
});

FormField.displayName = "FormField";
ContactForm.displayName = "ContactForm";

export default ContactForm;
