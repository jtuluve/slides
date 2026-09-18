import Link from "next/link";

const decks = [
  {
    id: "token-efficient-mcp",
    title: "Designing a Token-Efficient MCP Server",
    event: "Hackersmang, UniCourt",
    date: "Sept 19, 2026",
    description:
      "How work on Drishti led to a three-tool MCP design that reduced initial tool overhead from 7,500+ tokens to roughly 280.",
    previewImage: "/cover-mcp.png",
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "80px 24px",
      }}
    >
      {/* Portfolio Theme Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #27272a",
          paddingBottom: "24px",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            margin: 0,
            color: "#f4f4f5",
          }}
        >
          Slides
        </h1>
        <a
          href="https://j.tuluve.dev"
          style={{
            color: "#a1a1aa",
            fontSize: "14px",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
        >
          j.tuluve.dev
        </a>
      </header>

      {/* Presentation Cards List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {decks.map((deck) => (
          <article
            key={deck.id}
            style={{
              border: "1px solid #27272a",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "rgba(24, 24, 27, 0.4)",
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "24px",
              alignItems: "center",
            }}
          >
            {/* First Slide Screenshot Preview */}
            <Link
              href={`/slides/${deck.id}`}
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                width: "100%",
                overflow: "hidden",
                borderRadius: "8px",
                border: "1px solid #27272a",
                display: "block",
                backgroundColor: "#09090b",
              }}
            >
              <img
                src={deck.previewImage}
                alt={`${deck.title} First Slide Preview`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Link>

            {/* Deck Content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "13px",
                  marginBottom: "6px",
                }}
              >
                <span style={{ color: "#d4d4d8", fontWeight: 500 }}>
                  {deck.event}
                </span>
                <span style={{ color: "#71717a" }}>{deck.date}</span>
              </div>

              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  margin: "0 0 6px",
                  letterSpacing: "-0.02em",
                }}
              >
                <Link
                  href={`/slides/${deck.id}`}
                  style={{
                    color: "#f4f4f5",
                    textDecoration: "none",
                  }}
                >
                  {deck.title}
                </Link>
              </h2>

              <p
                style={{
                  color: "#a1a1aa",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                {deck.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
