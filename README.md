# MetaMask Clone — Next.js + Framer Motion + Lenis

A premium landing page inspired by MetaMask's design system, built with Next.js 15, Framer Motion, and Lenis smooth scroll.

## Stack
- **Next.js 15** (App Router)
- **Framer Motion** — scroll-driven animations, stagger reveals, parallax
- **Lenis** — buttery smooth scroll (the same library metamask.io uses)
- **Canvas API** — WebGL-style animated particle field in the hero
- **Tailwind CSS** — utility-first styling with custom design tokens

## Features
- 🦊 Animated MetaMask Fox with floating coin badges
- ✨ Canvas particle field hero background
- 🎞️ Lenis smooth scroll (identical to lenis.dev implementation on metamask.io)
- 📌 Pinned horizontal scroll "How It Works" section
- 🎯 Scroll-triggered reveals on every section
- 🔄 Infinite marquee ticker for tokens + networks
- 🌀 Rotating orbit rings in the Security section
- 🎨 MetaMask design tokens: colors, radius, motion durations
- 📱 Fully responsive (mobile-first)
- ♿ WCAG 2.2 AA focus-visible, semantic HTML

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Build

```bash
npm run build
npm start
```

## Design Tokens Used
| Token | Value |
|-------|-------|
| color.surface.base | #000000 |
| color.surface.strong | #190066 |
| color.text.primary | #0a0a0a |
| radius.lg | 30.75px |
| radius.2xl | 87.85px |
| motion.duration.step7 | 750ms |
| motion.duration.step8 | 950ms |

## Sections
1. **Navbar** — sticky, blur-on-scroll, mobile menu
2. **Hero** — canvas particles, floating fox + coins, parallax on scroll
3. **Features** — 4-card grid with glass cards, scroll reveals
4. **Networks** — infinite token tickers, stats row
5. **How It Works** — pinned scroll with staggered card reveals
6. **Security** — rotating orbit animation, security pillars
7. **Developer** — live code block, SDK cards
8. **Footer** — full site footer + CTA

## Customize
Edit `app/globals.css` `:root` variables to retheme instantly.
