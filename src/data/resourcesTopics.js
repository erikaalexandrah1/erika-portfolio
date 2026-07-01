// Pilares = categorías para filtrar. El color se usa en badges y acentos.
export const PILLARS = [
  { id: "databases", label: "Databases", color: "#6d8bff" },
  { id: "data", label: "Data Analysis", color: "#c07bff" },
  { id: "backend", label: "Backend", color: "#4fd1a1" },
  { id: "frontend", label: "Frontend", color: "#ffc861" },
];

// Cada TEMA agrupa su video y sus guías PDF (hasta 2).
// Los PDFs apuntan a /public/pdfs/*.pdf — reemplaza las rutas por los archivos reales.
export const TOPICS = [
  {
    id: "neo4j-auradb-cypher",
    title: "Neo4J: AuraDB, Data Modeling, Cypher",
    pillar: "databases",
    video: { url: "https://www.youtube.com/watch?v=3wt--u2FDyk", length: "1:27:11" },
    pdfs: [{ title: "Guía Neo4J & Cypher", url: "/pdfs/neo4j-cypher.pdf" }],
  },
  {
    id: "mongodb-atlas-mongoql",
    title: "MongoDB: Atlas, Data Modeling, MongoQL",
    pillar: "databases",
    video: { url: "https://www.youtube.com/watch?v=r7ruco3PMXo", length: "1:36:02" },
    pdfs: [{ title: "Guía MongoDB", url: "/pdfs/mongodb.pdf" }],
  },
  {
    id: "relational-sql-operators",
    title: "Relational DB - SQL Operators",
    pillar: "databases",
    video: { url: "https://www.youtube.com/watch?v=xLrSY7rYJZs", length: "1:14:22" },
    pdfs: [{ title: "Guía SQL", url: "/pdfs/sql-operators.pdf" }],
  },
  {
    id: "pentaho-pdi-1",
    title: "Pentaho Data Integration - Part 1",
    pillar: "data",
    video: { url: "https://www.youtube.com/watch?v=5adJfQhih0E", length: "1:27:31" },
    pdfs: [{ title: "Guía PDI (Parte 1)", url: "/pdfs/pentaho-pdi-1.pdf" }],
  },
  {
    id: "pentaho-pdi-2",
    title: "Pentaho Data Integration - Part 2",
    pillar: "data",
    video: { url: "https://www.youtube.com/watch?v=eMc6hed00aQ", length: "1:13:14" },
    pdfs: [{ title: "Guía PDI (Parte 2)", url: "/pdfs/pentaho-pdi-2.pdf" }],
  },
  {
    id: "bi-dimensional-modeling",
    title: "Business Intelligence: Dimensional Modeling",
    pillar: "data",
    video: { url: "https://www.youtube.com/watch?v=DamzFRxUcHc", length: "1:25:01" },
    pdfs: [{ title: "Guía Modelado Dimensional", url: "/pdfs/bi-dimensional.pdf" }],
  },
  {
    id: "nestjs-basics",
    title: "NestJS Basics for Beginners",
    pillar: "backend",
    video: { url: "https://www.youtube.com/watch?v=6hew-sMZZSQ", length: "1:24:37" },
    pdfs: [{ title: "Guía NestJS", url: "/pdfs/nestjs-basics.pdf" }],
  },
  {
    id: "nestjs-mongoose-crud",
    title: "NestJS, Mongoose, Basic CRUD, Environment Variables",
    pillar: "backend",
    video: { url: "https://www.youtube.com/watch?v=BrvJr-Hv4G4", length: "1:31:33" },
    pdfs: [{ title: "Guía CRUD con Mongoose", url: "/pdfs/nestjs-mongoose.pdf" }],
  },
  {
    id: "nestjs-swagger",
    title: "Creating API Documentation with Swagger in NestJS",
    pillar: "backend",
    video: { url: "https://www.youtube.com/watch?v=1qBJk0_sLpE", length: "54:22" },
    pdfs: [{ title: "Guía Swagger", url: "/pdfs/nestjs-swagger.pdf" }],
  },
  // TODO: reemplazar los siguientes por tus videos/guías reales de Frontend.
  {
    id: "frontend-placeholder-1",
    title: "Frontend — Tema por definir 1",
    pillar: "frontend",
    video: { url: "", length: "" },
    pdfs: [{ title: "Guía (pendiente)", url: "/pdfs/frontend-1.pdf" }],
  },
  {
    id: "frontend-placeholder-2",
    title: "Frontend — Tema por definir 2",
    pillar: "frontend",
    video: { url: "", length: "" },
    pdfs: [{ title: "Guía (pendiente)", url: "/pdfs/frontend-2.pdf" }],
  },
];
