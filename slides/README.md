# Slidev decks

Each subdirectory is one Slidev presentation and maps to `/slides/<id>` in the portfolio.

```text
slides/
  my-talk/
    slides.md
    style.css       # optional, auto-loaded by Slidev
    components/     # optional Vue components
    public/         # optional deck assets
```

## Commands

```bash
npm run slides:list
npm run slides:dev -- starter
npm run slides:build -- starter
npm run slides:build
npm run slides:mcp -- starter
```

The main `npm run build` command runs `slides:build` first, so deployments include every deck. Generated Slidev apps live under `public/_slidev/` and are displayed by the portfolio route at `/slides/<id>`.

Slidev is Markdown-first, so Codex can always edit a deck directly. Slidev 53 also includes a structured MCP server for inspecting, editing, reordering, and navigating slides. This machine has a Codex MCP entry named `slidev-portfolio` targeting the starter deck; restart Codex to make the newly configured tools available.

When the dev server is running, the same tools are available over HTTP at `http://localhost:3030/__mcp`, including live slide navigation.
