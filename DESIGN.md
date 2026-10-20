---
name: Warm Editorial Craft
colors:
  surface: '#faf9fb'
  surface-dim: '#dbd9dc'
  surface-bright: '#faf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f5'
  surface-container: '#efedf0'
  surface-container-high: '#e9e8ea'
  surface-container-highest: '#e3e2e4'
  on-surface: '#1b1c1e'
  on-surface-variant: '#414844'
  inverse-surface: '#2f3032'
  inverse-on-surface: '#f2f0f3'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#2c694e'
  on-secondary: '#ffffff'
  secondary-container: '#aeeecb'
  on-secondary-container: '#316e52'
  tertiary: '#382100'
  on-tertiary: '#ffffff'
  tertiary-container: '#563400'
  on-tertiary-container: '#d59a4e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#b1f0ce'
  secondary-fixed-dim: '#95d4b3'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#0e5138'
  tertiary-fixed: '#ffddb7'
  tertiary-fixed-dim: '#fabb6a'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf9fb'
  on-background: '#1b1c1e'
  surface-variant: '#e3e2e4'
typography:
  display-hero:
    fontFamily: Newsreader
    fontSize: 3.5rem
    fontWeight: '400'
    lineHeight: 4rem
    letterSpacing: -0.025em
  display-hero-mobile:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '400'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '500'
    lineHeight: 2.75rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.125rem
    letterSpacing: 0.02em
  label-meta:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

This design system expresses the credibility, depth, and restraint of a senior backend-focused engineer. It combines the measured precision of classic literary publication with the clarity of modern engineering documentation. The aesthetic rejects flash-in-the-pan tropes—such as neon glow effects, artificial CRT terminals, or gratuitous glassmorphic blurs—in favor of deliberate typographic hierarchy, tactile parchment warmth, and quiet architectural framing.

The intended emotional response is immediate confidence: recruiters and technical directors should perceive maturity, deep architectural focus, and impeccable attention to detail within seconds of landing on the interface.

Key aesthetic principles:
- **Quiet Authority:** Premium editorial typography anchors content, signaling intellectual discipline.
- **Warm Tactility:** Surfaces evoke heavy archival paper and milled stone rather than cold, clinical digital white.
- **Precision Metrology:** Technical credentials, timestamps, architectural metrics, and stack tags are set with monospaced clarity to enable effortless parsing by hiring teams.

## Colors

The palette is rooted in an archival, editorial baseline. The primary surface is warm parchment (`#FBFBF9`), avoiding the eye fatigue of pure `#FFFFFF` while creating natural contrast with deep charcoal typography (`#1C1D1F`). 

Accent colors are drawn from botanical and mineral sources:
- **Primary (`#1B4332`):** Deep heritage forest green used for primary calls to action, selected interactive states, and key architectural callouts.
- **Secondary (`#2D6A4F`):** Muted emerald used for supporting metadata, subheadings, and secondary interactive borders.
- **Tertiary (`#8F5E15`):** Muted warm amber used strictly for status flags, production indicators, and live pipeline badges.
- **Neutral Foreground (`#1C1D1F`):** Deep charcoal for primary reading copy; secondary copy sits at `#4A4B4E`.
- **Borders & Dividers:** Warm stone (`#E5E4DE`) and muted parchment rule lines (`#DCDAD2`) partition content without visual noise.

## Typography

Typographic hierarchy relies on the tension between three distinct typefaces, each serving a specific communicative role:

1. **Newsreader (Display & Headlines):** An authoritative editorial serif with optical sizing qualities that lend literary elegance to personal statements, project titles, and section markers.
2. **Inter (Body & Functional Copy):** A clean, neutral workhorse that delivers effortless legibility for dense technical narratives, architecture rationale, and project case studies.
3. **JetBrains Mono (Metadata & Technical Data):** A monospaced typeface that handles infrastructure metrics, tech stacks, timestamps, git commits, and architectural attributes.

Always maintain strict casing conventions: editorial headlines use sentence case or title case; monospaced labels and tags are set in uppercase with slight positive letter spacing (`0.05em`).

## Layout & Spacing

The layout operates on a 12-column grid bound to a maximum reading width of 1120px to preserve comfortable scan lengths for engineering recruiters. 

- **Desktop (>= 1024px):** 12-column structure with `gutter-desktop` (2.5rem) and generous section padding (`space-3xl` between major topical zones). Asymmetrical compositions are favored—e.g., 4 columns for sticky contextual metadata and 8 columns for narrative case study content.
- **Tablet (768px - 1023px):** 8-column structure with `gutter` (1.5rem), collapsing complex side-by-side data into stacked linear modules.
- **Mobile (< 768px):** 4-column structure with `margin` (1.25rem) edge-to-edge padding, maintaining minimum 44px tap targets while preserving compact technical tag density.

Vertical rhythm is strictly disciplined: component interiors use small tokens (`space-xs` to `space-md`), while semantic blocks deploy `space-xl` through `space-3xl` to create unhurried, editorial breathing room.

## Elevation & Depth

Visual depth is achieved through structural demarcation and subtle tonal contrast rather than layered dropshadows or floating cards. 

- **Low-Contrast Outlines & Rules:** Surfaces sit on the parchment ground (`#FBFBF9`), framed by 1px solid stone borders (`#E5E4DE`). Fine hairline rules separate chronological experience items and list entries.
- **Tonal Inset Surfaces:** Elevated modules (such as architecture schematics, code snippets, or system throughput figures) utilize a slightly deeper parchment tint (`#F4F3EE`) with crisp hairline borders, never drop shadows.
- **Interactive State Depth:** When interactive elements (such as project cards) are hovered, elevation is communicated by a border shift to `#2D6A4F` and an ultra-subtle, non-diffuse ambient warm tint (`rgba(27, 67, 50, 0.04)`), maintaining the printed editorial character of the page.

## Shapes

The design system employs a soft, tailored geometry (level 1 / `0.25rem` base border radius). 

Corners remain structured and architecturally sound, avoiding the playful, consumer feel of pill shapes or high border radii. Standard cards, inputs, and interactive surfaces carry a subtle 4px radius (`0.25rem`), which softens raw corners without softening the technical posture. Badges and tags inherit either a strict 2px radius or remain sharp with 1px framing, reflecting the precision of a printed technical document.

## Components

### Buttons
- **Primary:** Background `#1B4332`, text `#FBFBF9`, 1px border `#0F382A`. Border radius `0.25rem`. Padding: `0.625rem 1.25rem`. Typography: `Inter` 600, 0.875rem. Hover: background shifts to `#2D6A4F`.
- **Secondary / Outline:** Background transparent, text `#1C1D1F`, 1px border `#DCDAD2`. Hover: background `#F4F3EE`, border `#1B4332`.
- **Tertiary / Text:** Unbordered, text `#1B4332`, inline underline with 2px offset; hover color `#2D6A4F`.

### Technical Badges & Chips
- **Stack Tag:** Background `#F4F3EE`, border 1px solid `#E5E4DE`, text `#2B2C2F`. Font: `JetBrains Mono`, 0.75rem. Padding: `0.25rem 0.5rem`.
- **Live Status Chip:** Background `rgba(27, 67, 50, 0.08)`, border 1px solid `rgba(27, 67, 50, 0.25)`, text `#1B4332`. Preceded by a 6px solid emerald dot.

### Project & Experience Cards
- Built with a flat surface on `#FBFBF9`, bounded by a 1px solid `#E5E4DE` border.
- Internal spacing uses `space-lg` (1.5rem).
- Title set in `Newsreader` (headline-md), paired with a `JetBrains Mono` timestamp and role descriptor positioned above the headline.
- Technical specifications and outcomes are listed with subtle bullet dividers or a structured sub-grid rather than generic marketing blurbs.

### Architecture Callout & Code Blocks
- Background `#F4F3EE`, border 1px solid `#DCDAD2`, corner radius `0.25rem`.
- Code and directory trees use `JetBrains Mono` at `0.8125rem` with deep charcoal text and emerald syntax accents for keywords and endpoints.
- Margin bottom aligned strictly to `space-md`.

### Form Controls & Inputs
- Text inputs use background `#FBFBF9`, border 1px solid `#DCDAD2`, text `#1C1D1F`.
- Focused state: 1px border `#1B4332` with a 1px outline offset in `rgba(27, 67, 50, 0.15)`.
- Labels are rendered in `Inter` 500 at `0.8125rem` with companion hint text in `body-sm`.