const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "public", "images");
const files = fs.readdirSync(imagesDir).filter((f) => f.endsWith(".svg"));

const logoFiles = [];

files.forEach((f) => {
  const content = fs.readFileSync(path.join(imagesDir, f), "utf8");
  // Check if SVG contains the Arise path or text elements
  if (content.includes("M25.956 21.148") || content.includes("M92.51 30.891") || content.toLowerCase().includes("arise")) {
    logoFiles.push(f);
  }
});

console.log("FOUND LOGO SVGS:", logoFiles);
