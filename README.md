# faysal.me - Personal Static Website

A fast static website and developer blog for [faysal.me](https://faysal.me/), migrated from WordPress to a **Vite + Tailwind CSS v4 + Alpine.js + Markdown** architecture designed for deployment on **Cloudflare Pages**.

---

## 🚀 Tech Stack

- **[Vite](https://vite.dev/)** – Fast build tool and development server with instant HMR.
- **[Tailwind CSS v4](https://tailwindcss.com/)** – Utility-first modern CSS with responsive layouts and typography.
- **[Alpine.js](https://alpinejs.dev/)** – Lightweight JavaScript for client-side interactions (e.g. mobile navigation).
- **[Markdown (Marked + Gray-Matter)](https://marked.js.org/)** – Write posts in standard Markdown with YAML frontmatter.
- **[PrismJS](https://prismjs.com/)** – Code syntax highlighting for PHP, JavaScript, Bash, CSS, Markup.

---

## 📁 Project Directory Structure

```text
├── content/                     # All your content in human-readable files
│   ├── posts/                   # Individual blog post .md files
│   │   ├── 2020-07-17-add-readme-in-your-github-profile.md
│   │   ├── 2020-01-27-it-doesnt-have-to-be-crazy-at-work.md
│   │   ├── 2020-01-21-code-statistics-of-laravel-application.md
│   │   └── ...
│   ├── pages/
│   │   └── about.md             # About page Markdown content
│   └── data/                    # Structured site data
│       ├── site.json            # Site title, author, navigation, and social links
│       ├── resume.json          # Experience, education, skills, dev setup
│       └── categories.json      # Category definitions
│
├── public/                      # Static assets copied directly to dist/
│   ├── assets/images/           # Avatar and SVG social icons
│   ├── _headers                 # Cloudflare Pages security and cache headers
│   ├── _redirects               # 301 redirects for legacy URLs
│   ├── favicon.svg              # SVG favicon
│   ├── favicon.ico              # Fallback favicon
│   ├── feed.xml                 # RSS feed (auto-generated)
│   ├── robots.txt               # Robots.txt
│   └── sitemap.xml              # XML Sitemap (auto-generated)
│
├── scripts/
│   └── generate.js              # Compiles Markdown & data into static HTML pages
│
├── src/
│   ├── main.js                  # JavaScript entry point (Alpine.js + PrismJS)
│   └── style.css                # Tailwind CSS imports & custom styles
│
├── index.html                   # Compiled Home page
├── about/                       # Compiled About page
├── blog/                        # Compiled Blog archive
├── resume/                      # Compiled Resume page
├── page/2/                      # Compiled pagination page
├── [post-slug]/                 # 11 compiled individual post pages
├── category/[slug]/             # 4 compiled category archive pages
├── author/devfaysal/            # Compiled author archive page
├── 404.html                     # Custom 404 Not Found page
├── package.json
└── vite.config.js               # Multi-page automatic discovery config
```

---

## ✍️ How to Write a New Blog Post

To add a new blog post, simply create a new `.md` file inside `content/posts/`, e.g. `content/posts/2026-10-03-my-new-post.md`:

```markdown
---
title: "Building Static Sites with Vite and Tailwind"
date: "2026-10-03"
slug: "building-static-sites-with-vite-and-tailwind"
categories: ["Programming", "Web Development"]
excerpt: "How I migrated my WordPress site to a blazing-fast static site on Cloudflare Pages."
draft: false
---

Write your article here in standard Markdown!

### Features:
- Regular paragraphs and bullet points
- [Links](https://faysal.me)
- Blockquotes

```php
// Fenced code blocks with language support
echo "Hello from Laravel!";
```
```

When you save or run `npm run dev` / `npm run build`, your new post is automatically compiled into:
- `/{slug}/index.html` (the post's dedicated URL)
- Added to the `/` Home and `/blog/` listings (ordered newest first)
- Added to its respective `/category/{slug}/` pages
- Added to `sitemap.xml` and `feed.xml`!

---

## 🛠️ Development & Building

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development Server
Starts the Vite dev server with instant hot-reload:
```bash
npm run dev
```

### 3. Build for Production
Compiles all Markdown files and data into static HTML and bundles optimized assets into `dist/`:
```bash
npm run build
```

### 4. Preview Built Site
Test the production build locally:
```bash
npm run preview
```

---

## ☁️ Cloudflare Pages Deployment

When linking this repository to **Cloudflare Pages**:

| Setting | Value |
|---|---|
| **Framework preset** | `None` (or `Vite`) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` |

Every git commit or merged pull request to your main branch will automatically trigger Cloudflare Pages to build and deploy your site in seconds!
