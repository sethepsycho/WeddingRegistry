# Wedding Registry — Easy Setup Guide

Welcome! This guide is written for non-technical people. No coding required.
Just follow the steps in order.

There are two ways to use your registry:

- On your own computer (to set it up and preview it) — quick and easy, covered first.
- Online, so your guests can visit it — needed for the real wedding; see
  "Letting your guests see it" near the end.

Two important things to know before you start:

- Getting it online for your guests is a separate step. Running it on your computer is
  just for building and previewing — your guests can't see that. Putting it online (so it
  works on their phones) is a separate step that often needs a tech-savvy friend. See
  section 5.
- The app tracks gifts and money, it does not collect money. It keeps a tidy record of who
  claimed what and who's giving cash, but it does not charge cards or hold any money itself.
  Guests pay you directly the usual way (Venmo, cash, or check).

---

## 1. One-time: install Node.js

Your registry needs a free program called Node.js to run.

1. Go to https://nodejs.org
2. Click the big green "LTS" download button.
3. Open the downloaded file and click Next, Next, Finish (the defaults are fine).

You only ever do this once.

---

## 2. Start your registry

1. Double-click "Start Wedding Registry" (in this folder).
2. A black window opens and shows progress. The first time takes a few minutes
   while it sets everything up — this is normal. After that it starts in seconds.
3. Your web browser opens automatically to your registry.
4. Keep the black window open while you use the registry. Close it to stop.

If Windows shows a blue "Windows protected your PC" box: click "More info", then
"Run anyway". (This happens for any file that isn't from a big software company —
it's your own file and safe.)

Browser didn't open? Just type http://localhost:3000 into your browser.

---

## 3. Fill in your details

The very first time, you'll see a Welcome / setup screen. Enter:

- Your two names
- Wedding date (optional)
- A theme (a color style)
- An admin password — this protects your private dashboard. Write it down!

After that you land in your Admin dashboard, where you can:

- Add gifts — a name, a price, an optional photo link, and a description.
- Group gift — tick this so several guests can chip in toward one gift.
- Cash gift — tick this for a plain money gift (no fake "fund" needed).
- Gift or cash, your choice, later — for any claimed gift you can privately decide
  whether you'd rather receive the actual item or the cash equivalent. Guests never
  see this, and it means you don't have to deal with returning things you don't want.
- External registries — add links to registries hosted elsewhere (Amazon, Target, etc.).
- Claims & funding — see what's been claimed and make that gift-or-cash choice.
- Thank-yous — tick off who you've thanked.
- Guest list & RSVPs — see who's coming and your headcount.
- Couple & event — change your names, date, theme, your mailing address (only shown
  to guests who ask for it), and a notification email.

Guests visit the Registry and RSVP pages — they never see your dashboard.

---

## 4. Optional extras (payments, email, photo uploads)

These are all optional. Your registry works fine without them.

Double-click "Set Up Payments and Email" and answer y (yes) or n (no) to each.
After you finish, close and reopen "Start Wedding Registry" so the changes take effect.

Card payments (Stripe) — advanced, for developers:

Note: out of the box the app does NOT charge guests' cards. Turning on Stripe connects the
payment plumbing, but actually collecting a card from a guest needs an extra step a developer
has to add (see the "Extending this template" section of README.md). If you just want a
normal registry, skip this — guests pay you directly (Venmo, cash, check) and you track it
here. Ask a developer friend if you want real card collection.

Email notifications (Resend) — emails you when a gift is claimed or an RSVP arrives:

1. Create a free account at https://resend.com
2. Go to API Keys, create one, and copy it (it starts with re_).
3. Run "Set Up Payments and Email", choose y for email, and paste the key.
4. In your admin Couple & event settings, fill in the Notification email.

Photo uploads (Vercel Blob) — lets you upload gift photos instead of pasting links:

1. Create a free account at https://vercel.com and add a Blob store.
2. Copy the store's Read-Write token (starts with vercel_blob_rw_).
3. Run "Set Up Payments and Email", choose y for photo uploads, and paste the token.

---

## 5. Letting your guests see it (going live)

Important: while you use "Start Wedding Registry", the site only works on your own
computer. For your wedding guests to visit from their phones, it needs to be put online.

There's a separate, step-by-step guide for exactly this: open DEPLOY.md. It walks you
through three free accounts (a database, GitHub, and a host) and copying a couple of links
between them. It takes about 20 minutes.

Being honest: this is the more technical part. If it feels like a lot, this is the perfect
moment to hand DEPLOY.md to a tech-savvy friend — it has everything they need. Once it's
online you'll get a public web address to put on your invitations.

---

## 6. Everyday use

- Start it: double-click "Start Wedding Registry".
- Stop it: close the black window.
- Your gifts, claims, and RSVPs are saved automatically between runs.

---

## 7. If something goes wrong

- "Node.js is required" message: install Node.js (Step 1), then run
  "Start Wedding Registry" again.
- The browser didn't open: type http://localhost:3000 into your web browser.
- Blue "Windows protected your PC" box: click "More info", then "Run anyway".
- It says something is "already running": you may already have it open — check for
  another black window, or just reopen your browser to http://localhost:3000.
- Changed payments/email but nothing changed: close and reopen
  "Start Wedding Registry" so it reloads your settings.
- Forgot your admin password: ask whoever set it up. (Last resort: deleting the
  hidden ".localdb" folder starts fresh, but erases all gifts, claims, and RSVPs.)

---

That's it — congratulations, and enjoy!
