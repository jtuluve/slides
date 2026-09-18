---
theme: default
title: Designing a Token-Efficient MCP Server
description: How work on Drishti led to a three-tool MCP design that reduced initial tool overhead from 7,500+ tokens to roughly 280.
author: Jnanesh and Deion Dsouza
date: 2026-09-19
tags:
  - MCP
  - Drishti
  - AI Agents
published: true
transition: fade-out
colorSchema: light
class: cover-slide
mdc: true
aspectRatio: 16/9
canvasWidth: 980
routerMode: hash
---

<div class="cover-grid">
  <div class="cover-copy">
    <p class="cover-eyebrow">Manasija</p>
    <h1>Designing a <span>token-efficient</span> MCP server</h1>
    <p class="cover-subtitle">A lesson from Drishti</p>
  </div>
  <div class="speaker-lockup">
    <strong>Jnanesh and Deion Dsouza</strong>
    <span class="cover-brand"><img src="/manasija.svg" alt="">Manasija</span>
  </div>
</div>

<!--
Speaker affiliation: https://in.linkedin.com/in/jtuluve
-->

---
class: part-slide
---

<div class="part-num">Part 00</div>
<h1>Introduction to MCP</h1>
<p class="part-desc">How AI apps connect with external tools and market data</p>

---
class: mcp-intro-slide
---

# MCP standardizes how AI apps connect

<div class="basics-connection">
  <div class="basics-node">
    <span>AI app</span>
    <strong>Claude · Codex</strong>
    <small>The assistant you use</small>
  </div>
  <div class="basics-bridge">
    <img src="/mcp-mark.svg" alt="Model Context Protocol logo">
    <span>MCP</span>
  </div>
  <div class="basics-node basics-server">
    <span>MCP server</span>
    <strong>Tools · data</strong>
    <small>What the assistant can reach</small>
  </div>
</div>

<p class="basics-definition">Model Context Protocol · one shared way to find and use tools and data.</p>

<!--
MCP architecture: https://modelcontextprotocol.io/docs/learn/architecture
Official MCP logo: https://modelcontextprotocol.io/favicon.svg
-->

---
class: mcp-tool-intro-slide
---

# Tools let the assistant do things

<div class="basics-tool-flow">
  <div class="basics-tool-step">
    <span><ph-chat-circle-light class="ph-icon" aria-hidden="true" /> Question</span>
    <strong>What changed after earnings?</strong>
  </div>
  <div class="basics-tool-step">
    <span><ph-wrench-light class="ph-icon" aria-hidden="true" /> Tool call</span>
    <strong>Look up the filing</strong>
    <small><code>get_earnings_filing</code></small>
  </div>
  <div class="basics-tool-step">
    <span><ph-stack-light class="ph-icon" aria-hidden="true" /> Result</span>
    <strong>Earnings data</strong>
  </div>
</div>

<p class="basics-tool-note">The app asks; the server does the work and sends data back.</p>

<!--
MCP tool discovery and calling: https://modelcontextprotocol.io/docs/learn/architecture
Illustrative request, not a live market answer.
-->

---
class: product-slide
---

<div class="product-heading">
  <img src="/drishti-logo-mark.svg" alt="">
  <h1><img src="/drishti-word-mark.svg" alt="Drishti"></h1>
</div>
<p class="product-subtitle">The product behind the method</p>

<div class="product-layout">
  <div class="product-copy">
    <p>Indian-market events, structured for agents.</p>
    <p class="product-detail">Filings, earnings, concalls and news arrive as dated records your agent can inspect.</p>
    <div class="product-interfaces">
      <span><ph-brackets-curly-light class="ph-icon" aria-hidden="true" /> REST APIs</span>
      <span><ph-plugs-connected-light class="ph-icon" aria-hidden="true" /> WebSockets</span>
      <span><ph-plugs-light class="ph-icon" aria-hidden="true" /> MCP</span>
    </div>
  </div>
  <div class="product-visual">
    <img src="/drishti-earnings-preview.jpg" alt="Drishti earnings data and API response preview">
  </div>
</div>

<!--
Product facts: https://drishti.manasija.in
Drishti MCP docs: https://drishti.manasija.in/docs/guides/drishti-mcp
Official logo mark, wordmark, and product preview: https://drishti.manasija.in/logo-mark.svg, https://drishti.manasija.in/word-mark.svg, and https://drishti.manasija.in/og-home.jpg
-->

---
class: part-slide
---

<div class="part-num">Part 01</div>
<h1>The Problem</h1>
<p class="part-desc">How tool definitions inflate prompt context and token costs</p>

---
class: mcp-slide
---

# Tool lists add prompt cost

<div class="protocol-stage">
  <div class="protocol-endpoint protocol-host">
    <span>Host</span>
    <strong>Claude, Codex,<br>your agent</strong>
  </div>

  <div class="protocol-messages">
    <div v-click="1" class="protocol-message to-server" aria-label="tools/list request from host to server">
      <code>tools/list</code>
      <span class="protocol-arrow" aria-hidden="true"></span>
      <span class="protocol-direction">request</span>
    </div>
    <div v-click="2" class="protocol-message to-client" aria-label="Tool definitions response from server to host">
      <span class="protocol-direction">response</span>
      <span class="protocol-arrow" aria-hidden="true"></span>
      <code>tools[]</code>
    </div>
  </div>

  <div class="protocol-endpoint protocol-server">
    <span>Server</span>
    <strong>Drishti MCP</strong>
  </div>
</div>

<div class="protocol-points">
  <p v-click="2" class="protocol-point"><ph-stack-light class="ph-icon" aria-hidden="true" /> All tool definitions are loaded into context upfront.</p>
  <p v-click="3" class="protocol-problem"><ph-warning-circle-light class="ph-icon" aria-hidden="true" /> Most requests need a few tools. Many clients load them all.</p>
</div>

<!--
MCP architecture and tools/list behavior: https://modelcontextprotocol.io/docs/learn/architecture
Current Drishti tool catalog: https://drishti.manasija.in/docs/guides/drishti-mcp#available-mcp-tools
The 2–4 tool observation comes from our Drishti development experience documented at https://jtuluve.is-a.dev/articles/designing-token-efficient-mcp-server
-->

---
class: result-slide
---

# Initial tool context

<div class="token-comparison">
  <div class="token-before">
    <span class="token-label">All schemas loaded</span>
    <strong>7,500<span>+</span></strong>
    <div class="meter meter-before"><i></i></div>
  </div>
  <div class="collapse-mark">÷ 27</div>
  <div class="token-after">
    <span class="token-label">Discovery tools only</span>
    <strong>≈280</strong>
    <div class="meter meter-after"><i></i></div>
  </div>
</div>

<p class="result-note"><b>≈1,000&nbsp;tokens</b> after loading schemas for 2–3 relevant tools.</p>

<!--
These are measurements from the Drishti MCP implementation, documented in:
https://jtuluve.is-a.dev/articles/designing-token-efficient-mcp-server
7,500 / 280 ≈ 26.8, shown as ÷27 for a visual comparison.
-->

---
class: meme-slide
---

<div class="meme-stage-double">
  <div class="meme-item">
    <img src="/llms-overloaded.gif" alt="A confused turtle with the caption LLMs probably">
  </div>
  <div v-click class="meme-item">
    <img src="/moneydownthedrain-ezgif.com-added-text (1).gif" alt="Money down the drain meme">
  </div>
</div>

<!--
Memes capturing prompt bloat and wasted tokens.
-->

---
class: part-slide
---

<div class="part-num">Part 02</div>
<h1>The Solution</h1>
<p class="part-desc">Designing a token-efficient discovery server in Drishti</p>

---
class: clue-slide
---

# Claude’s tool search

<div class="clue-layout">
  <div class="terminal">
    <div class="terminal-top"><i></i><i></i><i></i></div>
    <p><span class="prompt">user</span> Summarize recent market news</p>
    <p v-click><span class="prompt assistant">claude</span> search_tools("news")</p>
    <p v-click class="terminal-result">Loaded 1 Drishti tool:<br><b>Drishti:get_news</b></p>
  </div>
  <div class="clue-copy" v-click>
    <strong>One matching definition enters context.</strong>
    <p>The rest stay unloaded.</p>
    <span>Client-side optimization<br>not part of MCP itself</span>
  </div>
</div>

<!--
Claude Tool Search behavior: https://www.anthropic.com/engineering/advanced-tool-use
Our observation and example: https://jtuluve.is-a.dev/articles/designing-token-efficient-mcp-server
-->

---
class: tool-design-slide
---

# Our approach in Drishti

<div class="three-tools">
  <div class="tool-row">
    <span><ph-magnifying-glass-light class="ph-icon" aria-hidden="true" /></span>
    <code>search_tools</code>
    <p>Names and short descriptions</p>
  </div>
  <div class="tool-row">
    <span><ph-list-magnifying-glass-light class="ph-icon" aria-hidden="true" /></span>
    <code>describe_tools</code>
    <p>Full schemas for selected tools</p>
  </div>
  <div class="tool-row">
    <span><ph-play-light class="ph-icon" aria-hidden="true" /></span>
    <code>execute_tool</code>
    <p>Tool name plus arguments</p>
  </div>
</div>

<p class="design-caption">Discovery stays small. Capability stays complete.</p>

<!--
Design and tool definitions: https://jtuluve.is-a.dev/articles/designing-token-efficient-mcp-server
Related progressive-disclosure pattern: https://www.anthropic.com/engineering/code-execution-with-mcp
-->

---
class: trace-slide
---

# One question. One narrow path.

<div class="trace-question">“What changed in RELIANCE after its latest earnings?”</div>

<div class="trace-line">
  <div class="trace-step" v-click>
    <span><ph-magnifying-glass-light class="ph-icon" aria-hidden="true" /></span>
    <code>search_tools</code>
    <small>“earnings + announcements”</small>
  </div>
  <div class="trace-step" v-click>
    <span><ph-list-magnifying-glass-light class="ph-icon" aria-hidden="true" /></span>
    <code>describe_tools</code>
    <small>2 matching schemas</small>
  </div>
  <div class="trace-step" v-click>
    <span><ph-play-light class="ph-icon" aria-hidden="true" /></span>
    <code>execute_tool</code>
    <small>fresh Drishti records</small>
  </div>
  <div class="trace-step final-step" v-click>
    <span><ph-check-circle-light class="ph-icon" aria-hidden="true" /></span>
    <code>answer</code>
    <small>dated, checkable context</small>
  </div>
</div>

<!--
Drishti earnings and announcement tools: https://drishti.manasija.in/docs/guides/drishti-mcp#available-mcp-tools
This is an illustrative request trace, not a live market answer.
-->

---
class: part-slide
---

<div class="part-num">Part 03</div>
<h1>Tradeoffs and guidance</h1>
<p class="part-desc">Evaluating performance savings and real-world applicability</p>

---
class: tradeoff-slide
---

# The tradeoff

<div class="tradeoff-scale">
  <div class="tradeoff-side savings">
    <span><ph-stack-light class="ph-icon" aria-hidden="true" /> Context</span>
    <strong>~7,200 fewer<br>initial&nbsp;tokens</strong>
    <p>Less schema noise gives the model more room for the actual research.</p>
  </div>
  <div class="tradeoff-divider">
    <i></i>
    <b>vs</b>
  </div>
  <div class="tradeoff-side latency">
    <span><ph-clock-light class="ph-icon" aria-hidden="true" /> Latency</span>
    <strong>1–2 extra<br>discovery calls</strong>
    <p>The agent searches and loads definitions before execution.</p>
  </div>
</div>

<!--
Measured context savings: https://jtuluve.is-a.dev/articles/designing-token-efficient-mcp-server
Anthropic also describes the extra-search-step tradeoff: https://www.anthropic.com/engineering/advanced-tool-use
-->

---
class: meme-slide
---

<div class="meme-stage">
  <img src="/cost-vs-latency.png" alt="Cost vs Latency meme">
</div>

---
class: fit-slide
---

# When discovery helps

<div class="fit-spectrum">
  <div class="fit-marker" style="left: 13%"><i></i><b>Compact catalog</b><span>Keep tools direct</span></div>
  <div class="fit-marker active" style="left: 64%"><i></i><b>10+ tools</b><span>Discover on demand</span></div>
  <div class="fit-marker active" style="left: 87%"><i></i><b>&gt;10K schema tokens</b><span>Strongest payoff</span></div>
</div>

<div class="fit-guidance">
  <p><b><ph-check-circle-light class="ph-icon" aria-hidden="true" /> Good fit</b> Large catalog, expensive schemas, few tools per request</p>
  <p><b><ph-x-circle-light class="ph-icon" aria-hidden="true" /> Weak fit</b> Small catalog or every tool appears in most sessions</p>
</div>

<!--
Threshold guidance: https://www.anthropic.com/engineering/advanced-tool-use
Anthropic recommends Tool Search especially for 10+ tools or more than 10K tokens of definitions, and notes it is less useful for small libraries.
-->

---
class: demo-slide
---

# Try it with Drishti

<div class="demo-prompt">
  <span><ph-chat-circle-light class="ph-icon" aria-hidden="true" /> Ask</span>
  <p>Compare the latest earnings and announcements for <b>RELIANCE</b> and <b>TCS</b>.</p>
  <p>What changed? Cite the Drishti records behind each answer.</p>
</div>

<div class="demo-footer">
  <span>mcp.drishti.manasija.in</span>
  <b><ph-shield-check-light class="ph-icon" aria-hidden="true" /> Fresh records produce a checkable answer</b>
</div>

<!--
Demo prompt adapted from the official Drishti MCP verification guide:
https://drishti.manasija.in/docs/guides/drishti-mcp#verify-the-connection
-->

---
class: end-slide
---

<h1 class="end-title">Questions?</h1>

<div class="end-content">
  <div class="end-qr-col">
    <img src="/drishti-qr.png" alt="Drishti QR Code" class="end-qr-code">
  </div>
  <div class="end-links">
    <div><span><ph-globe-simple-light class="ph-icon" aria-hidden="true" /> Product</span> drishti.manasija.in</div>
    <div><span><ph-newspaper-light class="ph-icon" aria-hidden="true" /> Article</span> jtuluve.is-a.dev/articles/…</div>
    <div><span><ph-users-light class="ph-icon" aria-hidden="true" /> Speakers</span> /in/jtuluve&nbsp;&nbsp; /in/deiondz</div>
  </div>
</div>

<!--
Drishti: https://drishti.manasija.in
Article: https://jtuluve.is-a.dev/articles/designing-token-efficient-mcp-server
Speakers: https://in.linkedin.com/in/jtuluve and https://in.linkedin.com/in/deiondz
-->

---
class: speaker-slide
---

<h1 class="speakers-title">Thank you ;D</h1>

<div class="speakers-grid">
  <article class="speaker-card">
    <div class="speaker-photo">
      <img src="/jnanesh.png" alt="Portrait of Jnanesh">
    </div>
    <div class="speaker-card-copy">
      <h2>Jnanesh</h2>
      <p class="speaker-role">Software Engineer, Manasija</p>
    </div>
    <div class="speaker-links">
      <a href="https://jtuluve.is-a.dev">
        <ph-globe-simple-light class="ph-icon" aria-hidden="true" />
        jtuluve.is-a.dev
      </a>
      <a href="https://www.linkedin.com/in/jtuluve/">
        <ph-linkedin-logo-light class="ph-icon" aria-hidden="true" />
        linkedin.com/in/jtuluve
      </a>
    </div>
  </article>

  <article class="speaker-card">
    <div class="speaker-photo">
      <img src="/deion.jpg" alt="Portrait of Deion Dsouza">
    </div>
    <div class="speaker-card-copy">
      <h2>Deion Dsouza</h2>
      <p class="speaker-role">Dev Relations Engineer, Manasija</p>
    </div>
    <div class="speaker-links">
      <a href="https://www.linkedin.com/in/deiondz/">
        <ph-linkedin-logo-light class="ph-icon" aria-hidden="true" />
        linkedin.com/in/deiondz
      </a>
      <a href="https://x.com/Deion_Dz">
        <ph-x-logo-light class="ph-icon" aria-hidden="true" />
        x.com/Deion_Dz
      </a>
    </div>
  </article>
</div>
