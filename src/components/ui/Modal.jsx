import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Briefcase } from "lucide-react";
import useThemeStore from "../../Stores/useThemeStore";

// CSS constants (aligned with Timeline.jsx)
const BASE_CLASSES = {
  modal: "fixed inset-0 flex items-center justify-center z-50 bg-black/60",
  modalBox:
    "relative max-w-lg w-full rounded-xl p-5 shadow-2xl backdrop-blur-md",
  darkModal: "bg-gray-800/90 border-gray-700",
  lightModal: "bg-white/90 border-gray-200",
  navBtn:
    "rounded-full p-2 transition-colors duration-150 focus:ring-4 focus:ring-blue-500/50",
  darkNavBtn: "bg-gray-700 hover:bg-blue-600 text-gray-200",
  lightNavBtn: "bg-gray-200 hover:bg-blue-300 text-gray-800",
  heading: "text-lg sm:text-xl font-bold mb-2",
  darkHeading: "text-white",
  lightHeading: "text-gray-900",
  subHeading: "text-blue-500 text-sm mb-2",
  badge: "text-xs font-semibold px-2 py-1 rounded-sm",
  darkBadge: "bg-blue-600 text-white border-blue-500",
  lightBadge: "bg-blue-100 text-blue-600 border-blue-200",
  description: "text-xs leading-relaxed",
  darkDescription: "text-gray-300",
  lightDescription: "text-gray-600",
  achievementHeading: "font-semibold text-sm mb-2",
  darkAchievementHeading: "text-gray-200",
  lightAchievementHeading: "text-gray-700",
};

const Modal = memo(({ item, isOpen, onClose }) => {
  const { isDarkMode = false } = useThemeStore();
  const modalRef = useRef(null);

  // Keyboard trap for accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const trapFocus = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", trapFocus);
    firstElement?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const Icon = item.icon || Briefcase;

  return (
    <motion.div
      className={BASE_CLASSES.modal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        ref={modalRef}
        className={`${BASE_CLASSES.modalBox} ${
          isDarkMode ? BASE_CLASSES.darkModal : BASE_CLASSES.lightModal
        }`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className={`${BASE_CLASSES.navBtn} absolute right-3 top-3 ${
            isDarkMode ? BASE_CLASSES.darkNavBtn : BASE_CLASSES.lightNavBtn
          }`}
          aria-label="Close modal">
          <X size={16} />
        </motion.button>
        <div className="text-center">
          <motion.div
            className="mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
              <Icon size={24} />
            </div>
          </motion.div>
          <h3
            id="modal-title"
            className={`${BASE_CLASSES.heading} ${
              isDarkMode ? BASE_CLASSES.darkHeading : BASE_CLASSES.lightHeading
            }`}>
            {item.title || "Untitled"}
          </h3>
          <h4 className={BASE_CLASSES.subHeading}>
            {item.organization || "Unknown"}
          </h4>
          <div
            className={`${BASE_CLASSES.badge} ${
              isDarkMode ? BASE_CLASSES.darkBadge : BASE_CLASSES.lightBadge
            } mb-4`}>
            {item.period || "N/A"}
          </div>
          <p
            className={`${BASE_CLASSES.description} ${
              isDarkMode
                ? BASE_CLASSES.darkDescription
                : BASE_CLASSES.lightDescription
            }`}>
            {item.description || "No description available"}
          </p>
          {item.achievements?.length > 0 && (
            <div className="mt-4 text-left">
              <h5
                className={`${BASE_CLASSES.achievementHeading} ${
                  isDarkMode
                    ? BASE_CLASSES.darkAchievementHeading
                    : BASE_CLASSES.lightAchievementHeading
                }`}>
                Key Achievements
              </h5>
              <ul className="space-y-1.5">
                {item.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span
                      className={`text-xs ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}>
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

Modal.displayName = "Modal";

export default Modal;
