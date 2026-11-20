---
name: react-real-estate-landing
description: Builds a front-end-only React JavaScript and Vite real-estate landing page with reusable sections, demo property data, accessible navigation, functional UI controls, and no backend. Use when creating or updating the website structure.
---
# React Real Estate Landing Page

## Constraints
- React JavaScript + Vite + CSS + GSAP/ScrollTrigger + lucide-react; no Next.js, TypeScript, Firebase, databases, server, login, payment, or admin system.
- Present this as an interactive branded marketing landing page, not a functional property marketplace.
- Keep components in `src/components/`, reusable data in `src/data/properties.js`, styles in `src/styles/`, and static assets in `public/` or `src/assets/`.

## Build sequence
1. Inspect existing workspace, package.json and files. Scaffold Vite React only if needed.
2. Implement semantic page shell: navigation, hero, property discovery intro, property showcase, design philosophy, lifestyle, contact CTA and footer.
3. Create 3 clearly fictional sample listings with safe placeholder details. Make location and prices easy to edit. Label as sample/demo listings until real user content is supplied.
4. Navigation anchors scroll to matching sections. Mobile menu works with keyboard and closes after selection.
5. For listing tabs, use React state to actually filter the sample listings. No dummy controls or silent nonfunctional links.
6. For inquiries, use a real `mailto:` link with editable address placeholder or an informational CTA, and do not fake server submissions.
7. Integrate animation in isolated components and prioritize clear separation between content and effects.
8. `npm run build`, test scrolling, links and menu before considering the task complete.

## UX copy rules
- Write refined, restrained sentences; avoid exaggerated or unverified claims (e.g. top-rated, award-winning, 20-minute commute).
- Prices, addresses, inventory, and legal claims are placeholders until user supplies confirmed details.
- Make property details editable from one data object; don't hardcode repeated values across sections.

## Suggested component tree
- `App` → `Navbar`, `Hero`, `IntroStatement`, `FeaturedProperties`, `ArchitectureStory`, `Lifestyle`, `ContactCTA`, `Footer`.
- Optionally add `PropertyCard`, `SectionHeading`, `RevealText`, `MagneticLink` after core is working.
