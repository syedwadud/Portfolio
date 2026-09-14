# ChatGPT project context

This directory is a local mirror of the ChatGPT project “Projects”.

- Treat every file under `sources/` as read-only reference material.
- Do not edit, rename, move, or delete synced project files.
- These files may be replaced the next time a task is created from this ChatGPT project.

## Project instructions

### Active application

- This repository contains Mohammed Wadudul Islam's portfolio.
- The active website is a standalone static site in `frontend/`. Read `frontend/README.md` first.
- Edit page content and markup in `frontend/index.html`, styles in `frontend/assets/css/style.css`, interactions in `frontend/assets/js/main.js`, and early theme initialization in `frontend/assets/js/theme-init.js`.
- Images live in `frontend/assets/images/`. Keep asset URLs relative so the site works when opened directly from disk.
- `frontend/legacy-next/` preserves an earlier Next.js implementation. Work there only when the task specifically concerns that version.
- `tmp/` contains reference-processing artifacts, not application source.

### Setup and preview

- The active site needs no dependency installation, build step, or environment variables. Do not run the legacy npm scripts for the static site.
- Open `frontend/index.html` in a browser for a local preview. From Windows PowerShell at the repository root, use `Start-Process ./frontend/index.html`.
- YouTube previews and Spotify embeds need an internet connection.
- Hosting metadata is in `frontend/.openai/hosting.json`; consult it when a task concerns deployment.

### Implementation and verification

- Follow the existing plain HTML, CSS, and JavaScript conventions. Keep the static setup unless the requested work requires a different architecture.
- Preserve semantic markup, keyboard navigation, visible focus states, accessible control labels, reduced-motion support, and both light and dark themes.
- For JavaScript changes, run these syntax checks from the repository root when Node.js is available:
  - `node --check frontend/assets/js/main.js`
  - `node --check frontend/assets/js/theme-init.js`
- For UI changes, check the affected behavior in a browser at desktop and mobile widths, including the navigation and theme controls when relevant. Check the browser console and local asset loading.
- There is no automated test suite for the active static site. Syntax checks do not replace browser validation; report any checks that could not be completed.
- Run `git diff --check` before handing off changes. Keep changes focused and summarize what changed and how it was verified.
