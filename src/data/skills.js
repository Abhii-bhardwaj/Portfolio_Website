// data/skills.js
import {
  Code,
  Atom,
  FileCode,
  LayoutTemplate,
  Settings2,
  Github,
  PlugZap,
  Move3D,
  Zap,
  Box,
  Hexagon,
  Triangle,
  Paintbrush,
  Database,
  Wifi,
  Palette,
  Globe,
  Key,
  FileType,
  Grid3X3,
  Wrench,
  Monitor,
  Server,
  Circle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Individual skill groups – keep them for easy maintenance          */
/* ------------------------------------------------------------------ */
export const frontendSkills = [
  { name: "React.js", icon: "Atom", color: "bg-blue-500", level: "Advanced" },
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
  { name: "HTML5", icon: "Code", color: "bg-orange-500", level: "Advanced" },
  {
    name: "CSS3",
    icon: "LayoutTemplate",
    color: "bg-blue-400",
    level: "Advanced",
  },
  {
    name: "Tailwind CSS",
    icon: "Paintbrush",
    color: "bg-cyan-500",
    level: "Advanced",
  },
  {
    name: "DaisyUI",
    icon: "Palette",
    color: "bg-pink-500",
    level: "Intermediate",
  },
  {
    name: "Framer Motion",
    icon: "Move3D",
    color: "bg-pink-600",
    level: "Intermediate",
  },
];

export const backendSkills = [
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
  {
    name: "JWT Authentication",
    icon: "Key",
    color: "bg-orange-600",
    level: "Intermediate",
  },
  {
    name: "WebSockets",
    icon: "Wifi",
    color: "bg-green-700",
    level: "Beginner",
  },
];

export const databaseSkills = [
  {
    name: "MongoDB",
    icon: "Database",
    color: "bg-green-600",
    level: "Intermediate",
  },
];

export const miscSkills = [
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
    name: "Postman",
    icon: "Zap",
    color: "bg-purple-600",
    level: "Intermediate",
  },
  { name: "Vercel", icon: "Globe", color: "bg-black", level: "Intermediate" },
  {
    name: "Three.js",
    icon: "Box",
    color: "bg-slate-700",
    level: "Intermediate",
  },
];

/* ------------------------------------------------------------------ */
/*  Combined exports – what the component actually consumes           */
/* ------------------------------------------------------------------ */
export const allSkills = [
  ...frontendSkills,
  ...backendSkills,
  ...databaseSkills,
  ...miscSkills,
];

export const skillCategories = [
  {
    category: "Frontend",
    skills: frontendSkills,
    icon: "Monitor",
    color: "bg-blue-600",
  },
  {
    category: "Backend",
    skills: backendSkills,
    icon: "Server",
    color: "bg-green-600",
  },
  {
    category: "Database",
    skills: databaseSkills,
    icon: "Database",
    color: "bg-emerald-600",
  },
  {
    category: "Miscellaneous",
    skills: miscSkills,
    icon: "Wrench",
    color: "bg-gray-700",
  },
];

/* ------------------------------------------------------------------ */
/*  Default export – a flat list (kept for backward compatibility)   */
/* ------------------------------------------------------------------ */
export default allSkills;
