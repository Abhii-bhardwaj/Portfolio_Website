// Frontend Technologies
export const frontendSkills = [
  {
    name: "React.js",
    icon: "Atom",
    color: "bg-blue-500",
    level: "Advanced",
  },
  {
    name: "Next.js",
    icon: "Triangle",
    color: "bg-blue-500",
    level: "Intermediate",
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
    level: "Intermediate",
  },
  {
    name: "HTML5",
    icon: "Code",
    color: "bg-orange-500",
    level: "Advanced",
  },
  {
    name: "CSS3",
    icon: "LayoutTemplate",
    color: "bg-blue-400",
    level: "Advanced",
  },
];

// Styling & UI Libraries
export const stylingSkills = [
  {
    name: "Tailwind CSS",
    icon: "Paintbrush",
    color: "bg-cyan-500",
    level: "Advanced",
  },
  {
    name: "Shadcn/ui",
    icon: "Palette",
    color: "bg-gray-700",
    level: "Intermediate",
  },
  {
    name: "Framer Motion",
    icon: "Move3D",
    color: "bg-pink-500",
    level: "Intermediate",
  },
  {
    name: "Responsive Design",
    icon: "Smartphone",
    color: "bg-green-500",
    level: "Advanced",
  },
];

// Backend & Database
export const backendSkills = [
  {
    name: "Node.js & Express",
    icon: "Hexagon",
    color: "bg-lime-600",
    level: "Intermediate",
  },
  {
    name: "MongoDB",
    icon: "Database",
    color: "bg-green-600",
    level: "Intermediate",
  },
  {
    name: "REST APIs",
    icon: "PlugZap",
    color: "bg-indigo-600",
    level: "Intermediate",
  },
  {
    name: "WebSockets",
    icon: "Wifi",
    color: "bg-green-700",
    level: "Beginner",
  },
  {
    name: "JWT",
    icon: "Key",
    color: "bg-orange-600",
    level: "Intermediate",
  },
];

// State Management & Tools
export const toolsSkills = [
  {
    name: "Zustand",
    icon: "Settings2",
    color: "bg-gray-600",
    level: "Intermediate",
  },
  {
    name: "Git & GitHub",
    icon: "Github",
    color: "bg-red-500",
    level: "Advanced",
  },
  {
    name: "Thunder Client",
    icon: "Zap",
    color: "bg-purple-600",
    level: "Advanced",
  },
  {
    name: "Postman",
    icon: "Zap",
    color: "bg-purple-600",
    level: "Intermediate",
  },
];

// DevOps & Deployment
export const devopsSkills = [
  {
    name: "Vercel",
    icon: "Globe",
    color: "bg-black",
    level: "Intermediate",
  },
  {
    name: "Docker",
    icon: "Container",
    color: "bg-blue-700",
    level: "Beginner",
  },
];

// Testing & Quality Assurance
export const testingSkills = [
  {
    name: "Jest",
    icon: "TestTube",
    color: "bg-red-600",
    level: "Beginner",
  },
  {
    name: "ESLint",
    icon: "CheckCircle",
    color: "bg-blue-500",
    level: "Intermediate",
  },
];

// Graphics & Multimedia
export const graphicsSkills = [
  {
    name: "Three.js",
    icon: "Box",
    color: "bg-slate-700",
    level: "Intermediate",
  },
  {
    name: "Image Optimization",
    icon: "ImagePlus",
    color: "bg-amber-600",
    level: "Intermediate",
  },
];

// Combined skills array (if you want to keep the original structure)
export const skills = [
  ...frontendSkills,
  ...stylingSkills,
  ...backendSkills,
  ...toolsSkills,
  ...devopsSkills,
  ...testingSkills,
  ...graphicsSkills,
];

// Skills with categories for advanced display
export const skillCategories = [
  {
    category: "Frontend Development",
    skills: frontendSkills,
    icon: "Monitor",
    color: "bg-blue-600",
  },
  {
    category: "Styling & UI",
    skills: stylingSkills,
    icon: "Paintbrush2",
    color: "bg-pink-600",
  },
  {
    category: "Backend & APIs",
    skills: backendSkills,
    icon: "Server",
    color: "bg-green-600",
  },
  {
    category: "Development Tools",
    skills: toolsSkills,
    icon: "Wrench",
    color: "bg-purple-600",
  },
  {
    category: "DevOps & Deployment",
    skills: devopsSkills,
    icon: "Cloud",
    color: "bg-gray-600",
  },
  {
    category: "Testing & Quality",
    skills: testingSkills,
    icon: "Bug",
    color: "bg-red-600",
  },
  {
    category: "Graphics & Media",
    skills: graphicsSkills,
    icon: "Image",
    color: "bg-amber-600",
  },
];

export default skills;
