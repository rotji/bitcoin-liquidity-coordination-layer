import fs from "fs";
import path from "path";

export function readBackendFile(baseDir: string): string {
  const backendFilePath = path.join(baseDir, "../backend/src/main.ts");
  return fs.readFileSync(backendFilePath, "utf-8");
}

export function readFrontendFile(baseDir: string): string {
  const frontendFilePath = path.join(baseDir, "../frontend/bitcoin liquidity network/src/App.tsx");
  try {
    return fs.readFileSync(frontendFilePath, "utf-8");
  } catch {
    return "";
  }
}
