<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

<use_interesting_fonts>
Typography instantly signals quality. Avoid using boring, generic fonts.

**Never use:** Inter, Roboto, Open Sans, Lato, default system fonts

**Impact choices:**
- Code aesthetic: JetBrains Mono, Fira Code, Space Grotesk
- Editorial: Playfair Display, Crimson Pro, Fraunces
- Startup: Clash Display, Satoshi, Cabinet Grotesk
- Technical: IBM Plex family, Source Sans 3
- Distinctive: Bricolage Grotesque, Obviously, Newsreader

**Pairing principle:** High contrast = interesting. Display + monospace, serif + geometric sans, variable font across weights.

**Use extremes:** 100/200 weight vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x.

Pick one distinctive font, use it decisively. Load from Google Fonts. State your choice before coding.
</use_interesting_fonts>

<design_concept>
Theme: Warm Editorial Codex (book-like, calm but distinctive)
Core idea: Paper-first reading experience + Liquid Glass as annotation/tooling layer (never as content surface).
Mood keywords: vellum paper, amber ink, brass bookmark, quiet sunlight, marginalia.
</design_concept>

<typography>
Pick distinctive fonts (no Inter/Roboto/system).
Use a high-contrast pairing:
- Display/Editorial Serif: "Fraunces" (variable, expressive; headings)
- Text Serif: "Crimson Pro" (comfortable long-form reading; body)
- Code Mono: "JetBrains Mono" (code only)
Rules:
- H1/H2 use Fraunces with extreme weights (200/900). Body stays 400/500 in Crimson Pro.
- Size jumps: H1 is 3x body or more. Use generous line-height in body for legibility.
Load from Google Fonts and state the choice before coding.
</typography>

<color_theme>
Commit to a warm, cohesive palette with sharp accents (avoid timid pastels).
Define CSS variables and use them consistently.

:root (Light / Paper):
--bg: #F6F0E6;          <!-- warm vellum -->
--surface: #FFF8EF;     <!-- paper card -->
--surface-2: #F1E7D8;   <!-- separators / subtle panels -->
--text: #1C1A16;        <!-- deep ink -->
--muted: #5D564C;       <!-- marginal notes -->
--border: rgba(28,26,22,0.12);

Accents (sharp, purposeful):
--accent: #C56A2B;      <!-- burnt orange / brass -->
--accent-2: #2A6F6A;    <!-- deep teal (sparingly) -->
--link: #B84E1B;        <!-- warm link -->
--focus: #2A6F6A;

Shadows:
--shadow: 0 10px 30px rgba(28,26,22,0.10);

Dark mode (optional but recommended):
--bg: #14110C;
--surface: #1B160F;
--text: #F4EBDD;
--muted: #B8AD9D;
--accent: #E08A3C;
--accent-2: #4BB6AE;

Background atmosphere:
- Use layered CSS gradients + subtle paper grain pattern (no loud noise).
- Add a faint “page edge” vertical gradient near content column to imply book margin.
</color_theme>

<liquid_glass_policy>
Liquid Glass must be rare, purposeful, and NEVER behind long text.

GLASS ALLOWED (apply liquid glass styles here):
1) Top navigation bar (only the bar; nav text remains solid for contrast)
2) Floating Table of Contents / “On this page” (compact panel)
3) Tag/filter chips row (short labels only)
4) Footnote/annotation popovers and marginalia tooltips
5) Command palette / search overlay / settings drawer
6) Reading progress indicator / bookmark marker (thin element)

GLASS FORBIDDEN (do NOT apply glass here):
1) Main article body container (must be solid paper surface)
2) Paragraph backgrounds, blockquotes, long-form callouts
3) Code blocks and inline code backgrounds
4) Any surface containing more than ~2 lines of text
5) Cards in article list that include excerpts longer than one line

GLASS QUANTITY RULE:
- At most 1 glass panel visible at once in reading mode.
- Glass appears on interaction (hover/focus/open) and recedes when reading.

GLASS PARAMETERS (keep subtle):
- backdrop-filter: blur(6px) saturate(1.2)
- background: rgba(255, 248, 239, 0.65) in light; rgba(27, 22, 15, 0.55) in dark
- border: 1px solid rgba(255,255,255,0.25) (light) / rgba(255,255,255,0.10) (dark)
- shadow: subtle, never neon
- Prefer slight warm tint (amber) rather than cold blue glass.
</liquid_glass_policy>

<layout_system>
Reading-first layout:
- Single main column with generous margins, like a book page.
- Wide outer margins reserved for marginalia; on mobile, marginalia collapses into bottom sheet.
- Use a visible “chapter header” pattern: small caps label + big title + thin rule.

Components:
- Article page: solid paper surface for content, with clear typographic hierarchy.
- Index page: grid of “paper cards” with very short excerpts; metadata can use small glass pill.
- Sidebar (desktop): solid surface; only floating TOC uses glass.

Do not use cookie-cutter cards everywhere; make it feel like a designed publication.
</layout_system>

<motion>
One orchestrated, high-impact load:
- Staggered reveal: title -> meta -> hero ornament -> first paragraph.
- Use subtle parallax or gradient drift in background (very low amplitude).
Micro-interactions:
- Glass panels “breathe” on open/close (opacity + blur transitions).
- Links underline animate like ink (stroke/width).
Avoid scattered gratuitous animations.
</motion>

<accessibility>
- Maintain contrast: glass text must remain fully legible (use solid text color, not translucent).
- Respect prefers-reduced-motion.
- Focus ring uses --focus color with visible outline.
</accessibility>

<implementation_notes>
- Use CSS variables for all colors.
- Add utility classes: .paper-surface, .paper-card, .glass-panel, .marginalia, .bookmark-marker.
- Ensure code blocks are strictly solid (surface-2) with crisp border and no blur behind them.
</implementation_notes>
