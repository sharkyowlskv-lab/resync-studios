#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dir, "dist", "index.cjs");
const hasProductionBuild = fs.existsSync(distPath);

console.log(`🔍 Production build exists: ${hasProductionBuild}`);
console.log(`📁 Checking: ${distPath}`);

// Force production if dist exists, otherwise dev
const isProduction = hasProductionBuild;
const script = isProduction ? "npm run start" : "npm run dev";

console.log(`🚀 Running: ${script}`);
console.log(`📌 NODE_ENV: ${isProduction ? "production" : "development"}`);

const proc = spawn(script, [], {
  shell: true,
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: isProduction ? "production" : "development",
  },
});

proc.on("exit", (code) => {
  process.exit(code || 0);
});
