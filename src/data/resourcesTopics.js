// Pilares = categorías para filtrar.
// Esta clasificación es más limpia para tu página:
// 1. Relational Databases: SQL, PostgreSQL, teoría relacional, índices, consultas.
// 2. NoSQL & Distributed: MongoDB, Neo4J, CitusData, bases distribuidas.
// 3. Backend: NestJS, APIs, Swagger, despliegue.
// 4. Business Intelligence & Big Data: Datamart, Pentaho, Metabase, Spark, Databricks.

export const PILLARS = [
  {
    id: "relational-databases",
    label: "Relational Databases",
    color: "#6d8bff",
  },
  {
    id: "nosql-distributed",
    label: "NoSQL & Distributed",
    color: "#4fd1a1",
  },
  {
    id: "backend",
    label: "Backend",
    color: "#ffc861",
  },
  {
    id: "bi-bigdata",
    label: "Business Intelligence & Big Data",
    color: "#c07bff",
  },
];

export const TOPICS = [
  // ---------------------------------------------------------------------------
  // RELATIONAL DATABASES
  // ---------------------------------------------------------------------------

  {
    id: "database-fundamentals-smbd-design-architecture",
    title: "Bases de Datos desde Cero: SMBD, Diseño y Arquitectura",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=c496hSrltNk",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "conceptual-design-er-model",
    title: "Diseño Conceptual de Bases de Datos con Modelo Entidad-Relación",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=tkpjVRwdbhk",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "postgresql-installation-local-docker-pgadmin",
    title: "PostgreSQL desde Cero: Instalación Local, Docker, SQL y pgAdmin",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=wFqWqQ1MDMI",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "sql-practical-queries",
    title: "SQL en Práctica: Consultas, Filtros y Ejercicios Guiados",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=3WcMubDJoIU",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "relational-algebra-joins-division",
    title: "Álgebra Relacional sin Miedo: Joins, Producto Cartesiano y División",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=zINSeqtfG0A",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "normalization-1nf-2nf-3nf",
    title: "Normalización de Bases de Datos: 1FN, 2FN y 3FN Explicadas Fácil",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=pGN6YAvwd0c",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "transactions-recovery-commit-rollback",
    title: "Transacciones en Bases de Datos: Commit, Rollback y Recuperación",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=n6CB2irBtbU",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "concurrency-control-locking",
    title: "Control de Concurrencia: Bloqueos, Protocolos y Manejo de Conflictos",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=cY8-3-DunbA",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "file-organization-heap-sequential-hash",
    title: "Organización de Archivos: Montículo, Secuencial y Hash",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=qszrU_oPtnw",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "postgresql-file-organization-scans-explain",
    title: "PostgreSQL por Dentro: Organización de Archivos, Scans y EXPLAIN",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=kP5luW7AV94",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "database-indexes-primary-clustered-secondary",
    title: "Índices en Bases de Datos: Primarios, Agrupados, Secundarios y Multinivel",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=kf5pluNGVQQ",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "postgresql-btree-hash-indexes",
    title: "Índices en PostgreSQL: B-Tree, Hash y Optimización de Consultas",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=PoeCNc4ED2E",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "query-processing-heuristic-optimization",
    title: "Procesamiento de Consultas: Optimización Heurística Paso a Paso",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=IY04SR5zEPU",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "query-processing-optimization-part-2",
    title: "Optimización de Consultas Parte 2: Cómo Piensa el Motor de Base de Datos",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=p4GO1vuhUfg",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "physical-execution-trees-nested-loop-index-lookup",
    title: "Árboles de Ejecución Física: Nested Loop Join e Index Lookup",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=4gMw6Tk0RJc",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "database-2-midterm-review",
    title: "Repaso Pre-Parcial: Archivos, Índices y Procesamiento de Consultas",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=aKM4HTgRUpY",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "review-files-indexes-query-processing-distributed",
    title: "Repaso Final: Organización de Archivos, Índices, Consultas y Bases Distribuidas",
    pillar: "relational-databases",
    video: {
      url: "https://www.youtube.com/watch?v=X-n77zyPOGw",
      length: "",
    },
    pdfs: [],
  },

  // ---------------------------------------------------------------------------
  // NOSQL & DISTRIBUTED
  // ---------------------------------------------------------------------------

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
    id: "distributed-database-modeling-fragmentation",
    title: "Modelado en Bases de Datos Distribuidas: Fragmentación y Diseño",
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
    title: "CitusData + PostgreSQL: Crea un Cluster de Base de Datos Distribuida",
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

  // ---------------------------------------------------------------------------
  // BACKEND
  // ---------------------------------------------------------------------------

  {
    id: "nestjs-basics-controllers-services-modules",
    title: "NestJS desde Cero: Controladores, Servicios, Módulos e Instalación",
    pillar: "backend",
    video: {
      url: "https://www.youtube.com/watch?v=6hew-sMZZSQ",
      length: "1:24:37",
    },
    pdfs: [],
  },
  {
    id: "nestjs-mongodb-mongoose-env-variables",
    title: "NestJS + MongoDB: Mongoose, CRUD y Variables de Entorno",
    pillar: "backend",
    video: {
      url: "https://www.youtube.com/watch?v=BrvJr-Hv4G4",
      length: "1:31:33",
    },
    pdfs: [],
  },
  {
    id: "nestjs-swagger-railway-cors",
    title: "Documenta y Despliega tu API NestJS: Swagger, Railway y CORS",
    pillar: "backend",
    video: {
      url: "https://www.youtube.com/watch?v=1qBJk0_sLpE",
      length: "54:22",
    },
    pdfs: [],
  },

  // ---------------------------------------------------------------------------
  // BUSINESS INTELLIGENCE & BIG DATA
  // ---------------------------------------------------------------------------

  {
    id: "dimensional-modeling-bi",
    title: "Modelado Dimensional para BI: Hechos, Dimensiones y Diseño Conceptual",
    pillar: "bi-bigdata",
    video: {
      url: "https://www.youtube.com/watch?v=QAKq6ltudj0",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "datamart-from-relational-model",
    title: "Construye un Datamart desde Cero a partir de un Modelo Relacional",
    pillar: "bi-bigdata",
    video: {
      url: "https://www.youtube.com/watch?v=QqjSrlah1U4",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "datamart-metabase-dashboard",
    title: "Conecta un Datamart a Metabase y Crea Dashboards Estadísticos",
    pillar: "bi-bigdata",
    video: {
      url: "https://www.youtube.com/watch?v=ih4hGFv9Ke8",
      length: "",
    },
    pdfs: [],
  },
  {
    id: "pentaho-pdi-etl-part-1",
    title: "Pentaho Data Integration: Construye Flujos ETL desde Cero",
    pillar: "bi-bigdata",
    video: {
      url: "https://www.youtube.com/watch?v=5adJfQhih0E",
      length: "1:27:31",
    },
    pdfs: [],
  },
  {
    id: "pentaho-pdi-etl-part-2",
    title: "Pentaho Data Integration Parte 2: ETL Más Limpio y Profesional",
    pillar: "bi-bigdata",
    video: {
      url: "https://www.youtube.com/watch?v=eMc6hed00aQ",
      length: "1:13:14",
    },
    pdfs: [],
  },
  {
    id: "databricks-community-apache-spark",
    title: "Cómo Utilizar Databricks Community como herramienta con Apache Spark para análisis de Big Data.",
    pillar: "bi-bigdata",
    video: {
      url: "https://www.youtube.com/watch?v=QY0a0pIm5fA",
      length: "",
    },
    pdfs: [],
  },
];