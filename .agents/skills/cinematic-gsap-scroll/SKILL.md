---
name: cinematic-gsap-scroll
description: Implements polished, scroll-driven cinematic website animations with GSAP and ScrollTrigger in React. Use for hero entrance, parallax architecture photography, text reveals, pinned chapters, transitions, and reduced-motion support.
---
# Cinematic GSAP Scroll Animation

Implement elegant film-like movement that follows the property's architectural storytelling without sacrificing usability.

## Stack and initialization
- Install `gsap` and use `ScrollTrigger` from `gsap/ScrollTrigger`. React with Vite; regular CSS is sufficient.
- Register with `gsap.registerPlugin(ScrollTrigger)`.
- In each React component, use a component `ref`, create animations inside `gsap.context(() => { ... }, containerRef)` in `useLayoutEffect` or a suitable client-only effect, and `ctx.revert()` in cleanup.
- Prefer `gsap.matchMedia()` for desktop/mobile variants. Refresh ScrollTrigger as needed after image/media loads, and clean up listeners.

## Build a deliberate motion sequence
1. Hero: imagery gently scales from 1.06 to 1 while title and CTA stagger in (avoid animating layout dimensions).
2. Intro: editorial headline rises/reveals when entering view, stagger line/word groups only when accessible semantics survive.
3. Featured properties: image masks or `clip-path` reveal and restrained vertical parallax (not beyond 10-15% of image height).
4. Signature chapter: optionally pin a single section briefly **on larger screens only**, with an image crossfade and synchronized caption. Use ordinary stacked layout on mobile.
5. CTA finale: a calm dark-to-light transition with small motion, not rapid flashes.

## Engineering and accessibility
- Favor transforms and opacity; avoid excessive blur, filters, full-screen canvases, animation on every DOM node, or long chained scrub timelines.
- For `prefers-reduced-motion: reduce`, disable scrubs, pinning, smooth scroll, and large spatial movement. Immediately display final visible content.
- Never interfere with native keyboard and touch scrolling. Do not use scroll-jacking or infinite scroll.
- Use intersection-aware triggers and keep motion durations generally 0.6-1.2s; use deliberate easing and coordinated timing.
- A hero background video is optional; if used, muted/playsInline/loop, poster fallback and lower bandwidth consideration required. No autoplay audio.

## Quality check
- Verify no elements are invisible at rest if GSAP fails or scripts are blocked.
- Verify ScrollTrigger markers are absent in final build, no repeated pinned overlap, and no jitter on resize.
- Check mobile Safari-sized widths, low-end device performance and reduced-motion behavior.
