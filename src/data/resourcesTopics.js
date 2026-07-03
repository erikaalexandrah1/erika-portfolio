// Pilares = categorías para filtrar.
// Mantengo 4 categorías amplias para que la página no se sienta vacía ni demasiado académica.
export const PILLARS = [
  {
    id: "relational-db",
    label: "Relational Databases",
    color: "#6d8bff",
  },
  {
    id: "db-systems",
    label: "Database Systems",
    color: "#8f76d6",
  },
  {
    id: "nosql-distributed",
    label: "NoSQL & Distributed",
    color: "#4fd1a1",
  },
  {
    id: "backend-data-apps",
    label: "Backend & Data Apps",
    color: "#ffc861",
  },
];

// PDFs: los dejo vacíos para que tú los llenes luego.
// length: lo dejo vacío cuando no pude confirmarlo con seguridad.
// title: lo mejoré para que se vea más atractivo en tu página, sin perder el tema real del video.

export const TOPICS = [
  {
    id: "database-fundamentals-smbd-design-architecture",
    title: "Bases de Datos desde Cero: SMBD, Diseño y Arquitectura",
    pillar: "relational-db",
    video: {
      url: "https://www.youtube.com/watch?v=c496hSrltNk",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "conceptual-design-extended-er-model",
    title: "Diseño Conceptual de Bases de Datos: Modelo Entidad-Relación Extendido",
    pillar: "relational-db",
    video: {
      url: "https://www.youtube.com/watch?v=tkpjVRwdbhk",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "sql-practical-exercises",
    title: "SQL en Práctica: Consultas, Filtros y Ejercicios Guiados",
    pillar: "relational-db",
    video: {
      url: "https://www.youtube.com/watch?v=3WcMubDJoIU",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "relational-algebra-exercises",
    title: "Álgebra Relacional sin Miedo: Joins, Producto Cartesiano y División",
    pillar: "relational-db",
    video: {
      url: "https://www.youtube.com/watch?v=zINSeqtfG0A",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "normalization-1nf-2nf-3nf",
    title: "Normalización de Bases de Datos: 1FN, 2FN y 3FN Explicadas Fácil",
    pillar: "relational-db",
    video: {
      url: "https://www.youtube.com/watch?v=pGN6YAvwd0c",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "transactions-recovery-commit-rollback",
    title: "Transacciones y Recuperación: Commit, Rollback y Consistencia",
    pillar: "relational-db",
    video: {
      url: "https://www.youtube.com/watch?v=n6CB2irBtbU",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "concurrency-control-locking-protocols",
    title: "Control de Concurrencia: Bloqueos, Protocolos y Manejo de Conflictos",
    pillar: "relational-db",
    video: {
      url: "https://www.youtube.com/watch?v=cY8-3-DunbA",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "postgresql-installation-docker-pgadmin",
    title: "Instala PostgreSQL como Pro: Local, Docker, SQL y pgAdmin",
    pillar: "db-systems",
    video: {
      url: "https://www.youtube.com/watch?v=wFqWqQ1MDMI",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "file-organization-heap-sequential-hash",
    title: "Organización de Archivos: Montículo, Secuencial y Hash",
    pillar: "db-systems",
    video: {
      url: "https://www.youtube.com/watch?v=qszrU_oPtnw",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "postgresql-file-organization-scans-explain",
    title: "PostgreSQL por Dentro: Archivos, Scans y EXPLAIN",
    pillar: "db-systems",
    video: {
      url: "https://www.youtube.com/watch?v=kP5luW7AV94",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "indexes-primary-clustered-secondary",
    title: "Índices en Bases de Datos: Primarios, Agrupados y Secundarios",
    pillar: "db-systems",
    video: {
      url: "https://www.youtube.com/watch?v=kf5pluNGVQQ",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "postgresql-btree-hash-indexes",
    title: "Crea Índices en PostgreSQL: B-Tree, Hash y Diseño Inteligente",
    pillar: "db-systems",
    video: {
      url: "https://www.youtube.com/watch?v=PoeCNc4ED2E",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "query-processing-heuristic-optimization",
    title: "Procesamiento de Consultas: Optimización Heurística Paso a Paso",
    pillar: "db-systems",
    video: {
      url: "https://www.youtube.com/watch?v=IY04SR5zEPU",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "query-processing-heuristic-optimization-part-2",
    title: "Optimización de Consultas Parte 2: Cómo Piensa el Motor de Base de Datos",
    pillar: "db-systems",
    video: {
      url: "https://www.youtube.com/watch?v=p4GO1vuhUfg",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "physical-execution-trees-nested-loop-index-lookup",
    title: "Árboles de Ejecución Física: Nested Loop Join e Index Lookup",
    pillar: "db-systems",
    video: {
      url: "https://www.youtube.com/watch?v=4gMw6Tk0RJc",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "database-2-midterm-review",
    title: "Repaso Pre-Parcial: Bases de Datos 2 en una Ruta Clara",
    pillar: "db-systems",
    video: {
      url: "https://www.youtube.com/watch?v=aKM4HTgRUpY",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "review-files-indexes-query-processing-distributed",
    title: "Repaso Final: Archivos, Índices, Consultas y Bases Distribuidas",
    pillar: "db-systems",
    video: {
      url: "https://www.youtube.com/watch?v=X-n77zyPOGw",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "neo4j-auradb-cypher-graph-modeling",
    title: "Neo4J desde Cero: AuraDB, Cypher y Modelado con Grafos",
    pillar: "nosql-distributed",
    video: {
      url: "https://www.youtube.com/watch?v=3wt--u2FDyk",
      length: "1:27:11",
    },
    pdfs: [],
  },
  {
    id: "neo4j-practice-crud-validations-driver",
    title: "Neo4J en Práctica: CRUD, Validaciones, Driver y Ejercicios",
    pillar: "nosql-distributed",
    video: {
      url: "https://www.youtube.com/watch?v=cPLohomCl9s",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "mongodb-modeling-installations-mql-aggregation",
    title: "MongoDB Completo: Modelado, Instalación, MQL y Aggregation Pipeline",
    pillar: "nosql-distributed",
    video: {
      url: "https://www.youtube.com/watch?v=EaFKwqAKg8M",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "mongodb-mql-find-aggregation-json-schema",
    title: "MongoDB en Práctica: Find, Aggregation y JSON Schema Validation",
    pillar: "nosql-distributed",
    video: {
      url: "https://www.youtube.com/watch?v=FXkcdgBES_k",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "mongodb-atlas-data-modeling-mongoql",
    title: "MongoDB Atlas: Modelado de Datos y Consultas MongoQL",
    pillar: "nosql-distributed",
    video: {
      url: "https://www.youtube.com/watch?v=r7ruco3PMXo",
      length: "1:36:02",
    },
    pdfs: [],
  },
  {
    id: "distributed-fragmentation-vertical-horizontal-mixed",
    title: "Fragmentación Distribuida: Vertical, Horizontal y Mixta sin Complicarse",
    pillar: "nosql-distributed",
    video: {
      url: "https://www.youtube.com/watch?v=79CicdOWSiM",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "distributed-fragmentation-query-optimization",
    title: "Bases Distribuidas: Fragmentación y Optimización de Consultas",
    pillar: "nosql-distributed",
    video: {
      url: "https://www.youtube.com/watch?v=rG2QkidDRu8",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "citusdata-postgresql-cluster",
    title: "Crea un Cluster con CitusData y PostgreSQL Distribuido",
    pillar: "nosql-distributed",
    video: {
      url: "https://www.youtube.com/watch?v=9kIPx-BEL_0",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "citusdata-query-strategies-2pc",
    title: "CitusData Avanzado: Estrategias de Consulta y 2-Phase Commit",
    pillar: "nosql-distributed",
    video: {
      url: "https://www.youtube.com/watch?v=mRzYnow8uNg",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "nestjs-basics-controllers-services-modules",
    title: "NestJS desde Cero: Controladores, Servicios, Módulos e Instalación",
    pillar: "backend-data-apps",
    video: {
      url: "https://www.youtube.com/watch?v=6hew-sMZZSQ",
      length: "1:24:37",
    },
    pdfs: [],
  },
  {
    id: "nestjs-theory-part-2",
    title: "NestJS Parte 2: Arquitectura Backend Explicada con Claridad",
    pillar: "backend-data-apps",
    video: {
      url: "https://www.youtube.com/watch?v=El56y_GdiBg",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "nestjs-mongoose-restapi-crud",
    title: "API REST con NestJS y Mongoose: CRUD Básico Paso a Paso",
    pillar: "backend-data-apps",
    video: {
      url: "https://www.youtube.com/watch?v=_ZTT4J51PdU",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "nestjs-mongodb-mongoose-env-variables",
    title: "NestJS + MongoDB: Mongoose, CRUD y Variables de Entorno",
    pillar: "backend-data-apps",
    video: {
      url: "https://www.youtube.com/watch?v=BrvJr-Hv4G4",
      length: "1:31:33",
    },
    pdfs: [],
  },
  {
    id: "nestjs-swagger-railway-cors",
    title: "Documenta y Despliega tu API NestJS: Swagger, Railway y CORS",
    pillar: "backend-data-apps",
    video: {
      url: "https://www.youtube.com/watch?v=1qBJk0_sLpE",
      length: "54:22",
    },
    pdfs: [],
  },
  {
    id: "datamart-from-relational-model",
    title: "Construye un Datamart desde Cero a partir de un Modelo Relacional",
    pillar: "backend-data-apps",
    video: {
      url: "https://www.youtube.com/watch?v=QqjSrlah1U4",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "dimensional-modeling-bi",
    title: "Modelado Dimensional para BI: Hechos, Dimensiones y Diseño Conceptual",
    pillar: "backend-data-apps",
    video: {
      url: "https://www.youtube.com/watch?v=usOPb8G3f-Y",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "pentaho-pdi-etl-part-1",
    title: "Pentaho Data Integration: Construye Flujos ETL desde Cero",
    pillar: "backend-data-apps",
    video: {
      url: "https://www.youtube.com/watch?v=5adJfQhih0E",
      length: "1:27:31",
    },
    pdfs: [],
  },
  {
    id: "pentaho-pdi-etl-part-2",
    title: "Pentaho Data Integration Parte 2: ETL Más Limpio y Profesional",
    pillar: "backend-data-apps",
    video: {
      url: "https://www.youtube.com/watch?v=eMc6hed00aQ",
      length: "1:13:14",
    },
    pdfs: [],
  },
];