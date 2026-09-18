import { chromium } from "playwright-chromium";
import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

async function run() {
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  let executablePath = undefined;
  if (fs.existsSync(edgePath)) executablePath = edgePath;
  else if (fs.existsSync(chromePath)) executablePath = chromePath;

  const server = spawn("npx", ["serve", "public", "-p", "3033"], {
    shell: true,
  });

  await new Promise((r) => setTimeout(r, 2500));

  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  console.log("Navigating to http://localhost:3033/_slidev/token-efficient-mcp/");
  await page.goto("http://localhost:3033/_slidev/token-efficient-mcp/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const outputPath = path.resolve("public/cover-mcp.png");
  await page.screenshot({ path: outputPath });
  await browser.close();
  server.kill();

  console.log("Successfully saved cover slide screenshot to:", outputPath);
  process.exit(0);
}

run().catch(console.error);
