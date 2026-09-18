"use client";

import { useEffect, useState } from "react";

const themeStorageKey = "minimal-theme";

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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    if (savedTheme === "dark" || savedTheme === "light") {
      setIsDark(savedTheme === "dark");
    } else {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDark(mediaQuery.matches);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const nextTheme = !prev;
      window.localStorage.setItem(themeStorageKey, nextTheme ? "dark" : "light");
      return nextTheme;
    });
  };

  const theme = {
    bg: isDark ? "#09090b" : "#ffffff",
    textPrimary: isDark ? "#f4f4f5" : "#09090b",
    textMuted: isDark ? "#a1a1aa" : "#52525b",
    textSubtle: isDark ? "#71717a" : "#71717a",
    border: isDark ? "#27272a" : "#e4e4e7",
    btnBg: isDark ? "#18181b" : "#ffffff",
    btnBorder: isDark ? "#27272a" : "#e4e4e7",
  };

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        minHeight: "100vh",
        color: theme.textPrimary,
        transition: "background-color 0.2s ease, color 0.2s ease",
      }}
    >
      {/* Fixed Top-Right Theme Toggle Button matching Portfolio */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 30,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${theme.btnBorder}`,
          backgroundColor: theme.btnBg,
          color: theme.textPrimary,
          cursor: "pointer",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          transition: "background-color 0.2s ease, border-color 0.2s ease",
        }}
      >
        {isDark ? (
          /* Sun Icon */
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          /* Moon Icon */
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </button>

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
            borderBottom: `1px solid ${theme.border}`,
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
              color: theme.textPrimary,
            }}
          >
            Slides
          </h1>
          <a
            href="https://j.tuluve.dev"
            style={{
              color: theme.textMuted,
              fontSize: "14px",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            j.tuluve.dev
          </a>
        </header>

        {/* Presentation Cards List */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {decks.map((deck) => (
            <a
              key={deck.id}
              href={`/slides/${deck.id}/`}
              style={{
                padding: "24px 0",
                borderBottom: `1px solid ${theme.border}`,
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: "24px",
                alignItems: "center",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
            >
              {/* First Slide Screenshot Preview */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16 / 9",
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: "8px",
                  border: `1px solid ${theme.border}`,
                  display: "block",
                  backgroundColor: theme.bg,
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
              </div>

              {/* Deck Content */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "12px",
                    color: theme.textSubtle,
                  }}
                >
                  <span>{deck.event}</span>
                  <span>{deck.date}</span>
                </div>

                <h2
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    margin: "2px 0 4px",
                    letterSpacing: "-0.02em",
                    color: theme.textPrimary,
                  }}
                >
                  {deck.title}
                </h2>

                <p
                  style={{
                    color: theme.textMuted,
                    fontSize: "14px",
                    lineHeight: "1.5",
                    margin: 0,
                  }}
                >
                  {deck.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
