import {Github, Linkedin, Twitter, Mail} from "lucide-react";

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Abhii-bhardwaj/",
    icon: Github,
    hoverColor: (isDarkMode) =>
      isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abhishek-bhardwaj-31513b279",
    icon: Linkedin,
    hoverColor: (isDarkMode) =>
      isDarkMode ? "hover:bg-blue-900/50" : "hover:bg-blue-100",
  },
  {
    name: "Twitter",
    url: "https://x.com/M_AbhiBhardwaj",
    icon: Twitter,
    hoverColor: (isDarkMode) =>
      isDarkMode ? "hover:bg-sky-900/50" : "hover:bg-sky-100",
  },
  {
    name: "Email",
    url: "mailto:abhibhardwaj622@gmail.com",
    icon: Mail,
    hoverColor: (isDarkMode) =>
      isDarkMode ? "hover:bg-green-900/50" : "hover:bg-green-100",
  },
];
