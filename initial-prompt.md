# Master Build Execution Prompt

## Step 1: Context Ingestion
Before writing any code, you MUST read and synthesize these two files:
1. `website-info.md` (For the AMO brand identity, premium tone, and "meal-in-a-bar" positioning).
2. `handoff.md` (For the Next.js/Loops technical architecture).

## Step 2: Design System & UI/UX Pro Max Skill
Trigger the UI/UX Pro Max Skill to generate a premium design system. 
**CRITICAL INSTRUCTIONS FOR THE SKILL:**
- **Base Theme:** Deep, rich dark mode (e.g., `bg-zinc-950`).
- **Brand Accents:** Use the Burgundy Red (#842935) from the handoff as the primary button/accent color. Incorporate a subtle gold accent ONLY if appropriate for micro-interactions or the "Coming Soon" badge.
- **Background:** DO NOT use a flat color. Implement a subtle, glowing radial gradient in the background using CSS or Tailwind to make it feel cinematic.
- **Card/Glassmorphism:** The waitlist container MUST use advanced glass styling. Use classes similar to: `bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl`.

## Step 3: Content & Layout Implementation
Build the UI in `app/page.tsx`. Ensure high-end spacing (`py-24`, `gap-8`) and elegant typography (tracking-tight for headings, relaxed for body).

Use this exact copy:
- **Title:** AmoBar
- **Badge/Pill:** "Coming soon"
- **H1 Hero:** One bar = one full meal
- **Subtitle / H1 Hero:** "A healthy, convenient, on-the-go solution"
- **Input Placeholder:** "amobar@proton.me"
- **Button:** "Join the Waitlist"


## Step 4: Functionality & Constraints
- STRICTLY use the Next.js App Router.
- Wire the form to a server action or API route that sends a POST request to `https://app.loops.so/api/v1/contacts`.
- The form MUST have a disabled loading state ("Joining...").
- On success, replace the form smoothly with: "You are on the list! Keep an eye on your inbox."
- **DO NOT BE LAZY.** Write the full, production-ready code. Do not use placeholders for the CSS.

Execute the build now.
