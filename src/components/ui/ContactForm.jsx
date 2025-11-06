import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { Mail, Loader } from "lucide-react";
import useThemeStore from "../../Stores/useThemeStore";

// Constants
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const TO_EMAIL = "abhibhardwaj622@gmail.com";
const MESSAGE_TIMEOUT = 5000;

const ContactForm = memo(() => {
  const { isDarkMode = false } = useThemeStore();
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
        setTimeout(
          () => setFormStatus((prev) => ({ ...prev, error: null })),
          MESSAGE_TIMEOUT
        );
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

        setTimeout(
          () => setFormStatus((prev) => ({ ...prev, isSubmitted: false })),
          MESSAGE_TIMEOUT
        );
      } catch (error) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          error: "Failed to send message. Try again or contact via email.",
        });
        setTimeout(
          () => setFormStatus((prev) => ({ ...prev, error: null })),
          MESSAGE_TIMEOUT
        );
      }
    },
    [formData]
  );

  const inputBaseClasses = `w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 transition-all duration-300 ${
    isDarkMode
      ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 focus:bg-gray-900/70"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
  }`;

  const labelClasses = `block text-sm font-bold mb-2 ${
    isDarkMode ? "text-gray-300" : "text-gray-700"
  }`;

  return (
    <div className="space-y-5">
      {/* Success Message */}
      {formStatus.isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border-2 flex items-start gap-3 ${
            isDarkMode
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-emerald-50 border-emerald-300 text-emerald-700"
          }`}
          role="alert"
          aria-describedby="success-message">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div id="success-message">
            <p className="font-bold text-sm">Message sent successfully!</p>
            <p className="text-xs opacity-80 mt-1">
              I'll get back to you soon.
            </p>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {formStatus.error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border-2 flex items-start gap-3 ${
            isDarkMode
              ? "bg-red-500/10 border-red-500/30 text-red-300"
              : "bg-red-50 border-red-300 text-red-700"
          }`}
          role="alert"
          aria-describedby="error-message">
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <div id="error-message">
            <p className="font-bold text-sm">Error</p>
            <p className="text-xs opacity-80 mt-1">{formStatus.error}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}>
          <label htmlFor="name" className={labelClasses}>
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className={inputBaseClasses}
            aria-label="Name"
            aria-required="true"
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}>
          <label htmlFor="email" className={labelClasses}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
            className={inputBaseClasses}
            aria-label="Email"
            aria-required="true"
          />
        </motion.div>

        {/* Subject Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}>
          <label htmlFor="subject" className={labelClasses}>
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Project Inquiry"
            className={inputBaseClasses}
            aria-label="Subject"
            aria-required="true"
          />
        </motion.div>

        {/* Message Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}>
          <label htmlFor="message" className={labelClasses}>
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Let's discuss your project..."
            className={`${inputBaseClasses} resize-none`}
            aria-label="Message"
            aria-required="true"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={formStatus.isSubmitting}
          whileHover={{ scale: formStatus.isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: formStatus.isSubmitting ? 1 : 0.98 }}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
            formStatus.isSubmitting
              ? "bg-gray-600 cursor-not-allowed opacity-70"
              : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-2xl hover:shadow-blue-500/50"
          }`}
          aria-disabled={formStatus.isSubmitting}>
          {formStatus.isSubmitting ? (
            <>
              <Loader size={20} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail size={20} />
              Send Message
            </>
          )}
        </motion.button>

        {/* Footer */}
        <div
          className={`text-center text-sm pt-4 border-t ${
            isDarkMode
              ? "border-gray-700 text-gray-400"
              : "border-gray-200 text-gray-600"
          }`}>
          <p>
            Or email directly:{" "}
            <a
              href={`mailto:${TO_EMAIL}`}
              className={`font-semibold transition-colors ${
                isDarkMode
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              }`}>
              {TO_EMAIL}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
