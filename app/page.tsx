import Link from "next/link";

const decks = [
  {
    id: "token-efficient-mcp",
    title: "Designing a Token-Efficient MCP Server",
    description:
      "How work on Drishti led to a three-tool MCP design that reduced initial tool overhead from 7,500+ tokens to roughly 280.",
    date: "2026-09-19",
    tags: ["MCP", "Drishti", "AI Agents"],
  },
  {
    id: "starter",
    title: "Starter Deck",
    description: "Template starter deck for Slidev presentations.",
    date: "2026-09-01",
    tags: ["Template"],
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "80px 24px",
      }}
    >
      <header style={{ marginBottom: "50px" }}>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            margin: "0 0 12px",
          }}
        >
          Presentations & Decks
        </h1>
        <p style={{ color: "#9a9e9f", fontSize: "18px", margin: 0 }}>
          Interactive Slidev talks and slide decks.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {decks.map((deck) => (
          <article
            key={deck.id}
            style={{
              border: "1px solid #34383a",
              borderRadius: "12px",
              padding: "28px",
              backgroundColor: "rgba(255,255,255,0.02)",
              transition: "border-color 0.2s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "12px",
              }}
            >
              <h2 style={{ fontSize: "24px", fontWeight: 400, margin: 0 }}>
                <Link
                  href={`/slides/${deck.id}`}
                  style={{
                    color: "#82dfe9",
                    textDecoration: "none",
                  }}
                >
                  {deck.title}
                </Link>
              </h2>
              <span
                style={{
                  color: "#6f7476",
                  fontSize: "13px",
                  fontFamily: "monospace",
                }}
              >
                {deck.date}
              </span>
            </div>
            <p
              style={{
                color: "#9a9e9f",
                fontSize: "15px",
                lineHeight: "1.5",
                margin: "0 0 20px",
              }}
            >
              {deck.description}
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {deck.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: "rgba(130, 223, 233, 0.1)",
                    color: "#82dfe9",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
