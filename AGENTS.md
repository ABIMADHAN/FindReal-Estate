# Project instructions: Cinematic Real Estate Landing Page

## Project scope
- Build one **frontend-only** landing page for a premium real-estate brand using **React JavaScript and Vite**.
- Use regular CSS (including CSS variables and fluid `clamp()` sizing), GSAP and ScrollTrigger for motion, and lucide-react for icons.
- Do **not** add Next.js, TypeScript, authentication, backend services, databases, payment flows, maps requiring API keys, or deployment systems unless explicitly requested.
- Respect existing project files; inspect the repository before replacing anything.

## Design intent
- The visual direction is a cinematic, high-end architectural editorial: art-directed photography, calm whitespace, deep forest green, warm ivory, muted brass, large contrasting serif headlines and crisp sans-serif interface copy.
- Avoid generic SaaS layouts, endless gradient cards, huge glowing blobs, and overstated animation.
- Ship meaningful content and legible realistic property placeholders; clearly label demo listings.

## Interaction and motion
- Build GSAP animations with `gsap.context`, scope selectors to component refs, and revert/clean up on unmount. Register ScrollTrigger before using it.
- Prioritize legibility and performance: don't scroll-jack, autoplay audio, or pin long scenes on touch screens. Keep hero and section images stable to avoid layout shifts.
- Honor `prefers-reduced-motion` and provide readable layouts if JavaScript motion fails.
- Navigation and UI controls must work. A demo property filter should behave honestly and locally; no fake network or submission success.

## Definition of done
- Works with `npm run dev` and `npm run build`.
- Responsive desktop/tablet/mobile; keyboard navigation, visible focus states, real alt text, sensible tap sizes.
- No red errors or broken assets; asset sources and placeholders identified.
- Use the four workspace skills in `.agents/skills/` as relevant to the request.
