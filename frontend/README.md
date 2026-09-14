# Mohammed Wadudul Islam — Portfolio

A standalone static portfolio built with HTML, CSS, and JavaScript.

## Open the website

Double-click `index.html`, or right-click it and choose Safari or Chrome. No installation, Node.js, npm, or build command is required.

## Project structure

```text
frontend/
├── index.html                 # Page content and structure
├── assets/
│   ├── css/style.css         # Design, responsive layout, and themes
│   ├── js/main.js            # Theme control, media previews, and scroll reveals
│   ├── js/theme-init.js      # Loads the saved theme before display
│   └── images/               # Favicon, social image, and project images
├── legacy-next/              # Preserved earlier Next.js version
└── .openai/                  # Hosting configuration
```

The light/dark preference is saved in the visitor's browser. Without a saved preference, the website follows the device's appearance setting. The site also includes sticky responsive navigation, active section highlighting, accessible mobile controls, scroll reveals, YouTube previews, and expandable Spotify players on small screens.

YouTube thumbnails, hover previews, and Spotify players require an internet connection. The rest of the static website can be opened locally.

## GitHub Pages

The `.github/workflows/pages.yml` workflow publishes `index.html` and `assets/` to GitHub Pages when those files change on `main`. It can also be run manually from the Actions tab. The legacy application and reference files are excluded from the published site.

In the repository's Settings > Pages, the publishing source must be **GitHub Actions**.

Expected public URL after the first successful deployment: https://syedwadud.github.io/Portfolio-Project/
