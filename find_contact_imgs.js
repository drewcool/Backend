const fs = require("fs");
const path = require("path");

const contactPath = path.join(__dirname, "src", "templates", "contact.html");
const html = fs.readFileSync(contactPath, "utf8");

const re = /<img[^>]+src="([^"]+)"[^>]*>/gi;
let m;
console.log("Images found in contact.html:");
while ((m = re.exec(html)) !== null) {
  console.log(m[1]);
}
