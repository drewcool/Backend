const fs = require("fs");
const path = require("path");

const publicImages = path.join(__dirname, "public", "images");
const logoPng = path.join(__dirname, "public", "Logo.png");

// 1. Overwrite all known Arise logo files in public/images with Logo.png
const logoFilenames = [
  "PNBw6IRBeTzFMheULCykzniB9Q.2fa88.svg",
  "PNBw6IRBeTzFMheULCykzniB9Q.2fa88.png",
  "j07dUDNi3R7s1hBgf9y7iH3NCA.2fa88.svg",
  "j07dUDNi3R7s1hBgf9y7iH3NCA.2fa88.png",
  "0RVP3HSTOxbLQpHFYKd8UstCPQ.2fa88.svg",
  "0RVP3HSTOxbLQpHFYKd8UstCPQ.2fa88.png",
];

logoFilenames.forEach((filename) => {
  const dest = path.join(publicImages, filename);
  fs.copyFileSync(logoPng, dest);
  console.log("Copied Logo.png ->", filename);
});

// 2. Scan all HTML files in src/templates and replace logo src attributes directly with /Logo.png
function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith(".html")) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const templatesDir = path.join(__dirname, "src", "templates");
const htmlFiles = getAllHtmlFiles(templatesDir);

htmlFiles.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");

  // Replace src for navbar logo, comparison table logo, and footer logo
  content = content.replace(/images\/PNBw6IRBeTzFMheULCykzniB9Q\.2fa88\.svg/g, "/Logo.png");
  content = content.replace(/images\/j07dUDNi3R7s1hBgf9y7iH3NCA\.2fa88\.svg/g, "/Logo.png");
  content = content.replace(/images\/0RVP3HSTOxbLQpHFYKd8UstCPQ\.2fa88\.svg/g, "/Logo.png");

  fs.writeFileSync(filePath, content, "utf8");
  console.log("Updated HTML template:", path.relative(templatesDir, filePath));
});
