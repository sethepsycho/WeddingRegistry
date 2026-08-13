# Putting Your Registry Online (so guests can visit)

This guide makes your registry live on the internet, so your guests can open it from their
phones and your invitations can include the link.

Honest heads-up: this is the more technical part. It's free and takes about 20 minutes, but
it involves creating a few accounts and copying some links between websites. If that's not
your thing, this is the perfect moment to hand this file to a tech-savvy friend — everything
they need is right here.

You'll use three free services:

- GitHub — stores a copy of the app's files.
- Neon — a free online database (where your gifts and RSVPs live).
- Vercel — the free host that runs your website and gives you the link.

---

## Step 1 — Get a free online database (Neon)

1. Go to https://neon.tech and sign up (the free plan is plenty).
2. Create a new project (any name, e.g. "wedding").
3. On the project dashboard, find the connection string / database URL. Click to copy it.
   It looks like: `postgresql://user:password@ep-something.neon.tech/neondb?sslmode=require`
4. Paste it somewhere temporary (a note) — you'll need it in Step 3.
   Tip: if Neon offers a "Pooled connection", use that one.

---

## Step 2 — Put the app's files on GitHub

The easiest no-typing way is GitHub Desktop:

1. Sign up at https://github.com (free).
2. Download and install GitHub Desktop from https://desktop.github.com
3. Open GitHub Desktop → File → "Add local repository" → choose this project folder
   (the one with "Start Wedding Registry" in it).
   - If it says it's not a repository, click "create a repository here", then Publish.
4. Click "Publish repository". Leave "Keep this code private" ticked if you like.

Now your files live in your GitHub account. (You never have to look at them.)

---

## Step 3 — Put it online (Vercel)

1. Go to https://vercel.com and sign up — choose "Continue with GitHub".
2. Click "Add New… → Project", and Import the repository you just published.
3. Before clicking Deploy, open "Environment Variables" and add these two:
   - Name: `DATABASE_URL`  — Value: the Neon link you copied in Step 1.
   - Name: `SESSION_SECRET` — Value: any long random text (mash your keyboard — 40+ characters).
4. Click Deploy and wait a minute or two. The database tables are created automatically.
5. When it finishes, click the link Vercel gives you (something like
   `your-project.vercel.app`). You'll see the first-run setup screen — fill in your names,
   date, theme, and admin password, just like you did on your computer.

That link is your live registry. Put it on your invitations. 🎉

---

## Optional — turn on extras online

To enable card payments, email, or photo uploads on the live site, add the matching
environment variables in Vercel (Project → Settings → Environment Variables), then redeploy
(Deployments → the latest one → "Redeploy"):

- Card payments: `PAYMENT_PROVIDER` = `stripe`, plus `STRIPE_SECRET_KEY` and
  `STRIPE_WEBHOOK_SECRET`. In Stripe, point a webhook at
  `https://your-project.vercel.app/api/webhooks/stripe` for the `checkout.session.completed`
  event. (See README "Extending this template" for detail.)
- Email: `EMAIL_PROVIDER` = `resend`, plus `RESEND_API_KEY` and `EMAIL_FROM`.
- Photo uploads: `STORAGE_PROVIDER` = `vercel-blob`, plus `BLOB_READ_WRITE_TOKEN`
  (create a Blob store under your Vercel project's Storage tab).

---

## If something goes wrong

- The deploy failed: usually the `DATABASE_URL` is wrong or missing. Double-check you copied
  the whole Neon link, then redeploy (Deployments → latest → Redeploy).
- The page loads but errors: make sure both `DATABASE_URL` and `SESSION_SECRET` are set in
  Vercel's Environment Variables, then redeploy.
- Stuck on GitHub or Vercel: these are the fiddly parts — a tech-savvy friend can get past
  them in a few minutes with this file.

Once it's live, you can keep using "Start Wedding Registry" on your computer to experiment,
and the online version is what your guests see. They are two separate copies.
