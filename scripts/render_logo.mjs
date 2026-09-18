import { chromium } from "playwright-chromium";
import fs from "node:fs";
import path from "node:path";

async function render() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 300, height: 300 } });
  const svgPath = path.resolve("slides/token-efficient-mcp/public/drishti-logo-mark.svg");
  let svgContent = fs.readFileSync(svgPath, "utf8");
  svgContent = svgContent.replaceAll("#01378f", "#82dfe9");

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; height: 300px; width: 300px;">
        <div id="svg" style="width: 200px; height: 200px; display: flex;">
          ${svgContent}
        </div>
      </body>
    </html>
  `);

  const element = await page.$("#svg");
  await element.screenshot({
    path: "slides/token-efficient-mcp/public/drishti-logo-mark-cyan.png",
    omitBackground: true,
  });
  await browser.close();
  console.log("Drishti PNG logo generated!");
}

render().catch(console.error);
