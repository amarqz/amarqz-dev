# amarqz.dev Portfolio

A bilingual portfolio SPA-style web application built with Next.js App Router, React, TypeScript and Tailwind CSS.

This repository is the source of truth for personal content (experience, education, projects) rendered from JSON documents and localized dictionaries.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- MUI (icons + components)
- Docker (standalone output image)

## Project Goals

- Keep portfolio content easy to maintain through JSON documents.
- Support English and Spanish with route-based localization.
- Render sections from a reusable, data-driven component model.
- Prepare the codebase for an upcoming full UI redesign.

## Application Structure

- `src/app/[lang]/...`: localized routes and page/layout entry points.
- `src/dictionaries/*.json`: UI text and metadata for each language.
- `src/docs/*.json`: portfolio content by section and locale.
- `src/docs/documentation.ts`: dynamic loader that resolves `type + locale`.
- `src/components/*`: reusable section/subsection rendering components.
- `src/proxy.ts`: locale redirect proxy.
- `src/middleware/i18n.ts`: language negotiation (`Accept-Language`).

## Data Model (Current)

The current model is intentionally rigid and section-oriented:

- Sections: `experience`, `education`, `projects`.
- Each section has a JSON file per locale (`*-en.json`, `*-es.json`).
- Each JSON object key is an item id and value shape is section-specific.

This gives predictable rendering and simple editing, but it also constrains layout freedom. That tradeoff is acceptable for now and will be revisited in the redesign phase.

## How to Edit Portfolio Content

1. Update `src/docs/*-en.json` and `src/docs/*-es.json` with matching item ids and translated content.
2. Update labels/tooltips/meta text in `src/dictionaries/en.json` and `src/dictionaries/es.json`.
3. If you add a new section type, include:
   - new docs files for each locale,
   - loader entry in `src/docs/documentation.ts`,
   - section mapping in `src/app/[lang]/page.tsx`,
   - UI support in section components.

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

Other scripts:

```bash
npm run lint
npm run build
npm run start
```

## Docker

The project is configured for `output: "standalone"` and includes a multi-stage Dockerfile.

Build image:

```bash
docker build -t amarqz-dev .
```

Run container:

```bash
docker run --rm -p 3000:3000 amarqz-dev
```

