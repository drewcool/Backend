const fs = require("fs");
const path = require("path");

function removeFigmaAndDigimogaSurgically(html) {
  let cleaned = html;

  // 1. Swap navbar logo, comparison table logo, and footer logo to /Logo.png
  cleaned = cleaned.replace(/images\/PNBw6IRBeTzFMheULCykzniB9Q\.2fa88\.svg/g, "/Logo.png");
  cleaned = cleaned.replace(/images\/j07dUDNi3R7s1hBgf9y7iH3NCA\.2fa88\.svg/g, "/Logo.png");
  cleaned = cleaned.replace(/images\/0RVP3HSTOxbLQpHFYKd8UstCPQ\.2fa88\.svg/g, "/Logo.png");

  // 2. Remove ONLY the specific floating badge containers for Figma & Digimoga
  cleaned = cleaned.replace(/<div class="framer-lpe29j-container">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, "");
  cleaned = cleaned.replace(/<div class="framer-3ek784-container">[\s\S]*?<\/div>/gi, "");

  // 3. Remove standalone Digimoga links/anchors if any
  cleaned = cleaned.replace(/<a[^>]*href="https:\/\/x\.com\/Digimoga37v"[^>]*>[\s\S]*?<\/a>/gi, "");

  return cleaned;
}

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith(".html")) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const templatesDir = path.join(__dirname, "src", "templates");
const allHtmlFiles = getAllFiles(templatesDir);

allHtmlFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  const result = removeFigmaAndDigimogaSurgically(content);
  fs.writeFileSync(file, result, "utf8");
  console.log("Surgically cleaned:", path.relative(templatesDir, file));
});
