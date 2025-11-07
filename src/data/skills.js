export const technicalSkills = [
  // Frontend Core
  { name: "React.js", icon: "Atom", color: "bg-blue-500", level: "Advanced" },
  {
    name: "Next.js",
    icon: "Triangle",
    color: "bg-blue-500",
    level: "Basic",
  },
  {
    name: "JavaScript (ES6+)",
    icon: "FileCode",
    color: "bg-yellow-400",
    level: "Advanced",
  },
  {
    name: "TypeScript",
    icon: "FileType",
    color: "bg-blue-700",
    level: "Basic",
  },

  // Styling
  {
    name: "Tailwind CSS",
    icon: "Paintbrush",
    color: "bg-cyan-500",
    level: "Advanced",
  },
  {
    name: "Framer Motion",
    icon: "Move3D",
    color: "bg-pink-600",
    level: "Intermediate",
  },

  // Backend
  {
    name: "Node.js",
    icon: "Hexagon",
    color: "bg-green-600",
    level: "Intermediate",
  },
  {
    name: "Express.js",
    icon: "Server",
    color: "bg-green-500",
    level: "Intermediate",
  },
  {
    name: "REST APIs",
    icon: "PlugZap",
    color: "bg-indigo-600",
    level: "Intermediate",
  },

  // Database
  {
    name: "MongoDB",
    icon: "Database",
    color: "bg-green-600",
    level: "Intermediate",
  },

  // Tools & Others
  {
    name: "Git & GitHub",
    icon: "Github",
    color: "bg-red-500",
    level: "Advanced",
  },
  {
    name: "Zustand",
    icon: "Settings2",
    color: "bg-gray-600",
    level: "Intermediate",
  },
  {
    name: "Three.js",
    icon: "Box",
    color: "bg-slate-700",
    level: "Intermediate",
  },
];

/* ------------------------------------------------------------------ */
/*  Soft Skills - New addition                                        */
/* ------------------------------------------------------------------ */
export const softSkills = [
  {
    name: "Problem Solving",
    icon: "Lightbulb",
    color: "bg-yellow-500",
    level: "",
  },
  {
    name: "Communication",
    icon: "MessageSquare",
    color: "bg-blue-600",
    level: "",
  },
  {
    name: "Team Collaboration",
    icon: "Users",
    color: "bg-purple-600",
    level: "",
  },
  {
    name: "Time Management",
    icon: "Clock",
    color: "bg-orange-500",
    level: "",
  },

  {
    name: "Self-Learning",
    icon: "BookOpen",
    color: "bg-cyan-600",
    level: "",
  },
];

/* ------------------------------------------------------------------ */
/*  Combined exports - Two main categories                            */
/* ------------------------------------------------------------------ */
export const allSkills = [...technicalSkills, ...softSkills];

export const skillCategories = [
  {
    category: "Technical",
    skills: technicalSkills,
    icon: "Monitor",
    color: "bg-blue-600",
  },
  {
    category: "Soft Skills",
    skills: softSkills,
    icon: "Heart",
    color: "bg-pink-600",
  },
];

/* ------------------------------------------------------------------ */
/*  Default export                                                    */
/* ------------------------------------------------------------------ */
export default allSkills;
