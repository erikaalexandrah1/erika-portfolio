import { useEffect } from "react";

/**
 * SEO por ruta sin dependencias: actualiza <title>, meta description,
 * canonical y las etiquetas Open Graph / Twitter al montar cada escena.
 * (Ayuda al renderizado JS de Google; el fallback estático vive en index.html.)
 */
const SITE = "https://erikahernandez.dev";
const BRAND = "Erika Hernández";
const DEFAULT_DESC =
  "Full-Stack developer and Systems Engineering student building clear, end-to-end systems across databases, data pipelines and backend architecture.";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${BRAND}` : `${BRAND} — Full-Stack Developer & Educator`;
    const desc = description || DEFAULT_DESC;
    const url = SITE + path;

    document.title = fullTitle;
    upsertMeta("name", "description", desc);
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", url);

    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", desc);
  }, [title, description, path]);

  return null;
}
