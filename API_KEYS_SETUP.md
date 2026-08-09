# 🔑 Email Setup — APEX DETAILING // Atelier

This guide explains how to configure **automatic email dispatch** for the booking
system so that every enquiry submitted on `/enquire` is emailed directly to the
shop owner's inbox.

The app ships with **two** email backends:

1. **Gmail SMTP via Nodemailer** (⭐ recommended — **no custom domain needed**)
2. **Resend** (optional — best once you verify a custom domain)

---

## OPTION A — Gmail SMTP (Recommended, no domain needed)

This uses your own Gmail account (`johnstanleee@gmail.com`) to send the enquiry
emails, so they arrive **directly in your Gmail Inbox** — no spam filtering, no
shared-sender issues.

### 1. Enable 2-Step Verification (required)

Gmail requires **App Passwords**, which only work when **2-Step Verification** is
turned on for the account.

1. Go to <https://myaccount.google.com/security>
2. Under **Signing in to Google**, select **2-Step Verification** → **Turn on**.
3. Follow the prompts to enable it.

### 2. Generate an App Password

1. Go to <https://myaccount.google.com/apppasswords>
   (If this link 404s, ensure 2-Step Verification is fully on first.)
2. Under **Select app**, choose **Mail**.
3. Under **Select device**, choose **Other (custom name)** and type `APEX`.
4. Click **Generate**.
5. Google shows a **16-character password** like:
   `abcd efgh ijkl mnop`
6. **Copy it now** (it's shown only once). Remove the spaces → `abcdefghijklmnop`.

### 3. Configure the app

Create a `.env.local` file in the project root (copy from `.env.example`):

```env
# .env.local
SMTP_USER=johnstanleee@gmail.com
SMTP_PASS=abcdefghijklmnop
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
OWNER_EMAIL=johnstanleee@gmail.com
```

> ⚠️ `.env.local` is git-ignored. Never commit your real App Password.
> The App Password grants mail-sending access to your Gmail — treat it like a key.

### 4. Restart the dev server

```bash
npm run dev
```

Now every form submission on `/enquire` will fire a **POST** to `/api/enquire`,
which sends the gorgeous HTML lead email **from your Gmail** to `OWNER_EMAIL`.

Because the email both comes from and goes to your Gmail, it lands in your
**Inbox** — no custom domain, no shared sender, no spam folder.

---

## Sandbox / Fallback mode (no SMTP configured)

If `SMTP_USER` / `SMTP_PASS` are **not** set, the app does **not** fail. Instead:

- The `/api/enquire` route returns a **200 success** response.
- The full lead payload is logged to your **terminal/server console**.
- The success modal still appears on the frontend, so you can prototype the
  entire flow before adding real credentials.

---

## OPTION B — Resend (alternative, once you have a domain)

Resend is great once you verify a custom domain (which eliminates spam-filtering
on the shared sender). To use it:

1. Sign up at <https://resend.com> and generate an API key.
2. Verify a custom domain (e.g. `apexdetail.com`) and add the DNS records.
3. Configure:

   ```env
   # .env.local
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   RESEND_FROM_EMAIL=APEX Atelier <bookings@yourdomain.com>
   OWNER_EMAIL=johnstanleee@gmail.com
   ```

4. Restart the server. (The route currently uses Nodemailer/Gmail by default;
   swap in the Resend block from the earlier revision if you prefer Resend.)

> ⚠️ On Resend's **free tier**, the shared `onboarding@resend.dev` sender can only
> deliver to the email address you registered with — and Gmail often routes it to
> **Spam/Promotions**. A verified custom domain is the reliable way to use Resend.

---

## Verifying delivery

- **Dev (Gmail):** submit the form, then check your Gmail **Inbox** — the email
  appears instantly from your own address.
- **Dev (sandbox):** watch the terminal for the `[APEX // ATELIER] SANDBOX MODE`
  block containing the full lead.
- **Production (Gmail):** add `SMTP_USER`, `SMTP_PASS`, `OWNER_EMAIL` to your
  host (e.g. Vercel) environment variables.
</content>
