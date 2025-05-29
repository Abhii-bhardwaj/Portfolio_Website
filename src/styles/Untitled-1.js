import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { create } from "zustand";
import {
  Sun,
  Moon,
  Menu,
  X,
  Send,
  Download,
  Github,
  ExternalLink,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";

// Theme Configuration
const themeConfig = {
  light: {
    background: "#ffffff",
    backgroundSecondary: "#f9fafb",
    cardBg: "#ffffff",
    text: "#1f2937",
    textSecondary: "#6b7280",
    primary: "#4f46e5",
    primaryHover: "#4338ca",
    accent: "#e5e7eb",
    accentHover: "#d1d5db",
    border: "#e5e7eb",
  },
  dark: {
    background: "#111827",
    backgroundSecondary: "#1f2937",
    cardBg: "#1f2937",
    text: "#f9fafb",
    textSecondary: "#9ca3af",
    primary: "#818cf8",
    primaryHover: "#6366f1",
    accent: "#374151",
    accentHover: "#4b5563",
    border: "#374151",
  },
};

// Zustand Store
const useStore = create((set) => ({
  darkMode: false,
  mobileMenuOpen: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));

// Smooth Scroll Function
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Main App
export default function PortfolioWebsite() {
  const { darkMode, toggleDarkMode } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    // Apply theme variables
    const theme = darkMode ? themeConfig.dark : themeConfig.light;
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [darkMode]);

  return (
    <div className="min-h-screen font-sans bg-background text-text transition-colors duration-200">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

// Header Component
function Header() {
  const {
    darkMode,
    toggleDarkMode,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  } = useStore();

  const navLinks = [
    { name: "Home", href: "hero" },
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
    { name: "Experience", href: "experience" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm text-text transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold">
          <span className="text-primary"></span>Portfolio
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-text hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1">
              {link.name}
            </button>
          ))}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }>
            <span className="sr-only">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }>
            <span className="sr-only">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label="Toggle mobile menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background-secondary">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-end">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  aria-label="Close mobile menu">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-4 py-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      scrollToSection(link.href);
                      closeMobileMenu();
                    }}
                    className="text-text hover:text-primary transition-colors duration-200 py-2 text-left focus:outline-none focus:ring-2 focus:ring-primary rounded">
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="hero" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 pt-16 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Hi, I'm <span className="text-primary">Abhishek Bhardwaj</span>
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl mb-6 font-medium">
            Frontend Developer & UI/UX Enthusiast
          </h2>
          <p className="text-secondary mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            I craft beautiful and responsive web experiences using modern
            technologies like React.js, Tailwind CSS, and more.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary">
              <Download size={20} className="mr-2" /> Download Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline"
              onClick={() => scrollToSection("contact")}>
              Contact Me
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary">
            <img
              src="/api/placeholder/400/400"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2">
            <img
              src="/api/placeholder/600/400"
              alt="About Me"
              className="rounded-lg shadow-lg w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">
              BCA Final Year Student & Self-taught Frontend Developer
            </h3>
            <p className="text-secondary mb-4 leading-relaxed">
              I'm a final year BCA student with a passion for creating beautiful
              and functional web experiences. My journey in web development
              started with HTML and CSS, and quickly evolved to modern
              frameworks and libraries.
            </p>
            <p className="text-secondary mb-6 leading-relaxed">
              I specialize in React.js development with a focus on creating
              responsive, accessible, and user-friendly interfaces. When I'm not
              coding, I enjoy exploring new technologies, contributing to
              open-source projects, and sharing my knowledge with the community.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <span className="font-bold mr-2">Name:</span>
                <span>Abhishek Bhardwaj</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-2">Email:</span>
                <span>abhibhardwaj622@gmail.com</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-2">Education:</span>
                <span>BCA (Final Year)</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-2">Location:</span>
                <span>Agra, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const skills = [
    { name: "React.js", icon: "⚛️", color: "bg-blue-500" },
    { name: "JavaScript", icon: "𝗝𝗦", color: "bg-yellow-500" },
    { name: "Tailwind CSS", icon: "🎨", color: "bg-cyan-500" },
    { name: "HTML5", icon: "🖥️", color: "bg-orange-500" },
    { name: "CSS3", icon: "🎭", color: "bg-blue-400" },
    { name: "Zustand", icon: "🐻", color: "bg-gray-500" },
    { name: "Git", icon: "📊", color: "bg-red-500" },
    { name: "Responsive Design", icon: "📱", color: "bg-green-500" },
    { name: "REST API", icon: "🔌", color: "bg-indigo-500" },
    { name: "Framer Motion", icon: "✨", color: "bg-pink-500" },
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 text-secondary max-w-2xl mx-auto leading-relaxed">
            Here are the technologies and tools I work with on a daily basis.
            I'm constantly learning and expanding my skillset to stay up-to-date
            with the latest trends.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card p-6 rounded-lg shadow-md text-center">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${skill.color} text-white text-2xl font-bold mb-4`}>
                {skill.icon}
              </div>
              <h3 className="font-medium text-lg">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const projects = [
    {
      title: "Social Media App",
      description:
        "A full-featured social media platform with real-time chat, post sharing, and user profiles.",
      image: "/api/placeholder/600/400",
      tech: ["React.js", "Tailwind CSS", "Firebase", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "News Application",
      description:
        "A responsive news application that fetches real-time news from multiple sources with category filtering.",
      image: "/api/placeholder/600/400",
      tech: ["React.js", "Tailwind CSS", "NewsAPI", "Zustand"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Documentation App",
      description:
        "A collaborative documentation platform with markdown support and real-time editing capabilities.",
      image: "/api/placeholder/600/400",
      tech: ["React.js", "DaisyUI", "Firebase", "Markdown"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "E-commerce Dashboard",
      description:
        "An admin dashboard for e-commerce stores with analytics, inventory management, and order processing.",
      image: "/api/placeholder/600/400",
      tech: ["React.js", "Tailwind CSS", "Chart.js", "Zustand"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 text-secondary max-w-2xl mx-auto leading-relaxed">
            Here are some of my recent projects. Each project was built with a
            focus on user experience, performance, and clean code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-lg overflow-hidden shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-accent text-primary rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-primary-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded">
                    Live Demo <ExternalLink size={16} className="ml-1" />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-primary-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded">
                    GitHub <Github size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const experiences = [
    {
      title: "BCA in Computer Science",
      organization: "XYZ University",
      period: "2021 - Present",
      description:
        "Studying Computer Applications with a focus on software development, data structures, and web technologies.",
    },
    {
      title: "Frontend Developer Intern",
      organization: "ABC Tech Solutions",
      period: "Jun 2023 - Aug 2023",
      description:
        "Developed responsive web applications using React.js and Tailwind CSS. Collaborated with senior developers on client projects.",
    },
    {
      title: "Web Development Bootcamp",
      organization: "Tech Academy",
      period: "Jan 2023 - Mar 2023",
      description:
        "Completed an intensive 12-week bootcamp focusing on modern JavaScript frameworks, responsive design, and web accessibility.",
    },
    {
      title: "Open Source Contributor",
      organization: "Various Projects",
      period: "2022 - Present",
      description:
        "Actively contributing to open-source projects on GitHub, focusing on React.js components and UI libraries.",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Experience & Education
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-accent"></div>

          {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } mb-12`}>
              <div className="ml-12 md:ml-0 md:w-1/2">
                <div
                  className={`${
                    index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                  } bg-card p-6 rounded-lg shadow-md`}>
                  <span className="text-sm text-primary font-semibold block mb-1">
                    {item.period}
                  </span>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <h4 className="text-secondary font-medium mb-3">
                    {item.organization}
                  </h4>
                  <p className="text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Timeline Point */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary border-4 border-background"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
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

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, isSubmitted: false }));
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 text-secondary max-w-2xl mx-auto leading-relaxed">
            Feel free to reach out if you have a project in mind, job
            opportunity, or just want to connect!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2">
            <div className="bg-card p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a
                      href="mailto:abhibhardwaj622@gmail.com"
                      className="text-primary hover:text-primary-hover transition-colors duration-200">
                      abhibhardwaj622@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary mr-4">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">LinkedIn</h4>
                    <a
                      href="https://linkedin.com/in/abhibhardwaj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover transition-colors duration-200">
                      linkedin.com/in/abhibhardwaj
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary mr-4">
                    <Github size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">GitHub</h4>
                    <a
                      href="https://github.com/abhibhardwaj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover transition-colors duration-200">
                      github.com/abhibhardwaj
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary mr-4">
                    <Twitter size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Twitter</h4>
                    <a
                      href="https://twitter.com/abhibhardwaj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover transition-colors duration-200">
                      @abhibhardwaj
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2">
            <div className="bg-card p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1 text-text">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background border-border text-text"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 text-text">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background border-border text-text"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-1 text-text">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background border-border text-text"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1 text-text">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background border-border text-text"></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formStatus.isSubmitting}
                  className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  {formStatus.isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" /> Send Message
                    </>
                  )}
                </motion.button>

                {formStatus.isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}

                {formStatus.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {formStatus.error}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="py-8 bg-background-secondary text-text">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold">
              <span className="text-primary">Dev</span>Portfolio
            </div>
            <p className="text-sm text-secondary mt-1">
              © {new Date().getFullYear()} Abhishek Bhardwaj. All rights
              reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/abhibhardwaj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-accent-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/abhibhardwaj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-accent-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/abhibhardwaj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-accent-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
              <Twitter size={20} />
            </a>
            <a
              href="mailto:abhibhardwaj622@gmail.com"
              className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-accent-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          {/* x */}
          <button
            onClick={() => scrollToSection("hero")}
            className="mt-4 inline-flex items-center text-primary hover:text-primary-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded">
            Back to Top
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

// CSS Styles for buttons and theme
const styles = `
  :root {
    --background: ${themeConfig.light.background};
    --backgroundSecondary: ${themeConfig.light.backgroundSecondary};
    --cardBg: ${themeConfig.light.cardBg};
    --text: ${themeConfig.light.text};
    --textSecondary: ${themeConfig.light.textSecondary};
    --primary: ${themeConfig.light.primary};
    --primaryHover: ${themeConfig.light.primaryHover};
    --accent: ${themeConfig.light.accent};
    --accentHover: ${themeConfig.light.accentHover};
    --border: ${themeConfig.light.border};
  }
  .dark {
    --background: ${themeConfig.dark.background};
    --backgroundSecondary: ${themeConfig.dark.backgroundSecondary};
    --cardBg: ${themeConfig.dark.cardBg};
    --text: ${themeConfig.dark.text};
    --textSecondary: ${themeConfig.dark.textSecondary};
    --primary: ${themeConfig.dark.primary};
    --primaryHover: ${themeConfig.dark.primaryHover};
    --accent: ${themeConfig.dark.accent};
    --accentHover: ${themeConfig.dark.accentHover};
    --border: ${themeConfig.dark.border};
  }
  .bg-background { background-color: var(--background); }
  .bg-background-secondary { background-color: var(--backgroundSecondary); }
  .bg-card { background-color: var(--cardBg); }
  .text-text { color: var(--text); }
  .text-secondary { color: var(--textSecondary); }
  .text-primary { color: var(--primary); }
  .border-border { border-color: var(--border); }
  .border-primary { border-color: var(--primary); }
  .bg-accent { background-color: var(--accent); }
  .hover\\:bg-accent-hover:hover { background-color: var(--accentHover); }
  .hover\\:text-primary-hover:hover { color: var(--primaryHover); }
  .hover\\:bg-primary-hover:hover { background-color: var(--primaryHover); }
  .btn {
    @apply px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary;
  }
  .btn-primary {
    @apply bg-primary text-white hover:bg-primary-hover;
  }
  .btn-outline {
    @apply border-2 border-primary text-primary hover:bg-primary hover:text-white;
  }
`;

// Inject CSS
(() => {
  const styleEl = document.createElement("style");
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
})();
