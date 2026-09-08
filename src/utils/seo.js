/**
 * Quản lý thẻ SEO và Structured Data (Schema.org JSON-LD)
 */

export function updateMetaTags({ title, description, image, url }) {
  if (typeof document === "undefined") return;

  const fullTitle = title.includes("Mỹ Nghệ Đông Phong")
    ? title
    : `${title} | Mỹ Nghệ Đông Phong`;

  document.title = fullTitle;

  const setMeta = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content || "");
  };

  const setOgMeta = (property, content) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content || "");
  };

  if (description) {
    setMeta("description", description);
    setOgMeta("og:description", description);
  }

  setOgMeta("og:title", fullTitle);
  if (image) setOgMeta("og:image", image);
  if (url) setOgMeta("og:url", url);
}

export function injectJsonLd(id, schemaData) {
  if (typeof document === "undefined") return;

  let scriptEl = document.getElementById(id);
  if (!scriptEl) {
    scriptEl = document.createElement("script");
    scriptEl.id = id;
    scriptEl.type = "application/ld+json";
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(schemaData);
}
