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

## Product and engineering approach

- Product strategy, research, information architecture, UX/UI, and service design.
- Bilingual content architecture with route-preserving locale switching.
- Accessible semantic interfaces tested with Playwright and Axe.
- Responsive behavior validated from 360 px through 1920 px.
- Static Next.js export designed for GitHub Pages.
- No analytics, cookies, forms, or persistent user data in the current release.

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
```

The public project links currently point to approved external repository evidence while the full internal case-study pages continue through their own design and QA gates.

