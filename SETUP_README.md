# Cinematic Real Estate Antigravity skills pack

This ZIP contains four **custom Antigravity Agent Skills**, an `AGENTS.md` project rule file, and a ready-to-paste build prompt. It contains **instructions for the agent**, not a pre-built website or installed npm packages.

## Installation (Windows / Antigravity IDE)
1. Install the current Node.js LTS from nodejs.org and Google Antigravity IDE from antigravity.google/download.
2. Open a new folder for your React project in Antigravity IDE.
3. In the integrated terminal, if your opened folder is empty, run:

   `npm create vite@latest . -- --template react`
   `npm install`
   `npm install gsap lucide-react`

   The dot means scaffold into the current empty folder. If it isn't empty, scaffold into a new subfolder instead, open that project root, then continue.
4. Extract this ZIP. **Copy the four skill folders from `.agents/skills/` into the same path in your React project root**. Copy `AGENTS.md` to the root if there is not already one; otherwise merge its instructions carefully. Keep `MASTER_PROMPT_FOR_ANTIGRAVITY.md` available in the project or paste its contents.
5. Final structure inside the project should resemble:

   ```text
   my-real-estate-site/
   ├── .agents/
   │   └── skills/
   │       ├── luxury-real-estate-art-direction/SKILL.md
   │       ├── cinematic-gsap-scroll/SKILL.md
   │       ├── react-real-estate-landing/SKILL.md
   │       └── responsive-a11y-performance/SKILL.md
   ├── AGENTS.md
   ├── package.json
   ├── src/
   └── index.html
   ```

6. Open a NEW Antigravity agent conversation and ask: `List the workspace skills available in .agents/skills and confirm you can read them.` Or inspect the **Customizations** menu in the Antigravity IDE agent side panel.
7. Paste `MASTER_PROMPT_FOR_ANTIGRAVITY.md` into the agent and let it generate the components and CSS. Review actions before accepting file or terminal changes.
8. Run `npm run dev` and open the localhost URL printed by Vite (often `http://localhost:5173`). Adjust according to actual terminal output.
9. Test with `npm run build`. Replace fictional listing details, placeholder inquiry link, and photos before public use.

## Skill folder rule
The official Antigravity docs specify project-local skills at `<workspace-root>/.agents/skills/<skill-name>/SKILL.md`, with uppercase `SKILL.md`. Simply uploading the ZIP as a chat attachment **does not** necessarily install the skills into your workspace.

Official documentation: https://antigravity.google/docs/skills

## Why no Three.js?
A cinematic feel can be achieved with architecture photography, excellent typography, GSAP reveals, parallax and subtle editorial scene transitions. Three.js is only worth adding when you specifically want 3D apartments, virtual tours or live 3D models.
