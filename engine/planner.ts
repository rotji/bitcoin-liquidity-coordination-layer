import fs from "fs";
import path from "path";

export function suggestNextImprovement(baseDir: string): string {
  const checklistPath = path.join(baseDir, "checklist.txt");
  if (!fs.existsSync(checklistPath)) {
    return "No checklist found. Run the orchestrator to generate one.";
  }
  const checklist = fs.readFileSync(checklistPath, "utf-8");
  const lines = checklist.split("\n");
  for (const line of lines) {
    if (line.startsWith("[ ]")) {
      // Return the first unchecked recommendation
      return `Next improvement to implement: ${line.replace('[ ]', '').trim()}`;
    }
  }
  return "All recommendations are complete!";
}
