---
name: responsive-a11y-performance
description: Audits and polishes an animated React real-estate landing page for mobile responsiveness, accessibility, image performance, visual consistency, and production build quality. Use during final UI review or performance improvements.
---
# Responsive, Accessible, Fast Cinematic UI

## Responsive
- Test at 390px, 768px, 1024px and 1440px; ensure no horizontal scrolling, no accidental clip on text, and logical stacking of architecture sections.
- Prefer `clamp()` typography, grid/flex and sensible max-width constraints over many absolute pixel positions.
- Avoid permanently fixed height on text-heavy content; reserve image ratios to prevent layout shifts.
- Disable desktop pinned storytelling on small screens and short viewports.

## Accessibility
- Semantic heading hierarchy (one H1), landmarks, descriptive buttons and links, useful alt text for informative photos and empty alt for purely decorative ones.
- Strong contrast over photos; visible keyboard focus, proper `aria-expanded` for mobile menu, minimum comfortable touch targets ~44px.
- Honor reduced-motion system setting: no auto-moving parallax, scrubbing, long reveals or background video when users opt out.
- Keep any UI control honestly functional; placeholders should be obvious.

## Performance
- Prefer responsive optimized WebP/AVIF imagery when available; provide useful poster/fallback.
- Lazy-load below-fold imagery, but prioritize the hero image so it can render quickly.
- Avoid loading huge videos or WebGL scenes as mandatory dependencies; keep motion transform/opacity based.
- Avoid several stacked GSAP ScrollTriggers doing the same work; clean up animations on unmount.
- Test `npm run build` and resolve warnings/errors. Check for missing media, broken assets and console errors.

## Final QA acceptance
- Usable with keyboard only, reduced motion and narrow screens.
- Hero CTA and top navigation always usable, even if animation doesn't run.
- Smooth enough on ordinary devices; no intrusive flashing, jumpy pinning, or hidden scroll areas.
- The site should feel high-end because of visual direction and pacing, not sheer animation count.
