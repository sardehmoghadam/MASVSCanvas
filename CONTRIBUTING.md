# Contributing to MASVS Academy

## Goal
Create practical, reviewable MASVS training controls that are easy to extend with AI-generated drafts and human review.

## Where Content Lives
- Controls: `content/controls/*.mdx` (one file per control, frontmatter + Markdown body)
- Control groups: `content/categories.ts`
- Frontmatter schema: `lib/content/schema.ts` (Zod, validated at build time)
- Loader: `lib/content/loader.ts`

## Control Authoring Rules
- Keep content separate from page components — content is Markdown, never JSX page code.
- Use concise, practical language for engineering teams.
- Preserve the MASVS requirement text verbatim under `## Main Security Requirement`.
- Include at least one secure code example where possible.
- Mark new or unverified content as `reviewStatus: "draft"` until reviewed.
- Prefer official OWASP references and authoritative framework documentation.
- Use stable kebab-case slugs such as `masvs-storage-1`.

## Expected Frontmatter
Use `ControlFrontmatterSchema` in `lib/content/schema.ts`. Every control should include:

- `schemaVersion` (default `"1.0.0"`)
- `standardVersion` (defaults to the configured standard version)
- `controlId` (e.g. `MASVS-STORAGE-1`)
- `slug` (kebab-case)
- `title`
- `summary`
- `chapter` (`id: MASVS-STORAGE`, `title`)
- `levels` (array of level ids, e.g. `["L1", "L2"]`; resilience controls use `["R"]`)
- `tags`
- `difficulty` (`foundational` | `intermediate` | `advanced`)
- `reviewStatus` (`draft` | `reviewed` | `needs-update`)
- `references` (`{ label, url }[]`)
- `relatedControls` (`{ id, title, href }[]`)

Note: `chapter.id` is the group prefix derived from `controlId` (`MASVS-STORAGE` from
`MASVS-STORAGE-1`), so it must match exactly or the build will fail. MASVS 2.0.0 has no section
layer, so no `section` field is used.

## Body Template
Each control body uses seven `##` sections:

1. `## What This Control Means`
2. `## Why This Matters`
3. `## Main Security Requirement` (verbatim MASVS requirement as a blockquote)
4. `## Common Failure Patterns`
5. `## Secure Implementation`
6. `## Key Rules`
7. `## Checklist for Code Review`

Headings receive automatic IDs so they appear in the right-hand “On this page” sidebar.

## Reusable MDX Components
- `<Callout kind="note|warning|secure|insecure" title="...">…</Callout>` for highlighted guidance.
- Regular fenced code blocks, GFM tables, and lists work out of the box.
- References and related controls live in the frontmatter and render automatically.

## Review Checklist
- Control ID, group, and levels are correct and consistent.
- Code examples are safe and idiomatic.
- References are valid and relevant.
- No secrets or unsafe defaults are introduced.
- Build passes with `npm run build`.

## Commands
- `npm run dev` — local preview
- `npm run build` — static export plus schema/type/MDX validation (fails on invalid content)
- `npm run lint` — lint check
