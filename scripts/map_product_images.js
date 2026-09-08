const fs = require("fs");

const extracted = JSON.parse(fs.readFileSync("scripts/extracted_images.json", "utf8"));
const products = JSON.parse(fs.readFileSync("data/products.json", "utf8"));
const posts = JSON.parse(fs.readFileSync("data/posts.json", "utf8"));

// Filter out logo
const pool = extracted.filter(img => !img.alt.toLowerCase().includes("logo") && !img.src.includes("AB6AXuBRrw9jALwzVH1"));

function findBestImages(keywords, count = 2) {
  const matches = pool.filter(img => {
    const text = (img.alt + " " + img.src).toLowerCase();
    return keywords.some(k => text.includes(k.toLowerCase()));
  });

  const selected = [];
  for (const m of matches) {
    if (!selected.includes(m.src)) {
      selected.push(m.src);
      if (selected.length >= count) break;
    }
  }

  // If not enough matches, fallback to high quality pool items
  let fallbackIndex = 0;
  while (selected.length < count && fallbackIndex < pool.length) {
    const fallbackSrc = pool[fallbackIndex].src;
    if (!selected.includes(fallbackSrc)) {
      selected.push(fallbackSrc);
    }
    fallbackIndex++;
  }

  return selected;
}

// 1. Map Products
products.forEach(p => {
  let kw = [];
  if (p.category === "vong-tay") {
    if (p.slug.includes("tu-dan")) kw = ["tu dan", "rosewood beaded", "bead bracelet", "red rosewood", "red sua"];
    else if (p.slug.includes("sua-do")) kw = ["sua do", "dalbergia", "demonic eye", "beaded prayer", "interlocking"];
    else if (p.slug.includes("bach-xanh")) kw = ["bach xanh", "cedarwood", "burl", "green cypress", "snow cedarwood"];
    else if (p.slug.includes("ngoc-am")) kw = ["ngoc am", "cypress", "aromatic", "incense", "cedar"];
    else if (p.slug.includes("tram-huong")) kw = ["agarwood", "tram huong", "incense smoke", "meditation bead"];
    else kw = ["bracelet", "beads", "prayer"];
  } else if (p.category === "but-ky") {
    if (p.slug.includes("huyet-long")) kw = ["fountain pen", "translucent", "ruby", "pen", "feather"];
    else if (p.slug.includes("bach-xanh")) kw = ["pen", "fountain", "rollerball", "wooden desk", "gold accents"];
    else if (p.slug.includes("hoang-dan")) kw = ["fountain pen", "gold nib", "ink", "pen"];
    else if (p.slug.includes("mun-sung")) kw = ["ebony pen", "black pen", "fountain pen", "pen"];
    else kw = ["pen", "fountain"];
  } else if (p.category === "bi-lan-tay") {
    if (p.slug.includes("cam")) kw = ["meditation massage balls", "spherical", "handheld meditation", "rolling"];
    else kw = ["spheres", "massage balls", "ebony wood rolling", "meditation spheres"];
  } else if (p.category === "goi-go") {
    kw = ["pillow", "headrest", "wooden headrest", "cedar keepsake", "box"];
  } else if (p.category === "tau") {
    kw = ["pipe", "tobacco pipe", "freehand", "smoking pipe", "carved"];
  } else if (p.category === "dua-go") {
    kw = ["chopsticks", "ebony chopsticks", "dining", "cutlery", "box"];
  } else if (p.category === "dem-o-to") {
    kw = ["car seat", "cushion", "beaded car", "seat cushion", "beaded"];
  }

  const assignedImages = findBestImages(kw, 2);
  p.images = assignedImages.length > 0 ? assignedImages : ["/images/placeholder.svg"];
});

// 2. Map Posts
posts.forEach(post => {
  let kw = [];
  if (post.slug.includes("size-vong")) kw = ["bead bracelet", "wrist", "measurement", "red rosewood"];
  else if (post.slug.includes("bao-quan-vong")) kw = ["patina", "beeswax", "polish finish", "cloth"];
  else if (post.slug.includes("but-ky")) kw = ["fountain pen", "gold accents", "writing", "pen"];
  else if (post.slug.includes("van-go")) kw = ["macro photo", "cellular pores", "timber grain", "figured"];
  else if (post.slug.includes("dua-go")) kw = ["chopsticks", "ebony wood", "natural wood"];
  else kw = ["workshop", "craftsman", "artisan"];

  const assigned = findBestImages(kw, 1);
  post.thumbnail = assigned[0] || "/images/placeholder.svg";
});

// Save updated files
fs.writeFileSync("data/products.json", JSON.stringify(products, null, 2), "utf8");
fs.writeFileSync("data/posts.json", JSON.stringify(posts, null, 2), "utf8");

console.log("Successfully mapped real CDN images to all 20 products and 6 posts!");
