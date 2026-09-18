import http.server
import socketserver
import threading
import time
import os
import subprocess

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="public", **kwargs)

def capture():
    port = 8088
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("", port), Handler)
    server_thread = threading.Thread(target=httpd.serve_forever)
    server_thread.daemon = True
    server_thread.start()

    print(f"Server started at http://localhost:{port}")
    time.sleep(1.5)

    node_code = """
const { chromium } = require('playwright-chromium');
const fs = require('fs');
const path = require('path');

async function main() {
  const edgePath = 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe';
  const chromePath = 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe';
  let executablePath = undefined;
  if (fs.existsSync(edgePath)) executablePath = edgePath;
  else if (fs.existsSync(chromePath)) executablePath = chromePath;

  const browser = await chromium.launch({ executablePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:8088/_slidev/token-efficient-mcp/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'public/cover-mcp.png' });
  await browser.close();
  console.log('Cover slide screenshot successfully captured!');
}
main().catch(err => { console.error(err); process.exit(1); });
"""

    with open("scripts/tmp_shot.js", "w") as f:
        f.write(node_code)

    res = subprocess.run(["node", "scripts/tmp_shot.js"], capture_output=True, text=True)
    print("Node stdout:", res.stdout)
    if res.stderr:
        print("Node stderr:", res.stderr)

    if os.path.exists("scripts/tmp_shot.js"):
        os.remove("scripts/tmp_shot.js")

    httpd.shutdown()

if __name__ == "__main__":
    capture()
