# Christian Pottiez — UX Research Portfolio

Static, responsive portfolio prepared for GitHub Pages.

## Structure

- `index.html` — homepage
- `work/researchops/` — ResearchOps case
- `work/purchase-journey/` — strategic purchase-journey case
- `work/ai-research/` — AI-supported Research workflow
- `work/pdxs/` — continuous measurement case
- `share/` — optional application-specific entry page
- `assets/css/` — design system
- `assets/js/` — light interaction + share personalisation
- `assets/icons/` — reusable Slate & Sage SVG icons
- `assets/illustrations/` — diagrams and placeholders
- `assets/images/` — portrait placeholder
- `assets/slides/` — later reconstructed/redacted slides
- `assets/video/` — later synthetic-data screen recording

## Local preview

Open `index.html` in a browser.

For correct folder-routing behaviour, a tiny local web server is better:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

1. Create a repository, for example `christian-pottiez.github.io`.
2. Upload the content of this folder.
3. In GitHub: **Settings → Pages**.
4. Publish from the `main` branch / root.
5. The site is currently set to `noindex,nofollow` while it is a prototype.

## Personalised application link

Example:

`https://christian-pottiez.github.io/share/?company=Ramboll`

This changes the entry-page label only. It is **not password protection**.

## Confidentiality

The case content deliberately separates:
- role / method / operating model / impact that can be shared;
- confidential research results that stay abstract;
- reconstructed or anonymised visuals.

Do **not** upload confidential source files to a public GitHub repository.
