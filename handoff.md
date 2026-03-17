# handoff.md

## 🚨 AI AGENT EXECUTION RULES (CRITICAL) 🚨
- **NO PLACEHOLDERS:** Do not use `// ... add styles here` or truncate code. You must write every single Tailwind class for every element.
- **FULL IMPLEMENTATION:** Write production-ready, highly polished code on the first pass. Do not be lazy. 
- **NO NPM INSTALLS:** Assume all dependencies (Next.js, Tailwind, Framer Motion, Lucide React) are already installed. Spend 100% of your compute on UI generation and logic.

## Project Overview
Build a zero-cost waitlist landing page for "AmoBar" that replaces the current GoDaddy auto-generated placeholder page with a custom, premium branded experience. The site must be a lightweight, high-conversion single-page application that captures email signups via the Loops.so API and is deployable on Vercel without any database.

## Stack
- **Framework:** Next.js (App Router strictly)
- **Styling:** Tailwind CSS
- **Hosting/Deployment:** Vercel
- **Email/Waitlist Backend:** Loops.so API
- **Database:** None
- **Form Handling:** Client-side form submission to internal Next.js API route

## Product Context & Positioning
- **The Concept:** A premium meal-in-a-bar product for busy schedules.
- **Core Promise:** "One bar = one full meal".
- **The Vibe:** Elevated convenience, modern wellness, ambitious lifestyle. Do not make it look like a cheap sports supplement or typical candy bar.

## Design System & "UI/UX Pro Max" Guidelines

### Visual Direction
- **Base Theme:** Deep, rich dark mode (e.g., `bg-zinc-950`).
- **Background Treatment:** DO NOT use a flat color. Implement a subtle, glowing radial gradient in the background (purple/cyan) to make it feel cinematic and premium.

### Color Palette
- **Primary Accent:** Burgundy Red (`#842935`) - use for the primary CTA button and subtle highlights.
- **Text/Base:** White (`#FFFFFF`).
- **Badge Accent:** Include a subtle gold accent ONLY for the "Coming Soon" badge if appropriate.

### Glassmorphism Rules (Strict)
The waitlist container MUST use advanced glass styling. Apply these exact or equivalent Tailwind classes:
- `bg-white/5`
- `backdrop-blur-xl`
- `border border-white/10`
- `shadow-2xl`
- Generous rounded corners (`rounded-2xl` or stronger).

### Typography
- **Font:** `Inter` (fallback to `system-ui, sans-serif`).
- **Headings:** Very large, bold, and tracking-tight (e.g., `-tracking-tighter`).
- **Body:** Relaxed, neutral, slightly muted (`text-zinc-400` or similar).

## Exact Content & UI Layout
Build the UI in `app/page.tsx` using high-end spacing (`py-24`, `gap-8`). 

Use this EXACT copy:
1. **Brand/Header:** "AmoBar"
2. **Badge:** "Coming soon"
3. **Hero H1:** "One bar = one full meal"
4. **Hero Subtitle:** "A healthy, convenient, on-the-go solution"
5. **Form Placeholder:** "amobar@proton.me"
6. **Form CTA Button:** "Join the Waitlist"

## Functional Flow (Frontend & Backend)

### Frontend (`app/page.tsx`)
1. User enters email.
2. Form submission prevents default browser behavior.
3. Request POSTs to `/api/waitlist`.
4. Button enters disabled loading state: "Joining...".
5. On success, replace the form smoothly with: "You are on the list! Keep an eye on your inbox.".

### Backend (`app/api/waitlist/route.ts`)
1. Accept POST request.
2. Parse JSON and validate basic email format.
3. POST to `https://app.loops.so/api/v1/contacts` using `LOOPS_API_KEY` from environment variables.
4. Handle duplicate/already-subscribed cases gracefully.
5. Return clean JSON response. DO NOT expose the API key to the frontend.