import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

const decks = [
  {
    id: "token-efficient-mcp",
    title: "Designing a Token-Efficient MCP Server",
    event: "Hackersmang, UniCourt",
    description:
      "Drishti’s three-tool MCP reduced initial tool context from 7,500+\u00a0tokens to about 280, then loads only the schemas a request needs.",
    date: "2026-09-19",
    dateLabel: "Sept 19, 2026",
    tags: ["MCP", "Drishti", "AI Agents"],
    previewImage: "/cover-mcp.png",
  },
];

export default function HomePage() {
  return (
    <main className="catalog">
      <header className="catalog-header">
        <p className="type-eyebrow">Manasija</p>
        <h1 className="type-display">Presentations</h1>
        <p className="type-body-prose">
          Talks on turning noisy market systems into inspectable tools for
          agents.
        </p>
      </header>

      <section className="catalog-list" aria-label="Slide decks">
        {decks.map((deck) => (
          <article key={deck.id} className="catalog-item">
            <Link href={`/slides/${deck.id}`} className="catalog-item-link">
              <div className="catalog-preview">
                <Image
                  src={deck.previewImage}
                  alt={`${deck.title} first slide`}
                  fill
                  sizes="(min-width: 768px) 220px, 100vw"
                />
              </div>
              <div>
                <div className="catalog-item-meta">
                  <h2>
                    {deck.title}
                    <ArrowRight
                      aria-hidden="true"
                      className="catalog-link-icon"
                      size={18}
                      weight="light"
                    />
                  </h2>
                  <time className="type-mono" dateTime={deck.date}>
                    <CalendarBlank aria-hidden="true" size={16} weight="light" />
                    {deck.dateLabel}
                  </time>
                </div>
                <p className="type-eyebrow">{deck.event}</p>
                <p className="type-body-prose">{deck.description}</p>
                <p className="catalog-tags">{deck.tags.join(" · ")}</p>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
