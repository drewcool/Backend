const fs = require("fs");
const path = require("path");

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
const files = getAllHtmlFiles(templatesDir);

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  
  // 1. Remove "Template By Digimoga" / "Template by Digimoga"
  content = content.replace(/Template [bB]y Digimoga/g, "");

  // 2. Replace @2024 with @2026
  content = content.replace(/@2024/g, "@2026");
  content = content.replace(/2024, All Rights Reserved/g, "2026, All Rights Reserved");

  // 3. Swap all Arise logo image references (including PNBw6IRBeTzFMheULCykzniB9Q, j07dUDNi3R7s1hBgf9y7iH3NCA, 0RVP3HSTOxbLQpHFYKd8UstCPQ, and any other logo file)
  content = content.replace(/images\/PNBw6IRBeTzFMheULCykzniB9Q\.2fa88\.svg/g, "/Logo.png");
  content = content.replace(/images\/j07dUDNi3R7s1hBgf9y7iH3NCA\.2fa88\.svg/g, "/Logo.png");
  content = content.replace(/images\/0RVP3HSTOxbLQpHFYKd8UstCPQ\.2fa88\.svg/g, "/Logo.png");

  fs.writeFileSync(filePath, content, "utf8");
  console.log("Updated:", path.relative(templatesDir, filePath));
});
