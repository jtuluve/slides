import { access, readdir, rm } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const slidesRoot = join(projectRoot, "slides");
const outputRoot = join(projectRoot, "public", "_slidev");
const slidevCli = join(
  projectRoot,
  "node_modules",
  "@slidev",
  "cli",
  "bin",
  "slidev.mjs",
);
const deckIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function getDeckIds() {
  const entries = await readdir(slidesRoot, { withFileTypes: true });
  const deckIds = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || !deckIdPattern.test(entry.name)) continue;

    try {
      await access(join(slidesRoot, entry.name, "slides.md"), constants.R_OK);
      deckIds.push(entry.name);
    } catch {
      // A deck is only discoverable when it has a readable slides.md entry.
    }
  }

  return deckIds.sort();
}

async function resolveDeckId(requestedId) {
  if (!requestedId || !deckIdPattern.test(requestedId)) {
    throw new Error(
      "Pass a deck id using lowercase letters, numbers, and hyphens (for example: starter).",
    );
  }

  const deckIds = await getDeckIds();
  if (!deckIds.includes(requestedId)) {
    throw new Error(`Unknown deck \"${requestedId}\". Available decks: ${deckIds.join(", ") || "none"}`);
  }

  return requestedId;
}

function runSlidev(args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(process.execPath, [slidevCli, ...args], {
      cwd: projectRoot,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolvePromise();
        return;
      }

      reject(
        new Error(
          signal
            ? `Slidev stopped after receiving ${signal}.`
            : `Slidev exited with code ${code}.`,
        ),
      );
    });
  });
}

async function buildDeck(deckId) {
  const entry = join(slidesRoot, deckId, "slides.md");
  const output = join(outputRoot, deckId);

  await rm(output, { recursive: true, force: true });
  console.log(`Building /slides/${deckId} from ${relative(projectRoot, entry)}...`);

  await runSlidev([
    "build",
    entry,
    "--base",
    `/slides/${deckId}/`,
    "--out",
    output,
    "--without-notes",
  ]);
}

async function main() {
  const [command = "list", requestedId] = process.argv.slice(2);

  if (command === "list") {
    const deckIds = await getDeckIds();
    console.log(deckIds.join("\n"));
    return;
  }

  if (command === "dev") {
    const deckId = await resolveDeckId(requestedId);
    await runSlidev([join(slidesRoot, deckId, "slides.md")]);
    return;
  }

  if (command === "mcp") {
    const deckId = await resolveDeckId(requestedId);
    await runSlidev(["mcp", join(slidesRoot, deckId, "slides.md")]);
    return;
  }

  if (command === "build") {
    const deckIds = requestedId
      ? [await resolveDeckId(requestedId)]
      : await getDeckIds();

    if (!requestedId) {
      await rm(outputRoot, { recursive: true, force: true });
    }

    for (const deckId of deckIds) {
      await buildDeck(deckId);
    }
    return;
  }

  throw new Error(
    `Unknown command \"${command}\". Use list, dev, build, or mcp.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
