// projects.js - Data for projects section
export const projects = [
  {
    id: 1,
    title: "Social Media App",
    description:
      "Sociofy is a full-stack social media web application built using the MERN stack, TailwindCSS, and DaisyUI. It features user authentication (JWT & Google login), post creation with images, like/comment functionalities, and real-time messaging and notifications. The admin panel includes dynamic user/post/notification management with charts and visual analytics. Responsive design, dark mode support, efficient state management using Zustand, and Redis-based caching ensure smooth performance. The app focuses on a modern, scalable architecture suitable for production-level deployment.",
    image: "/sociofy.png",
    tech: [
      "React.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Zustand",
      "Redis",
      "JWT Auth",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Abhii-bhardwaj/Sociofy",
    featured: true,
  },
  {
    id: 2,
    title: "3D Anniversary Website",
    description:
      "A fully responsive 3D anniversary website crafted using Three.js, React, and TailwindCSS. It features a romantic landing page with a typewriter message and smooth transition to a dynamic 3D scene with rotating camera, interactive 3D heart with message, realistic photo frame, and a 3D photo album. Additional pages include a typewriter-effect diary page, an animated photo album with images/videos and messages, and a celebration page with heart explosion animation followed by a final greeting. Complete with background music, optimized performance for all devices, and a personalized, immersive experience.",
    image: "/anniversary-site.png",
    tech: ["React.js", "Tailwind CSS", "Three.js", "Framer Motion"],
    liveUrl: "https://anniversary-website-rho.vercel.app/",
    githubUrl: "https://github.com/Abhii-bhardwaj/Anniversary-website",
    featured: true,
  },
  {
    id: 3,
    title: "News Application",
    description:
      "A dynamic news aggregator web application developed using React and NewsAPI. It provides real-time news updates across multiple categories such as technology, business, health, and sports. Features include a search bar, category filters, dark mode, and infinite scroll for seamless content discovery. The UI is fast, user-friendly, and built for optimal readability across all devices.",
    image: "/api/placeholder/600/400",
    tech: ["React.js", "Tailwind CSS", "NewsAPI", "Zustand"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },

  {
    id: 4,
    title: "Weather Forecast App",
    description:
      "A responsive weather forecasting web app built using React and OpenWeatherMap API. The app fetches real-time weather data based on user input, providing temperature, humidity, wind speed, and weather conditions for any city. It features a clean, animated UI with dynamic icons, smooth UX, and mobile responsiveness. Built for speed and accuracy with optimized API handling and error states.",
    image: "/weather-app.png",
    tech: ["React.js", "Styled Components", "OpenWeather API"],
    liveUrl: "https://abhii-weather-app.netlify.app/",
    githubUrl: "https://github.com/Abhii-bhardwaj/Weather_App",
    featured: false,
  },
];

export default projects;
