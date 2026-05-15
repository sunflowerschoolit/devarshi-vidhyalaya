# Sanity CMS setup for Devarshi Vidhyalaya Website

This folder includes schema definitions for:
- Hero slider content (`heroSlide`)
- School updates (`schoolUpdateItem`) for both News + Activities
- Events (`eventItem`)
- Photo/Video gallery (`galleryItem`)
- Management/team members (`teamMember`)
- Global site settings (`siteSettings`) for things like form recipient email

## 1) Install dependencies

In your Next.js app (for frontend data fetching):

```bash
npm i next-sanity groq @sanity/image-url
```

In your Sanity Studio app (or same repo if you host Studio here):

```bash
npm i sanity @sanity/vision
```

## 2) Configure environment variables

Copy `.env.example` to `.env.local` and fill values:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN` (optional for private datasets)

## 3) Plug schemas into Studio

Use `sanity/schemaTypes/index.ts` in your Studio config.

Example config template is available at:
- `sanity/sanity.config.example.ts`

## 4) Frontend query helpers

Query helpers are ready in:
- `lib/sanity/queries.ts`
- `lib/sanity/client.ts`
- `lib/sanity/get-home-cms-data.ts`
- `lib/sanity/types.ts`

You can call `getHomeCmsData()` from your `app/page.tsx` server component and pass data to sections.

## 5) Recommended rollout

1. Wire hero slider first.
2. Then events + school updates.
3. Then gallery.
4. Then team/management.
5. Finally move any remaining static site settings.
