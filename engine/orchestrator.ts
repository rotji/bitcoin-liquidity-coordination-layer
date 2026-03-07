
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { readBackendFile, readFrontendFile } from "./observer.ts";
import { analyzeBackend, analyzeFrontend, calculateScore } from "./evaluator.ts";
import { suggestNextImprovement } from "./planner.ts";
import { addErrorHandlingToBackend } from "./executor.ts";
import { loadUserConfig } from "./config.ts";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Load User Config ---
const userConfig = loadUserConfig();


console.log("🔎 Reading backend and frontend files...\n");
const content = readBackendFile(__dirname);
const frontendContent = readFrontendFile(__dirname);

console.log(content);

let report = "ENGINEERING REPORT\n";
report += "===================\n\n";
report += analyzeBackend(content) + "\n";
report += "\nFRONTEND ANALYSIS\n";
report += "=================\n\n";
report += analyzeFrontend(frontendContent) + "\n";

// --- Engineering Score ---
const score = calculateScore(content, frontendContent);
report += "\nENGINEERING SCORE\n";
report += "=================\n\n";
report += `Score: ${score} / 100\n`;


// --- Score History Tracking ---
const historyPath = path.join(__dirname, "history.json");
let history = [];
if (fs.existsSync(historyPath)) {
  const existing = fs.readFileSync(historyPath, "utf-8");
  history = JSON.parse(existing);
}
history.push({
  date: new Date().toISOString(),
  score
});
fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));


// --- AI Prompt Generation ---
const aiPromptPath = path.join(__dirname, "ai_prompt.txt");

let aiPrompt = `
You are a senior software architect.

Analyze the following full-stack project files and suggest improvements in:

1. Code structure
2. Error handling
3. Performance
4. Security
5. Scalability

BACKEND FILE:
-------------
${content}

FRONTEND FILE:
--------------
${frontendContent}

Respond with structured recommendations.
`;

fs.writeFileSync(aiPromptPath, aiPrompt);


const reportPath = path.join(__dirname, "report.txt");
fs.writeFileSync(reportPath, report);

// --- AI Response File Automation ---
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

const aiResponsePath = path.join(__dirname, `ai_response_${timestamp}.txt`);
fs.writeFileSync(aiResponsePath, "# AI Response\n\nPaste the recommendations from Copilot Chat or another AI tool here after analyzing ai_prompt.txt.\n");

// --- AI Recommendation Comparison Automation ---
// Find the most recent ai_response file
const files = fs.readdirSync(__dirname);
const aiResponseFiles = files.filter(f => f.startsWith("ai_response_") && f.endsWith(".txt"));
aiResponseFiles.sort(); // ISO timestamps sort chronologically
const latestAiResponseFile = aiResponseFiles.length > 0 ? aiResponseFiles[aiResponseFiles.length - 2] : null; // -2 because we just created a new one

let checklist = "# AI Recommendation Checklist\n\n";
if (latestAiResponseFile) {
  const aiResponseContent = fs.readFileSync(path.join(__dirname, latestAiResponseFile), "utf-8");
  // Ignore section headers and only check actionable recommendations
  const recommendations = aiResponseContent.split("\n").filter(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return false;
    // Ignore lines that look like section headers (e.g., "2. Error Handling", "4. Security")
    return !/^\d+\.?\s*\w+/i.test(trimmed) && !/^\d+\./.test(trimmed);
  });
  checklist += `Comparing recommendations from: ${latestAiResponseFile}\n\n`;
  recommendations.forEach(rec => {
    // Fuzzy keyword matching: split recommendation into keywords, check if any appear in code
    const keywords = rec.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    let found = false;
    for (const kw of keywords) {
      if (kw.length > 3 && (content.toLowerCase().includes(kw) || frontendContent.toLowerCase().includes(kw))) {
        found = true;
        break;
      }
    }
    if (found) {
      checklist += `[x] ${rec}\n`;
    } else {
      checklist += `[ ] ${rec}\n`;
    }
  });
} else {
  checklist += "No previous AI response file found to compare.\n";
}


const checklistPath = path.join(__dirname, "checklist.txt");
fs.writeFileSync(checklistPath, checklist);


// --- Planner Suggestion ---
const nextImprovement = suggestNextImprovement(__dirname);
console.log(`🗂️  ${nextImprovement}`);

// --- Executor (Optional Automation) ---
import readline from "readline";


async function confirmAndExecute() {
  if (nextImprovement.toLowerCase().includes("error handling")) {
    if (userConfig.autoExecute) {
      const execResult = addErrorHandlingToBackend(__dirname);
      console.log(`⚡ Executor: ${execResult}`);
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      await new Promise<void>((resolve) => {
        rl.question("⚠️  Do you want to auto-apply error handling to your backend? (yes/no): ", (answer) => {
          if (answer.trim().toLowerCase() === "yes") {
            const execResult = addErrorHandlingToBackend(__dirname);
            console.log(`⚡ Executor: ${execResult}`);
          } else {
            console.log("Executor: Skipped code modification.");
          }
          rl.close();
          resolve();
        });
      });
    }
  }
}

await confirmAndExecute();

// --- AI Feedback Loop (optional) ---
if (userConfig.aiFeedback) {
  // --- Basic AI Feedback Loop Example ---
  // This is a placeholder for future logic. For now, it just reads the last score and prints a message.
  if (history.length > 1) {
    const prevScore = history[history.length - 2].score;
    const currScore = history[history.length - 1].score;
    if (currScore > prevScore) {
      console.log("🤖 AI Feedback: Project score improved! Keep following recommendations.");
    } else if (currScore < prevScore) {
      console.log("🤖 AI Feedback: Project score decreased. Review recent changes.");
    } else {
      console.log("🤖 AI Feedback: Project score unchanged. Try a different improvement.");
    }
  } else {
    console.log("🤖 AI Feedback: Not enough history for feedback.");
  }
}

console.log("📄 Report generated at /engine/report.txt");
console.log("📝 AI prompt generated at /engine/ai_prompt.txt");
console.log(`📝 New AI response file created: ${aiResponsePath}`);
console.log(`📋 Checklist generated at /engine/checklist.txt`);