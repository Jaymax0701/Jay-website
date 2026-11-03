# Jaymaxcklien — Personal Portfolio

A responsive personal portfolio presenting three connected dimensions:

- **Technology** — systems analysis, business applications, software projects and digital transformation.
- **Leadership** — people, programmes, coordination and community involvement.
- **Communication** — emcee engagements, public speaking, hosting and podcast conversations.

## Stack

- React 19 + TypeScript 5 + TSX + Vite
- Framer Motion
- Lucide React
- Plain CSS with responsive design tokens
- Strict TypeScript checking (`npm run typecheck`)
- GitHub REST API for public repository discovery

## Local development

```bash
npm install
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Deployment: Cloudflare Pages

Connect this repository to Cloudflare Pages using Git integration.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | 22 |

Every push to `main` can trigger a production deployment. Pull requests and other branches can use preview deployments.

Cloudflare setup guide: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/

## Content and privacy

The site intentionally avoids publishing internal employer information, confidential business processes, private repositories or unapproved event media. Update the content in `src/data/profile.ts` and add approved media under `public/media/`.

## Before launch

- [ ] Add an approved professional portrait.
- [ ] Add approved emcee and leadership event photographs/videos.
- [ ] Confirm public contact details and social profile URLs.
- [ ] Review all employment and leadership descriptions for publication approval.
- [ ] Connect Cloudflare Pages and configure a custom domain if desired.
- [ ] Add a site preview image and final SEO metadata.
