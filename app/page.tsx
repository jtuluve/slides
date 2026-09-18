import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

const decks = [
  {
    id: "token-efficient-mcp",
    title: "Designing a Token-Efficient MCP Server",
    description:
      "Drishti’s three-tool MCP reduced initial tool context from 7,500+\u00a0tokens to about 280, then loads only the schemas a request needs.",
    date: "2026-09-19",
    tags: ["MCP", "Drishti", "AI Agents"],
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
            <div className="catalog-item-meta">
              <h2>
                <Link href={`/slides/${deck.id}`}>
                  {deck.title}
                  <ArrowRight
                    aria-hidden="true"
                    className="catalog-link-icon"
                    size={18}
                    weight="light"
                  />
                </Link>
              </h2>
              <time className="type-mono" dateTime={deck.date}>
                <CalendarBlank aria-hidden="true" size={16} weight="light" />
                {deck.date}
              </time>
            </div>
            <p className="type-body-prose">{deck.description}</p>
            <p className="catalog-tags">{deck.tags.join(" · ")}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
