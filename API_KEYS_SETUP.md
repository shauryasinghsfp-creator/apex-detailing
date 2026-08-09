# 🔑 API Keys Setup — APEX DETAILING // Atelier

This guide explains how to configure **automatic email dispatch** for the booking
system so that every enquiry submitted on `/enquire` is emailed directly to the
shop owner (`owner@apexdetail.com`).

The app uses **[Resend](https://resend.com)** as the email provider. Resend offers
a generous free tier and is the simplest way to send beautiful, HTML-formatted
transactional email from a Next.js route handler.

---

## Option A — Resend (Recommended)

### 1. Create a free Resend account

1. Go to <https://resend.com> and click **Sign Up**.
2. Sign in with GitHub or Google (or create a new account with email).
3. Verify your email address.

### 2. Generate an API Key

1. From the Resend dashboard, open the **API Keys** page:
   <https://resend.com/api-keys>
2. Click **Create API Key**.
3. Give it a name, e.g. `apex-atelier`.
4. Choose the permission scope. `Sending access` is sufficient.
5. Click **Create** and **copy the key immediately** — it is shown only once.

### 3. Verify your sending domain (recommended for production)

For development, Resend lets you send to your own inbox from the shared
`onboarding@resend.dev` address. For production delivery you should add a domain:

1. On the Resend dashboard go to **Domains** → **Add Domain**.
2. Follow the DNS setup steps (add the provided `MX`, `SPF`, and `DKIM` records
   to your domain provider).
3. Wait for verification, then set `RESEND_FROM_EMAIL` to `Atelier <you@yourdomain.com>`.

### 4. Configure the app

Create a `.env.local` file in the project root (copy from `.env.example`):

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
OWNER_EMAIL=owner@apexdetail.com
# Optional — only needed if you verified your own domain:
# RESEND_FROM_EMAIL=Atelier <bookings@apexdetail.com>
```

> ⚠️ `.env.local` is already git-ignored. Never commit real keys.

### 5. Restart the dev server

```bash
npm run dev
```

Now every form submission on `/enquire` will fire a **POST** to `/api/enquire`,
which sends the gorgeous HTML lead email to `OWNER_EMAIL`.

---

## Sandbox / Fallback mode (no API key yet)

If `RESEND_API_KEY` is **not** set, the app does **not** fail. Instead:

- The `/api/enquire` route returns a **200 success** response.
- The full lead payload is logged to your **terminal/server console**.
- The success modal still appears on the frontend, so you can prototype the
  entire flow without any email provider.

You can validate the complete booking UX end-to-end before adding a real key.

---

## Option B — SendGrid (alternative)

If you prefer SendGrid over Resend:

1. Create an account at <https://sendgrid.com>.
2. Complete sender verification (Single Sender or set up a domain).
3. Generate an API Key (**Settings → API Keys → Create API Key**) with
   `Mail Send` permission.
4. In `src/app/api/enquire/route.js`, swap the Resend block for `@sendgrid/mail`:

   ```js
   // import sgMail from '@sendgrid/mail';
   // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   // await sgMail.send({
   //   to: OWNER_EMAIL,
   //   from: process.env.SENDGRID_FROM_EMAIL,
   //   subject,
   //   html,
   //   replyTo: data.email,
   // });
   ```

5. Add `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` to `.env.local`.

---

## `.env.example` reference

```bash
RESEND_API_KEY=
OWNER_EMAIL=owner@apexdetail.com
# RESEND_AUDIENCE_ID=
```

---

## Verifying delivery

- **Dev:** watch the terminal — in sandbox mode you'll see a
  `[APEX // ATELIER] SANDBOX MODE` block.
- **Production:** check the Resend dashboard **Logs** for delivery status and
  open/click events.
