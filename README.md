# Jaymaxcklien — Personal Portfolio

A responsive personal portfolio presenting three connected dimensions:

- **Technology** — systems analysis, business applications, software projects and digital transformation.
- **Leadership** — people, programmes, coordination and community involvement.
- **Communication** — emcee engagements, public speaking, hosting and podcast conversations.

## Stack

- React 19 + TypeScript 5 + TSX + Vite
- Framer Motion and Lucide React
- Plain CSS with responsive design tokens
- Strict TypeScript checking (`npm run typecheck`)
- GitHub REST API for public repository discovery

## Local development

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run typecheck
npm run build
npm run preview
```

## Deployment: Cloudflare Pages

This repository is configured for Cloudflare Pages Git integration.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | 22 |

Pushes to `main` trigger the production build/deployment when the Cloudflare Pages Git integration is active. Pull requests and other branches can use preview deployments.

Cloudflare setup guide: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/

## Content and privacy

The site is designed to avoid publishing internal employer information, confidential business processes, private repositories or unapproved event media. Review all public-facing employment and leadership descriptions before sharing the site widely.

Update profile content in `src/data/profile.ts` and add approved media under `public/media/`.

## Remaining content tasks

- [ ] Add an approved professional portrait and approved event photographs/videos.
- [ ] Confirm public contact details and social profile URLs.
- [ ] Review all employment and leadership descriptions for publication approval.
- [ ] Add a social preview image and final canonical URL metadata after confirming the production domain.
