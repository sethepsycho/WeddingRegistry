# Wedding Registry

A self-hostable, open-source wedding registry. Guests browse and claim gifts like a
normal registry — no account required. Behind the scenes, the couple can privately
decide, **per claimed item**, whether to receive it as a physical gift or convert the
claim into a cash equivalent. Guests never see that toggle.

Fork it, deploy your own instance (e.g. to Vercel), and configure everything from the
in-app admin after deploying — **no code editing required** for normal use.

> ### 👉 Non-technical? Start here (Windows)
>
> You don't need to read the rest of this file. Instead:
>
> 1. Install **Node.js** once from <https://nodejs.org> (green "LTS" button).
> 2. Double-click **`Start Wedding Registry`** — it sets up a built-in database, starts the
>    site, and opens your browser. No database or terminal required.
> 3. Double-click **`Set Up Payments and Email`** to turn on card payments, email
>    notifications, or photo uploads (each optional, guided prompts).
>
> Full step-by-step instructions are in **`Setup Guide.docx`** (open in Word) or
> [`SETUP.md`](SETUP.md). Everything below is for developers / deploying online for guests.

> **Payments note:** This template ships with a **simulated** payment provider — cash
> pledges are recorded in the database, but no real money moves. The data model and code
> are structured so a real provider (e.g. Stripe) can be added later without restructuring
> the app. See [Extending this template](#extending-this-template).

---

## Features

- 🎁 **Guest registry** — a clean, themeable grid of gifts; claim with just a name and an
  optional message, no login.
- 👥 **Group gifting** — mark any item to let multiple guests contribute partial amounts
  toward it. The registry shows a live progress bar; the couple can close funding early.
- 🔒 **Private fulfillment decision** — for each claimed/funded item the couple chooses
  *Undecided → Receive as gift → Convert to cash*. Invisible to guests.
- 🧾 **Simulated cash pledges** — converting an item records a `Payment` (for the amount
  actually contributed) via a swappable provider abstraction.
- 🔗 **External registry links** — add links to registries hosted elsewhere (Amazon,
  Target, etc.); they appear on your registry page, separate from your own items.
- 💌 **Thank-you tracking** — mark each contribution as thanked (with a timestamp), filter
  to just the pending ones, and see any contact a guest optionally left. Contact info is
  couple-only and never shown publicly.
- 📬 **Optional address sharing** — when claiming a physical gift a guest can flag that they
  need the couple's mailing address; it's stored privately in admin and revealed only to
  those guests on request, never printed on the public page.
- 🔎 **Search, filter & sort** — guests can search the registry by name, filter by
  availability and category, and sort by price or newest — all client-side, instant.
- 💵 **Honest cash gifts** — a first-class "cash gift" item type: unrestricted, no forced
  "fund" fiction, optional goal (or open-ended). Guest-facing copy is plain about the money
  going straight to the couple.
- 📝 **RSVP** — a built-in public RSVP page (toggleable) with attendance, party size, and an
  optional note; the couple sees a live headcount and the full list in the admin.
- 🔌 **Plug-and-play integrations** — optional Stripe payments, email notifications (Resend),
  and image uploads (Vercel Blob), each off by default and enabled with env vars alone.
- 🛠️ **Admin dashboard** — add/edit/delete items (with a group-gifting toggle), edit couple
  details & theme, manage claims & contributions, and see totals (claimed/funded, in
  progress, cash pledged, gifts pending).
- 🚀 **First-run setup** — a deployed instance starts empty and walks you through setup
  (names, date, theme, admin password) on first visit.
- 🎨 **Themes** — Classic, Rose, Sage, Midnight, applied site-wide.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Prisma](https://www.prisma.io/) ORM with **PostgreSQL** (Neon / Vercel Postgres / any Postgres)
- `bcryptjs` password hashing + a signed, httpOnly session cookie (no external auth service)

PostgreSQL is used rather than SQLite because SQLite doesn't persist reliably on Vercel's
serverless filesystem, and anyone adding real payments later will want a proper database anyway.

---

## Deploy to Vercel

> **Non-technical?** There's a plain-language, step-by-step version of this in
> **[`DEPLOY.md`](DEPLOY.md)** (GitHub + Neon + Vercel, ~20 minutes).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/wedding-registry&env=DATABASE_URL,SESSION_SECRET&envDescription=Postgres%20URL%20and%20a%20random%20session%20secret&project-name=wedding-registry&repository-name=wedding-registry)

1. **Create a Postgres database** (e.g. [Neon](https://neon.tech/) or Vercel Postgres) and
   copy its connection string.
2. **Deploy this repo** (button above, or import your fork in the Vercel dashboard).
3. **Set environment variables** in the Vercel project settings:
   - `DATABASE_URL` — your Postgres connection string (use the **pooled** string).
   - `SESSION_SECRET` — a long random string (`openssl rand -base64 32`).
   - `PAYMENT_PROVIDER` / `EMAIL_PROVIDER` / `STORAGE_PROVIDER` — optional (see below).
4. **Visit your site.** The build runs `prisma db push`, so the database tables are created
   automatically on first deploy — no manual step. You'll land on `/setup` to enter your
   names, date, theme, and admin password.

> The build step migrates the database (`prisma db push`) on every deploy, so `DATABASE_URL`
> must be set and reachable at build time. Don't run the seed against production — deployed
> instances start empty and use first-run setup.

---

## Local development

**Prerequisites:** Node.js 18+ and a PostgreSQL database you can connect to (local Postgres,
Docker, or a free Neon dev branch).

```bash
# 1. Install dependencies (also runs `prisma generate`)
npm install

# 2. Configure environment
cp .env.example .env
#    then edit .env and set DATABASE_URL + SESSION_SECRET

# 3. Create the tables
npm run db:push

# 4. (Optional) Load demo data for local dev
npm run db:seed

# 5. Start the dev server
npm run dev
```

Open http://localhost:3000.

- With **seed data**, the demo admin password is **`password123`** (log in at `/admin`).
- Without seed data, your first visit goes to `/setup` to create the registry.

### Scripts

| Script            | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the Next.js dev server                        |
| `npm run build`   | `prisma generate` + production build                |
| `npm run start`   | Run the production build                            |
| `npm run db:push` | Create/update DB tables from `prisma/schema.prisma` |
| `npm run db:seed` | Load local demo data (destructive: clears tables)   |
| `npm run db:studio` | Open Prisma Studio to inspect the database        |

### Environment variables

| Variable                | Required | Description                                                            |
| ----------------------- | -------- | -------------------------------------------------------------------- |
| `DATABASE_URL`          | ✅       | PostgreSQL connection string.                                        |
| `SESSION_SECRET`        | ✅       | Secret used to sign the admin session cookie. Use a long random value. |
| `PAYMENT_PROVIDER`      | ➖       | `simulated` (default) or `stripe`.                                   |
| `STRIPE_SECRET_KEY`     | ➖       | Required when `PAYMENT_PROVIDER=stripe`.                             |
| `STRIPE_WEBHOOK_SECRET` | ➖       | Verifies the Stripe webhook.                                        |
| `EMAIL_PROVIDER`        | ➖       | `none` (default) or `resend`.                                       |
| `RESEND_API_KEY`        | ➖       | Required when `EMAIL_PROVIDER=resend`.                              |
| `EMAIL_FROM`            | ➖       | Verified sender address for Resend.                                 |
| `STORAGE_PROVIDER`      | ➖       | `none` (default) or `vercel-blob`.                                  |
| `BLOB_READ_WRITE_TOKEN` | ➖       | Required when `STORAGE_PROVIDER=vercel-blob`.                       |

See [Extending this template](#extending-this-template) for the optional integrations.

---

## How it works

Money is stored everywhere as integer **cents**. A guest "claim" is just a single
`Contribution` equal to the full price; a group gift accepts many partial contributions.
When the couple sets an item to cash, the app calls a single function,
`recordCashPledge(itemId)`, which:

1. sums the item's contributions (the real amount pledged),
2. selects the active provider via `getPaymentProvider()`,
3. asks it to create a payment, and
4. upserts a `Payment` row (`amount`, `status`, `provider`, `providerRef`).

The shipped `SimulatedPaymentProvider` just returns a completed pledge with no external
reference. **This is the only seam that a real payment integration needs to touch.**

```
Admin toggles "Convert to cash"
        │
        ▼
PATCH /api/admin/items/[id]/fulfillment
        │
        ▼
recordCashPledge(itemId)  ── getPaymentProvider() ──▶ SimulatedPaymentProvider
        │                                             (or, later, StripePaymentProvider)
        ▼
Payment row upserted  { provider, providerRef, status, amountCents }
```

---

## Extending this template

Payments, email, and image uploads are built in as **plug-and-play integrations**. Each is
off by default (safe no-op), lives behind a single provider interface, and is turned on with
env vars — no code changes required. The optional SDKs are declared as `optionalDependencies`
and loaded only when their provider is selected, so a default install stays lean.

The pattern is the same for all three: a `getXProvider()` factory reads one env var and
returns the active provider; a `"none"`/`"simulated"` default ships in the box; adding another
vendor is one new class + one `case`.

### 💵 Real payments (Stripe)

The app routes every pledge through `src/lib/payments.ts`; the `Payment` model already carries
`provider`, `providerRef`, and `status`.

1. `npm install stripe`
2. Set `PAYMENT_PROVIDER=stripe`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (and optional
   `STRIPE_CURRENCY`).
3. Point a Stripe webhook at `POST /api/webhooks/stripe` (locally: `stripe listen --forward-to
   localhost:3000/api/webhooks/stripe`). It verifies the signature and flips the matching
   `Payment` to `completed` on `payment_intent.succeeded` / `checkout.session.completed`.

`StripePaymentProvider.createPayment()` creates a PaymentIntent for the pledged amount and
returns it as `pending`. To actually collect from guests, add a client confirmation step
(Stripe Elements / Checkout) using that intent — everything server-side is already wired.

> Note: with Stripe enabled, each new contribution to a cash item re-runs the pledge sync,
> which creates a fresh PaymentIntent. If you build a real guest-pays flow, prefer creating
> one intent per contribution (or finalize the pledge once at close) rather than syncing a
> running total — otherwise earlier intents are superseded.

### 💌 Email notifications (Resend)

Notifications flow through `src/lib/email.ts`. The couple is emailed when a gift is claimed or
an RSVP arrives, at the **Notification email** set in the admin.

1. `npm install resend`
2. Set `EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, and `EMAIL_FROM` (a verified sender).
3. Set the couple's recipient address in the admin **Couple & event** settings.

The default `EMAIL_PROVIDER=none` just logs; sending is fire-and-forget and never blocks or
fails a guest's request.

### 🖼️ Image uploads (Vercel Blob)

Uploads flow through `src/lib/storage.ts`. Default is URL-only; enable a store and the admin
item form gains a file picker (with the URL field as fallback).

1. `npm install @vercel/blob` and create a Blob store in your Vercel project.
2. Set `STORAGE_PROVIDER=vercel-blob` and `BLOB_READ_WRITE_TOKEN`.
3. `POST /api/upload` (admin-only) validates the file (image, ≤5 MB) and returns the public URL.

### Adding your own provider

Implement the relevant interface (`PaymentProvider`, `EmailProvider`, or `StorageProvider`),
add a `case` to that module's `getXProvider()`, and (if it needs an SDK) load it via
`optionalImport()` from `src/lib/optionalImport.ts` so the bundler keeps it optional. Nothing
else in the app changes.

> **Security reminder:** never commit secret keys — keep them in environment variables only,
> and use each vendor's test mode before going live.

---

## Project structure

```
prisma/
  schema.prisma      # Couple, Item, Contribution, Payment, ExternalLink, Rsvp
  seed.ts            # local demo data
src/
  app/
    page.tsx         # landing
    setup/           # first-run setup flow
    registry/        # guest registry + browser (search/filter/sort) + contribute modal
    rsvp/            # public RSVP page + form
    admin/           # password-gated dashboard: items, funding, thank-yous, RSVPs, links
    api/             # setup, auth, items, contributions, fulfillment, couple, rsvp,
                     #   external-links, address, upload, webhooks/stripe
    globals.css      # theme tokens + component styles
  components/
    SiteHeader.tsx
  lib/
    prisma.ts        # Prisma client singleton
    auth.ts          # password hashing + signed session cookie
    payments.ts      # ⭐ payment provider abstraction (simulated / stripe)
    email.ts         # ⭐ email provider abstraction (none / resend)
    storage.ts       # ⭐ image upload provider abstraction (none / vercel-blob)
    optionalImport.ts# loads optional SDKs without bundling them
    funding.ts       # group-funding helpers (pure)
    config.ts        # couple/setup helpers (getCouple vs getPublicCouple)
    themes.ts        # theme registry
    format.ts        # money & date formatting
```

---

## Screenshots

> _Add screenshots of the landing page, registry, and admin dashboard here._
>
> - `docs/landing.png`
> - `docs/registry.png`
> - `docs/admin.png`

---

## License

[MIT](./LICENSE) — do whatever you like. Congratulations, and enjoy the wedding. 🥂
