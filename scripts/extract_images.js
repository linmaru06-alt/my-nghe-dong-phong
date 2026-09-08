const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) results = results.concat(walk(full));
    else if (f === "index.html") results.push(full);
  }
  return results;
}

const files = walk("stitch/designs");
const imgMap = new Map();

files.forEach(f => {
  const content = fs.readFileSync(f, "utf8");
  const regex = /<img[^>]+src=["'](https:\/\/lh3\.googleusercontent\.com\/[^"'\s>]+)["'][^>]*>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const tag = match[0];
    const src = match[1];
    const altMatch = tag.match(/data-alt=["']([^"']+)["']/) || tag.match(/alt=["']([^"']+)["']/);
    const alt = altMatch ? altMatch[1] : "";
    if (src.length > 50 && !imgMap.has(src)) {
      imgMap.set(src, alt);
    }
  }
});

const list = Array.from(imgMap.entries()).map(([src, alt]) => ({ src, alt }));
if (!fs.existsSync("scripts")) fs.mkdirSync("scripts");
fs.writeFileSync("scripts/extracted_images.json", JSON.stringify(list, null, 2), "utf8");
console.log("Total unique images extracted:", list.length);
