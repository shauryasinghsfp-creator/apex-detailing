# 🏁 APEX DETAILING // Atelier

A **sovereign luxury car detailing studio** experience — a multi-page, cinematic,
dark-themed Next.js application with a persistent sidebar navigation, hardware-
accelerated 60–120 FPS animations, an interactive booking flow, and automated
email dispatch to the shop owner.

![Stack](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Motion](https://img.shields.io/badge/Framer%20Motion-11-ff4d4d?logo=framer)

---

## ✨ Features

- **Persistent Sidebar Navigation** — fixed minimalist vertical bar on desktop,
  collapsible drawer on mobile.
- **3 Pages** — Home (`/`), Our Work (`/our-work`), Enquire (`/enquire`).
- **Cinematic Porsche Hero** — full-screen moody imagery with mouse-follow
  **GPU-only parallax** (`transform`/`opacity`/`filter`).
- **Interactive Before/After Slider** — drag to reveal paint correction.
- **Filterable Gallery** — filter commissions by *All / PPF / Correction / Ceramic*.
- **Luxury Booking Form** — client-side validation, service tier pills, success modal.
- **Automated Email Dispatch** — `/api/enquire` route sends a beautiful HTML lead
  email to `owner@apexdetail.com` via **Resend** (sandbox fallback included).
- **Moody dark aesthetic** — Obsidian black, glassmorphic cards, gold accents.

---

## 🚀 Getting Started

### 1. Clone & install dependencies

```bash
git clone <your-repo-url> apex-detailing
cd apex-detailing
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your Resend key (see [API_KEYS_SETUP.md](./API_KEYS_SETUP.md)):

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
OWNER_EMAIL=owner@apexdetail.com
```

> **No API key yet?** The app still works — it runs in **sandbox mode** and logs
> enquiries to the terminal instead of emailing.

### 3. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000>.

### 4. Production build

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
apex-detailing/
├── .env.example
├── API_KEYS_SETUP.md
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── src/
│   ├── app/
│   │   ├── api/enquire/route.js   # Backend email sender
│   │   ├── our-work/page.jsx      # Our Work gallery
│   │   ├── enquire/page.jsx       # Booking form page
│   │   ├── page.jsx               # Homepage with Porsche hero
│   │   └── layout.jsx             # Global layout (sidebar)
│   ├── components/
│   │   ├── SidebarNav.jsx
│   │   ├── PorscheHero.jsx
│   │   ├── BeforeAfterSlider.jsx
│   │   ├── BookingForm.jsx
│   │   └── WorkGallery.jsx
│   ├── lib/
│   │   ├── cn.js
│   │   └── emailTemplate.js
│   └── styles/globals.css
```

---

## 🔧 Email Setup

See [API_KEYS_SETUP.md](./API_KEYS_SETUP.md) for the complete step-by-step guide
on creating a free **Resend** account, generating an API key, and configuring
`.env.local`.

---

## ☁️ Deploying to Vercel

### 1. Push to GitHub

```bash
# Initialize the repo
git init
git add .
git commit -m "feat: APEX DETAILING // Atelier v1.0"

# Add your remote and push
git remote add origin https://github.com/<your-username>/apex-detailing.git
git branch -M main
git push -u origin main
```

### 2. Import to Vercel

1. Go to <https://vercel.com/new> and sign in with GitHub.
2. Click **Import** next to the `apex-detailing` repository.
3. Vercel auto-detects **Next.js** — no build config changes needed.
4. Under **Environment Variables**, add:
   - `RESEND_API_KEY`
   - `OWNER_EMAIL`
5. Click **Deploy**.

Your live URL will be available immediately (e.g. `https://apex-detailing.vercel.app`).

### Deploy via CLI (optional)

```bash
npm i -g vercel
vercel
# follow the prompts, then
vercel --prod
```

---

## 🎨 Design System

| Token | Value |
| --- | --- |
| Background | `#09090B` (Obsidian) |
| Panel | `#121214` (Slate Dark) |
| Glass border | `rgba(255,255,255,0.08)` |
| Accent | `#D4AF37` (Gold) |
| Alt accent | `#D1121D` (Guards Red) |
| Motion | `cubic-bezier(0.16, 1, 0.3, 1)` |

Typography: **Cormorant Garamond** / **Syne** for display, **Inter** for body.

---

## 📄 License

Private commission — all rights reserved. Built with care for the world's finest automobiles.
