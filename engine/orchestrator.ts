import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendFilePath = path.join(
  __dirname,
  "../backend/src/main.ts" // or server.ts if that's your entry file
);

console.log("🔎 Reading backend file...\n");

const content = fs.readFileSync(backendFilePath, "utf-8");

console.log(content);


let report = "ENGINEERING REPORT\n";
report += "===================\n\n";
if (!content.includes("try") || !content.includes("catch")) {
  report += "⚠️ No error handling detected in backend routes.\n";
  console.log("⚠️ WARNING: No error handling detected in backend routes.");
} else {
  report += "✅ Error handling detected in backend routes.\n";
  console.log("✅ Error handling detected.");
}

const reportPath = path.join(__dirname, "report.txt");
fs.writeFileSync(reportPath, report);

console.log("📄 Report generated at /engine/report.txt");