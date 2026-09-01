# Ora — landing page

Landing page for **Ora**, a fictional single-model wireless speaker brand. Built as a
design-engineering portfolio piece: the speaker, the workshop and the price are invented, and
nothing on the page is for sale.

- **Style family:** Tenebrism — chiaroscuro. One warm light source per section, everything else
  falling off to near-black, inset vignettes on every photograph. Brass (`#c2a35c`) on bone
  (`#f3e6c8`), no second accent.
- **Type:** Fraunces (display serif) + Public Sans (body).
- **Motion:** deliberately quiet. A 14-second breathing highlight over the hero so a still
  photograph does not read as a dead page, 500 ms scroll reveals, and a detail viewer whose
  crossfade carries a 3px blur — without it you see two photographs overlapping instead of one
  view becoming another.
- **Interactive:** a three-way detail viewer (cone, port, in the room).

Product photography is deliberately unbranded: shots with a visible manufacturer's mark were
rejected rather than passed off as Ora's own product.

## Stack

Next.js 16 · React 19 · Tailwind CSS v4 · Motion. No backend.

## Imagery

Unsplash: Alexey Demidov, Scott Major, Max Anderson, Michael C.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
