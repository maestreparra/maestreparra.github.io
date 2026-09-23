# Giomar Maestre — Product Designer & UX Engineer

Bilingual professional portfolio focused on end-to-end Product Design, UX Engineering, GovTech, digital services, accessible interfaces, and evidence-based delivery.

## Live portfolio

[maestreparra.github.io](https://maestreparra.github.io/)

Spanish is the default language. English is available through explicit localized routes.

## Current public routes

| Spanish | English |
|---|---|
| `/es/` | `/en/` |
| `/es/sobre-mi/` | `/en/about/` |
| `/es/proyectos/` | `/en/work/` |
| `/es/contacto/` | `/en/contact/` |
| `/es/proyectos/vitalink-digital-ecosystem/` | `/en/work/vitalink-digital-ecosystem/` |
| `/es/proyectos/bm-envios-digital-experience/` | `/en/work/bm-envios-digital-experience/` |
| `/es/proyectos/licendi-ecommerce-brand-experience/` | `/en/work/licendi-ecommerce-brand-experience/` |
| `/es/proyectos/meeco-renewable-energy-website/` | `/en/work/meeco-renewable-energy-website/` |
| `/es/proyectos/pilotorb-business-intelligence/` | `/en/work/pilotorb-business-intelligence/` |
| `/es/proyectos/appliedxl-ai-data-platform/` | `/en/work/appliedxl-ai-data-platform/` |

## Product and engineering approach

- Product strategy, research, information architecture, UX/UI, and service design.
- Bilingual content architecture with route-preserving locale switching.
- Accessible semantic interfaces tested with Playwright and Axe.
- Responsive behavior validated from 360 px through 1920 px.
- Progressive evidence disclosure on documented case studies: a concise selection is visible on first scan, with the remaining authorized evidence available behind a keyboard-operable, bilingual `<details>` control — nothing is deleted, only re-prioritized for a faster first read.
- Portfolio-owned Open Graph/Twitter preview cards for every route.
- Static Next.js export designed for GitHub Pages.
- No analytics, cookies, forms, or persistent user data in the current release.

## Evidence and privacy disclosure

Case studies fall into two groups:

- **Real, authorized evidence** (Licendi, MEECO, PilotOrb, AppliedXL): screens taken directly from each project's design files, shown with the authorizing party named. Where the evidence is a pre-final iteration rather than the client's final approved delivery, the case says so explicitly, and states that the live product may have evolved since. No case reproduces real customer, financial, clinical, or scientific data; AppliedXL's internal product/workstream and example content are additionally anonymized as "XYZ" inside the authorized evidence, independent of the publicly named engagement.
- **Independent projects** (VitaLink, BM Envíos): self-directed work with public repository evidence.

No case claims ownership of current production code, accessibility certification, or business outcomes (conversion, traffic, adoption) that were not measured for publication.

## Technology

- Next.js 16
- React 19
- TypeScript in strict mode
- CSS Modules and design tokens
- Vitest
- Playwright
- GitHub Actions and GitHub Pages

## Local development

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

## Validation

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test -- --run
corepack pnpm build
CI=1 corepack pnpm test:e2e
corepack pnpm audit --audit-level=high
corepack pnpm audit --prod --audit-level=high
```

VitaLink and BM Envíos include bilingual internal case studies with explicit links to their approved public repository evidence. BM Envíos remains transparently identified as being in final refinement. Licendi, MEECO, PilotOrb, and AppliedXL are documented cases built from real, authorized design evidence — see [Evidence and privacy disclosure](#evidence-and-privacy-disclosure) above.
