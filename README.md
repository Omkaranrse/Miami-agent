# Move Miami Realtor — Editorial Real Estate Platform

A modern, luxury editorial Next.js App Router website for **Move Miami Realtor** (`Move Miami Realty` / `Move Miami, LLC`), structured around the brokerage's authentic listings, attorney-led positioning under Managing Broker **Victor A. Ruiz, Esq.**, Framer `GradientNavbar`, and verified Miami-Dade & Broward content.

## Runtime & Technology Stack

- **Node.js:** `24.22.3` (pinned in `.nvmrc` and `package.json` `engines`)
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 (`src/app/globals.css` design tokens)
- **Typography:** `Cormorant Garamond` (editorial headings, 400/500/600) + `Manrope` (navigation, body & UI, 400/500/600/700) via `next/font/google`
- **Navigation:** Custom ported Framer `GradientNavbar` (WebGL domain-warped liquid shader + `@container` responsive collapse drawer)
- **Forms & Validation:** `react-hook-form`, `zod`, `@hookform/resolvers`

## Color System

| Token | Value | Role |
| --- | --- | --- |
| Primary | `#241748` | Deep Royal Purple |
| Surface Dark | `#352366` | Elevated Royal Violet |
| Background | `#F9F8FC` | Porcelain Lavender-White |
| Secondary | `#E2DCF0` | Soft Lavender Border |
| Accent (Dark UI) | `#D4C6FF` | Luminous Lavender Highlight |
| Accent (Light UI) | `#5E3FD6` | Rich Amethyst |
| Text | `#1F1B2E` | Deep Plum Charcoal |
| Surface | `#FFFFFF` | White |

## Local Development

```bash
nvm use 24.22.3
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Configuration

Copy `.env.example` to `.env.local` if forwarding validated inquiries to an external CRM webhook or customizing your canonical domain:

```bash
cp .env.example .env.local
```

- `INQUIRY_WEBHOOK_URL` *(optional)* — Receives validated JSON payloads submitted from `/api/contact`, `/api/valuation`, `/api/cash-offer`, and `/api/buyer-inquiry`.
- `NEXT_PUBLIC_SITE_URL` *(optional)* — Canonical base URL for OpenGraph and SEO metadata.

## Routes & Architecture

All internal public routes live inside `src/app/(main)/`:

- `/` — Editorial Homepage (`HeroSection`, `TrustIndicators`, `FeaturedProperties`, `ServicesOverview`, `AboutPreview`, `NeighborhoodShowcase`, `PropertySpotlight`, `TeamPreview`, `VideoShowcase`, `InstagramFeed`, `FinalCTA`)
- `/listings` — Search & filter across **For Sale**, **For Rent**, **Vacation Rentals**, and attributed **MLS / IDX Feed** samples (with permanent redirect from `/properties`)
- `/properties/[slug]` — Individual property detail page with `PropertyGallery`, specs (`PropertyDetails`), highlights & concept renderings (`PropertyFeatures`), and `PropertyInquiry`
- `/buy` — Buyer representation, curated buyer brief (`BuyerForm`), 4-step process, and neighborhood links
- `/sell` — Seller strategy comparing 72-Hour Cash Offer vs. Traditional Listing, verified past results, and process
- `/cash-offer` — Conversion page with `CashOfferForm` and HiFello Cash Offer Portal link
- `/home-valuation` — Free CMA valuation page with `ValuationForm`, HiFello Home Equity Portal, and Zestimate comparison table
- `/about-us` — Brokerage story, `PrincipalProfile`, vision & mission (with permanent redirect from `/about`)
- `/agents` & `/agents/[slug]` — Licensed advisor directory and individual bio pages (with permanent redirect from `/team`)
- `/videos` — Filterable YouTube tour library with inline modal player and Instagram Reels
- `/updates-news` & `/updates-news/[slug]` — Filterable market updates, international buyer guides, and probate resources (with permanent redirects from `/updates` & `/updates/[slug]`)
- `/calculators` — Interactive Mortgage Payment, Affordability, and Home Sale Net Proceeds calculators
- `/calculators/home-sale-caculator` — Dedicated Seller Net Proceeds calculator route preserving the live site slug
- `/contact` — Direct contact channels (WhatsApp `(305) 632-1540`, Office `(305) 301-0525`, Email), `ContactForm`, and embedded office map
- `/api/contact`, `/api/valuation`, `/api/cash-offer`, `/api/buyer-inquiry` — Zod-validated `POST` route handlers with honeypot spam guard

## Verification Commands

```bash
npm run lint
npx tsc --noEmit
npm run build
```
