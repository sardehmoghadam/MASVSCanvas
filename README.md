# MASVS Academy

Static-first OWASP MASVS training portal built with Next.js, TypeScript, Tailwind CSS, and reusable content-driven components.

## Architecture
- `app/` contains the static export pages, layouts, and route-level UI.
- `components/` contains reusable presentation components and accessible building blocks.
- `content/` contains structured training data separate from presentation.
- `config/standard.ts` is the single source of truth for standard identity, id shapes, hierarchy, and levels.
- `types/` defines the content schema for future AI-assisted control generation.
- The project uses Next.js static export so it can be deployed to GitHub Pages or any static host.

## Content Model
Each control is a single MDX file in `content/controls/` with YAML frontmatter for structured
metadata (see `lib/content/schema.ts`) and a Markdown body for the educational narrative and
code examples.

MASVS 2.0.0 has 8 control groups (no section layer) and 22 controls:

- **MASVS-STORAGE** — Storage
- **MASVS-CRYPTO** — Cryptography
- **MASVS-AUTH** — Authentication and Authorization
- **MASVS-NETWORK** — Network Communication
- **MASVS-PLATFORM** — Platform Interaction
- **MASVS-CODE** — Code Quality
- **MASVS-RESILIENCE** — Resilience Against Reverse Engineering and Tampering
- **MASVS-PRIVACY** — Privacy

Control IDs follow the `MASVS-<GROUP>-<n>` pattern (e.g. `MASVS-STORAGE-1`), and each control is
tagged with MAS profile levels (`L1`, `L2`, and/or `R`).

## Adding a New Control
1. Create `content/controls/<slug>.mdx` with valid frontmatter (control ID, group, levels, tags, references).
2. Write the body using the seven-section template (What This Control Means, Why This Matters,
   Main Security Requirement, Common Failure Patterns, Secure Implementation, Key Rules,
   Checklist for Code Review).
3. Run `npm run build` to validate frontmatter against the schema and generate the page.

See `CONTRIBUTING.md` or the in-app Contribute page (`/contribute/`) for the full guide.

## Deployment
- Run `npm run build` to generate the static export.
- Deploy the generated output to GitHub Pages or any static file host.

## SEO
- Per-page metadata (title, description, Open Graph/Twitter, canonical) is generated from `lib/site-config.ts`.
- `app/robots.ts` and `app/sitemap.ts` emit `robots.txt` and `sitemap.xml` on the static export.
- Icons are served from `app/icon.svg`, `app/icon.png` (512px), and `app/apple-icon.png` (180px).
  Regenerate the raster icons with `node scripts/generate-icons.mjs`.
- Structured data (JSON-LD): site-wide `WebSite`/`Organization` (root layout), `BreadcrumbList`
  (category/control pages), and `TechArticle` + `LearningResource` per control.
- Search Console: add your Google verification token as a repository variable named
  `GOOGLE_SITE_VERIFICATION` (Settings > Secrets and variables > Actions > Variables), then
  redeploy. CI injects it into the `google-site-verification` meta tag.
- Analytics: add your GA4 Measurement ID (`G-XXXXXXXXXX`) as a repository variable named
  `GA_MEASUREMENT_ID`, then redeploy. CI injects it into the gtag.js loader in
  `components/analytics.tsx`; when the variable is absent no analytics script is emitted.

## Notes
- Search is powered by a build-time static index (`lib/search.ts`) covering every control's id, title, summary, group, levels, tags, references, and related controls.
- The design system is intentionally small and reusable so content can scale without redesigning page templates.
