const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "src", "templates", "index.html");
const html = fs.readFileSync(indexPath, "utf8");

// Search snippet around "Other Agencies"
const re = /Other Agencies[\s\S]{0,800}/gi;
const match = re.exec(html);
if (match) {
  console.log("COMPARISON TABLE SNIPPET:");
  console.log(match[0]);
} else {
  console.log("Other Agencies NOT FOUND");
}
