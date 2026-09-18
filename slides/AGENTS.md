# Slide deck instructions

- Each deck lives at `slides/<id>/slides.md`, where `<id>` is lowercase kebab-case.
- Keep `title`, `description`, `author`, `date`, `tags`, and `published` in the first frontmatter block. The portfolio uses these fields to build `/slides`.
- Separate slides with a line containing only `---`.
- Put deck-specific components, styles, and public assets beside `slides.md` so Slidev resolves them from that deck's directory.
- Preview one deck with `npm run slides:dev -- <id>`.
- Generate one embedded deck with `npm run slides:build -- <id>`. The regular portfolio build generates every published deck before Next.js builds.
- Start Slidev's structured stdio MCP server for one deck with `npm run slides:mcp -- <id>`.
- Do not edit generated files in `public/_slidev`; they are ignored and replaced by the build script.
- Codex may edit Markdown directly or use Slidev's MCP tools. The configured `slidev-portfolio` server currently targets the starter deck; add a separate Codex MCP entry when a new deck needs structured slide tools.
