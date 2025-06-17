import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import useTheme from "./hooks/useTheme";

/**
 * Main App component
 * @returns {JSX.Element} The App component
 */
function App() {
  // Initialize theme
  useTheme();

  return (
    <Router>
      {/* <AnimatePresence mode="wait"> */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="app-container">
          <Layout>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </Layout>
        </motion.div>
      {/* </AnimatePresence> */}
    </Router>
  );
}

export default App;
