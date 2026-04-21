# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mechanicon is the website for Europe's biggest mechanical keyboard meetup, held in Frankfurt am Main. The site is at https://mechanicon.io.

## Tech Stack

- **Static site generator:** Jekyll 4.3 (Ruby 3.2.6 via `.tool-versions`)
- **CSS:** Custom SCSS design system compiled by Jekyll's Sass pipeline into a single `styles.css`
- **Fonts:** D-DIN Condensed Bold (display) + Fira Code (mono body), both self-hosted in `assets/css/fonts/` under SIL Open Font License
- **Ticketing:** Tito (embedded widget via `js.tito.io`)
- **Hosting:** Netlify (manual deploys via CLI)

## Development Commands

```sh
# Install dependencies
bundle install
yarn install

# Local dev server (auto-rebuilds on changes, but NOT on _config.yml changes)
bundle exec jekyll serve

# Build for production
bundle exec jekyll build

# Deploy to Netlify (requires NETLIFY_AUTH_TOKEN env var)
yarn run netlify deploy --dir ./_site
```

## Architecture

### Layouts

- `_layouts/default.html` — base layout: loads `styles.css`, includes topnav + footer, renders `{{ content }}`
- `_layouts/archive.html` — extends default; used by all year pages (2016–2025). Renders gradient subheader, year-strip nav, impressions links from `history.yml`, sponsor grid from per-year data, then `{{ content }}` (schedule), and the shared stay section.

### Homepage (`index.html`)

The homepage is composed entirely of include calls to partials in `_includes/sections/`:

- `hero.html` — gradient hero with event date, specs, CTAs
- `about.html` — about text with subheadlines, sidebar boxes (features + ASCII bar chart of attendees)
- `history.html` — grid of gradient year cards linking to archive pages
- `video.html` — YouTube embed (recap video)
- `venue.html` — venue map image + info card with address/access/parking
- `sponsors.html` — sponsor image grid from `_data/sponsors.yml`
- `schedule.html` — color-coded schedule rows with type badges
- `faq.html` — collapsible `<details>` accordion
- `stay.html` — Discord + newsletter cards (reused on archive pages via `{% include sections/stay.html num="04" %}`)

### Shared Includes

- `_includes/topnav.html` — sticky nav with scrollspy, mobile burger menu. Detects homepage vs subpages for link prefixes.
- `_includes/site_footer.html` — footer with imprint link, social icons (Discord, newsletter, Instagram)
- `_includes/newsletter.html` — Mailjet newsletter embed iframe

### Pages

- Year pages (`2016.html`–`2025.html`) — use `layout: archive` with frontmatter: `year`, `year_key`, `gradient`, `stay_num`. Pages with schedules (2023–2025) have schedule HTML in their content block.
- `imprint.html` — German legal text (Datenschutzerklarung/DSGVO), styled with `.imprint` class
- `newsletter.html`, `newsletter-signup-success.html`, `404.html` — standalone pages using default layout
- `discord.html`, `donate.html`, `feedback.html` — redirect pages via `jekyll-redirect-from`

### Data Files (`_data/`)

- `sponsors.yml` — current year's sponsors. Fields: `name`, `website`, `image_path`, `box_background`. The `box_background` value maps to CSS classes (e.g., `sponsor-tile--pink-purple`, `sponsor-tile--pure-white`, `sponsor-tile--42-keebs`).
- `sponsors_2023.yml`, `sponsors_2024.yml`, `sponsors_2025.yml` — archived sponsor lists (same format)
- `history.yml` — keyed by `year_YYYY`. Contains date, venue, RSVP counts, and community links for each past edition.

### Styles (`assets/css/`)

- `styles.scss` — entry point with Jekyll frontmatter, imports the two partials
- `_colors_and_type.scss` — design tokens (CSS custom properties `--mc-*`), font faces, base reset, typography classes (`mc-hero`, `mc-h1`–`mc-h3`, `mc-body`, `mc-spec`, `mc-small`), background/gradient utilities, card/CTA/link components
- `_site.scss` — page-level layout styles: topnav, hero, sections, about grid, history grid, video card, venue, sponsor grid, schedule rows, FAQ accordion, stay cards, footer, archive pages, imprint, responsive breakpoints

CSS class conventions:
- Design system tokens: `--mc-*` custom properties
- Component classes: `mc-*` (e.g., `mc-cta`, `mc-card`, `mc-text-pink`)
- Page components: BEM-style (e.g., `.topnav__links`, `.year-card--green`, `.sched-row--talk`)
- Sponsor backgrounds: `.sponsor-tile--{box_background}` mapped from data

### JavaScript (`assets/js/main.js`)

Handles topnav scroll state (`.is-scrolled`), scrollspy for section highlighting, and mobile burger menu toggle. No build step — plain JS.

### Sponsor Data Conventions

When editing sponsor data files, preserve the existing fields (`name`, `website`, `image_path`, `box_background`). The `box_background` values must have matching CSS classes in `_site.scss` under `.sponsor-tile--*`. Current values: `pure-white`, `pure-black`, `pure-grey`, `yellow-pink`, `pink-purple`, `cyan-green`, `purple-cyan`, `orange-yellow`, `42-keebs`, `monkeytype`, `kamo`, `uhk`, `yuzu`.

### Archive Page Conventions

Section numbers are sequential per page. The layout provides `01` for impressions and `02` for sponsors. Schedule/talks content in year pages continues from there. The `stay_num` frontmatter value sets the number for the trailing stay section.
