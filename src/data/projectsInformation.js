export const CATEGORIES = ["All", "Databases", "Data", "Backend", "Frontend", "Fullstack"];

// Acento de marca por categoría (azul / morado / teal) — mismo criterio usado
// en el resto del sitio (ver About.jsx TAG_META).
export const TAG_COLORS = {
  Databases: "91,108,255",
  Data: "0,200,180",
  Backend: "194,91,255",
  Frontend: "91,108,255",
  Fullstack: "194,91,255",
};
export const tagColor = (tag, a = 1) => `rgba(${TAG_COLORS[tag] || "255,255,255"},${a})`;

// TODO: los `image` de p1-p4 son placeholders (arte decorativo, no capturas
// reales de cada sitio). Reemplázalos por screenshots reales del producto en
// /public/images — el componente ya los muestra dentro de un frame de
// navegador (ver ProjectCard.jsx), no requiere cambios de código.
export const PROJECTS = [
  {
    id: "p1",
    title: "Visuart – UNIMET Art Tours",
    blurb: "Web app for booking art tours at Universidad Metropolitana, built with React and Firebase.",
    tag: "Frontend",
    meta: "React • Firebase • Tours Booking",
    href: "https://visuart-17959.web.app/",
    image: "/images/visuart-bg.webp",
  },
  {
    id: "p2",
    title: "ProcessLab PWA – Separation Processes",
    blurb: "Progressive Web App for reserving lab equipment and managing inventories, using React, Next.js, and JWT auth.",
    tag: "Frontend",
    meta: "React • Next.js 13 • Tailwind CSS • Firebase • JWT",
    href: "https://unimetprocesslab.vercel.app",
    image: "/images/processlab-bg.webp",
  },
  {
    id: "p3",
    title: "Metrofy – Music Recommendation System",
    blurb: "PWA using Neo4J to recommend personalized music based on your preferences, built with React and Next.js.",
    tag: "Databases",
    meta: "React • Next.js 14 • Neo4J",
    href: "https://metrofy.vercel.app",
    image: "/images/metrofy-bg.webp",
  },
  {
    id: "p4",
    title: "Buzzflix – Movie Recommendation Platform",
    blurb: "React and Next.js front-end with a NestJS REST API backend, integrated with TMDB and Neo4J AuraDB for recommendations.",
    tag: "Backend",
    meta: "React • Next.js 14 • NestJS • Neo4J AuraDB • TMDB API",
    href: "https://buzzflix.titranx.com/",
    image: "/images/buzzflix-bg.webp",
  },
  {
    id: "p5",
    title: "Powerleds – LED E‑commerce Platform",
    blurb: "E‑commerce site for LED lighting with shopping cart, payment proof uploads, and admin dashboard with stats and CRUD operations.",
    tag: "Fullstack",
    meta: "Next.js • NestJS • MongoDB • DaisyUI",
    href: "https://powerleds.net",
    image: "/images/powerleds.webp",
  },
];