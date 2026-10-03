import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

marked.setOptions({
  gfm: true,
  breaks: true,
});

const icons = {
  location: `<svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  phone: `<svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
  email: `<svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  github: `<svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  twitter: `<svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  globe: `<svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`,
  clock: `<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  calendar: `<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  arrowRight: `<svg class="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>`,
  arrowLeft: `<svg class="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>`,
};

const socialIcons = {
  github: `<svg class="w-[18px] h-[18px] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  twitter: `<svg class="w-[18px] h-[18px] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  facebook: `<svg class="w-[18px] h-[18px] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  rss: `<svg class="w-[18px] h-[18px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>`,
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const clean = dateStr.split('T')[0];
  const [year, month, day] = clean.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[month - 1]} ${day}, ${year}`;
}

function calculateReadingTime(text) {
  if (!text) return '1 min read';
  const cleanText = text.replace(/<[^>]+>/g, '').replace(/[#*`_~]/g, '');
  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function loadData() {
  const site = JSON.parse(fs.readFileSync(path.join(rootDir, 'content/data/site.json'), 'utf-8'));
  const categoriesData = JSON.parse(fs.readFileSync(path.join(rootDir, 'content/data/categories.json'), 'utf-8'));
  const resume = JSON.parse(fs.readFileSync(path.join(rootDir, 'content/data/resume.json'), 'utf-8'));
  
  const aboutFile = fs.readFileSync(path.join(rootDir, 'content/pages/about.md'), 'utf-8');
  const { data: aboutMeta, content: aboutContent } = matter(aboutFile);
  const aboutHtml = marked.parse(aboutContent);

  const categoryMap = new Map();
  for (const cat of categoriesData) {
    categoryMap.set(cat.name.toLowerCase(), cat);
    categoryMap.set(cat.slug.toLowerCase(), cat);
  }

  function resolveCategory(catName) {
    const found = categoryMap.get(catName.toLowerCase());
    if (found) return found;
    const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return { name: catName, slug: slug, url: `/category/${slug}/` };
  }

  const postsDir = path.join(rootDir, 'content/posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const posts = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const { data, content } = matter(raw);
    if (data.draft) continue;

    const rawCats = Array.isArray(data.categories)
      ? data.categories
      : (data.category ? [data.category] : []);
    const cats = rawCats.map(resolveCategory);
    const postDate = typeof data.date === 'string' ? data.date : data.date.toISOString().split('T')[0];
    const htmlContent = marked.parse(content);
    const excerpt = data.excerpt || content.slice(0, 200).replace(/[#*`_]/g, '') + '...';
    const readingTime = calculateReadingTime(content);

    posts.push({
      title: data.title,
      date: postDate,
      formatted_date: formatDate(postDate),
      reading_time: readingTime,
      slug: data.slug,
      url: `/${data.slug}/`,
      categories: cats,
      excerpt: excerpt,
      content: htmlContent,
      file: file
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { site, categories: categoriesData, resume, aboutMeta, aboutHtml, posts };
}

function renderLayout({ site, title, description, url, activeNav, content, ogType = 'website', extraMeta = '', jsonLd = null, isProd = false, cssFile = null, jsFile = null }) {
  const pageTitle = title ? `${title} | ${site.name}` : site.title;
  const pageDesc = description || site.heroSubtitle;
  const canonical = `${site.url}${url || '/'}`;

  // Default JSON-LD schema (Person & WebSite)
  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        "url": site.url,
        "name": site.name,
        "description": site.heroSubtitle,
        "publisher": {
          "@id": `${site.url}/#person`
        }
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        "name": site.name,
        "url": site.url,
        "image": `${site.url}${site.author.avatar}`,
        "jobTitle": site.tagline,
        "sameAs": [
          site.social.github,
          site.social.twitter,
          site.social.facebook
        ]
      }
    ]
  };

  const activeJsonLd = jsonLd || defaultSchema;

  // Assets in dev vs prod
  const assetTags = isProd && cssFile && jsFile
    ? `  <link rel="stylesheet" crossorigin href="${cssFile}">
  <script type="module" crossorigin src="${jsFile}"></script>`
    : `  <link rel="stylesheet" href="/src/style.css">
  <script type="module" src="/src/main.js"></script>`;

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="alternate" type="application/rss+xml" title="${site.name} Feed" href="${site.url}/feed.xml">
  
  <!-- Prevent FOUC: Theme Initializer -->
  <script>
    (function() {
      try {
        const theme = localStorage.getItem('theme');
        const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  </script>
  
  <!-- Open Graph / Social Media -->
  <meta property="og:locale" content="en_US">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${pageDesc}">
  <meta property="og:image" content="${site.url}${site.author.avatar}">
  <meta property="og:site_name" content="${site.name}">
  ${extraMeta}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@devfaysal">
  <meta name="twitter:creator" content="@devfaysal">
  <meta name="twitter:title" content="${pageTitle}">
  <meta name="twitter:description" content="${pageDesc}">
  <meta name="twitter:image" content="${site.url}${site.author.avatar}">
  
  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
${JSON.stringify(activeJsonLd, null, 2)}
  </script>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
${assetTags}

  <script type="speculationrules">
  {
    "prerender": [
      {
        "source": "document",
        "where": {
          "href_matches": "/*"
        },
        "eagerness": "moderate"
      }
    ]
  }
  </script>
</head>
<body class="bg-zinc-50 dark:bg-[#0c0d0e] text-zinc-800 dark:text-zinc-200 font-sans min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-200">
  
  <!-- Modern Minimalist Sticky Header -->
  <header class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-[#0c0d0e]/80 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        
        <!-- Left Brand / Logo -->
        <a href="/" class="flex items-center gap-2.5 group">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" title="Available for projects"></span>
          <span class="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
            ${site.name}
          </span>
          <span class="text-zinc-300 dark:text-zinc-700 hidden sm:inline select-none">/</span>
          <span class="text-xs text-zinc-500 dark:text-zinc-400 font-mono hidden sm:inline">
            ${site.tagline}
          </span>
        </a>

        <!-- Desktop Navigation & Theme Toggler -->
        <div class="flex items-center gap-1 sm:gap-2">
          <nav class="hidden sm:flex items-center gap-1">
            ${site.nav.map(item => {
              const isActive = activeNav === item.name;
              return `<a href="${item.url}" class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isActive 
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }">${item.name}</a>`;
            }).join('')}
          </nav>

          <div class="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block mx-1"></div>

          <!-- Theme Toggle Button -->
          <button 
            type="button" 
            data-theme-toggle 
            class="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors focus:outline-none"
            aria-label="Toggle dark mode"
          >
            <!-- Sun icon (shown in dark mode) -->
            <svg class="w-5 h-5 hidden dark:block text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <!-- Moon icon (shown in light mode) -->
            <svg class="w-5 h-5 block dark:hidden text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>

          <!-- Mobile Hamburger Toggle -->
          <div class="sm:hidden" x-data="{ open: false }">
            <button 
              type="button" 
              @click="open = !open" 
              class="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" x-show="!open">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" x-show="open" x-cloak style="display: none;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Mobile Slide Down Drawer -->
            <div 
              x-show="open" 
              x-cloak
              @click.outside="open = false" 
              x-transition:enter="transition ease-out duration-150"
              x-transition:enter-start="opacity-0 -translate-y-2"
              x-transition:enter-end="opacity-100 translate-y-0"
              class="absolute left-0 right-0 top-16 bg-white/95 dark:bg-[#0c0d0e]/95 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex flex-col gap-1 shadow-lg"
              style="display: none;"
            >
              ${site.nav.map(item => {
                const isActive = activeNav === item.name;
                return `<a href="${item.url}" class="px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive 
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold' 
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }">${item.name}</a>`;
              }).join('')}
            </div>
          </div>

        </div>

      </div>
    </div>
  </header>
  
  <!-- Main Page Content -->
  <main class="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    ${content}
  </main>
  
  <!-- Modern Minimalist Footer -->
  <footer class="w-full border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-[#0c0d0e]/50 py-10 transition-colors">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span class="text-sm text-zinc-500 dark:text-zinc-400">
            © ${new Date().getFullYear()} ${site.name}. All rights reserved.
          </span>
        </div>

        <!-- Social Icons -->
        <div class="flex items-center gap-2 sm:gap-2.5 text-zinc-600 dark:text-zinc-300">
          <a href="${site.social.github}" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs transition-all hover:scale-105" aria-label="GitHub" title="GitHub">
            <span class="sr-only">GitHub</span>
            ${socialIcons.github}
          </a>
          <a href="${site.social.twitter}" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs transition-all hover:scale-105" aria-label="Twitter" title="Twitter / X">
            <span class="sr-only">Twitter</span>
            ${socialIcons.twitter}
          </a>
          <a href="${site.social.facebook}" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs transition-all hover:scale-105" aria-label="Facebook" title="Facebook">
            <span class="sr-only">Facebook</span>
            ${socialIcons.facebook}
          </a>
          <a href="/feed.xml" class="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs transition-all hover:scale-105" aria-label="RSS Feed" title="RSS Feed">
            <span class="sr-only">RSS</span>
            ${socialIcons.rss}
          </a>
        </div>

      </div>
    </div>
  </footer>
  
</body>
</html>`;
}

function renderPostCard(post) {
  const primaryCat = post.categories && post.categories.length > 0 ? post.categories[0] : null;

  return `
  <article class="group relative bg-white dark:bg-[#121316] border border-zinc-200/90 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-7 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-lg dark:hover:shadow-zinc-950/40 transition-all duration-200">
    <div class="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
      ${primaryCat ? `
        <a href="${primaryCat.url}" class="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors">
          ${primaryCat.name}
        </a>
      ` : ''}
      <span class="inline-flex items-center gap-1.5 font-mono">
        ${icons.calendar}
        ${post.formatted_date}
      </span>
      <span class="inline-flex items-center gap-1.5 font-mono text-zinc-400 dark:text-zinc-500">
        •
      </span>
      <span class="inline-flex items-center gap-1.5 font-mono">
        ${icons.clock}
        ${post.reading_time}
      </span>
    </div>

    <h2 class="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug tracking-tight mb-2.5">
      <a href="${post.url}" class="after:absolute after:inset-0">
        ${post.title}
      </a>
    </h2>

    <p class="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4">
      ${post.excerpt}
    </p>

    <div class="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500">
      <span>Read article</span>
      ${icons.arrowRight}
    </div>
  </article>`;
}

export function renderPage(url, options = {}) {
  const data = loadData();
  const { site, categories, resume, aboutMeta, aboutHtml, posts } = data;
  const cleanUrl = url.replace(/\/index\.html$/, '/').replace(/\/index$/, '/');

  // 1. Home (/)
  if (cleanUrl === '/' || cleanUrl === '') {
    const homePosts = posts.slice(0, 10);
    const content = `
      <!-- Hero Section -->
      <section class="mb-14 sm:mb-16">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pb-10 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <img 
            src="${site.author.avatar}" 
            alt="${site.name}" 
            width="120"
            height="120"
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-emerald-500/10 shadow-md"
          >
          <div class="flex-1 space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for projects & consulting
            </div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              ${site.heroTitle}
            </h1>
            <p class="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              ${site.heroSubtitle}
            </p>
            
            <!-- Quick Actions & Social Links -->
            <div class="flex flex-wrap items-center gap-3 pt-3">
              <a href="/resume/" class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow-md transition-all">
                View Resume
                ${icons.arrowRight}
              </a>

              <div class="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block mx-1"></div>

              <div class="flex flex-wrap items-center gap-2">
                <a href="${site.social.github}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium bg-white dark:bg-[#121316] text-zinc-700 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-2xs hover:shadow-sm transition-all group" title="GitHub">
                  <span class="text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">${socialIcons.github}</span>
                  <span>GitHub</span>
                </a>
                <a href="${site.social.twitter}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium bg-white dark:bg-[#121316] text-zinc-700 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-2xs hover:shadow-sm transition-all group" title="X / Twitter">
                  <span class="text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">${socialIcons.twitter}</span>
                  <span>Twitter</span>
                </a>
                <a href="${site.social.facebook}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium bg-white dark:bg-[#121316] text-zinc-700 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800/80 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-2xs hover:shadow-sm transition-all group" title="Facebook">
                  <span class="text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">${socialIcons.facebook}</span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Latest Articles Section -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Latest Articles</h2>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Writings on Laravel, web architecture, and developer tips.</p>
        </div>

        <div class="grid grid-cols-1 gap-6">
          ${homePosts.map(renderPostCard).join('\n')}
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 mt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <span class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            Showing latest 10 of ${posts.length} articles
          </span>
          <div class="flex items-center gap-3">
            ${posts.length > 10 ? `
              <a href="/page/2/" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 transition-colors">
                Page 2
                ${icons.arrowRight}
              </a>
            ` : ''}
            <a href="/blog/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors group">
              <span>View All Articles</span>
              <span class="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>
    `;
    return renderLayout({ site, title: '', description: site.heroSubtitle, url: '/', activeNav: 'Home', content, ...options });
  }

  // 2. Page 2 (/page/2/)
  if (cleanUrl === '/page/2/') {
    const page2Posts = posts.slice(10);
    const content = `
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Older Entries</h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Page 2 of 2</p>
      </div>
      <div class="grid grid-cols-1 gap-6">
        ${page2Posts.map(renderPostCard).join('\n')}
      </div>
      <div class="flex justify-between items-center pt-8 mt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div></div>
        <a href="/" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 transition-colors">
          « Newer Entries
        </a>
      </div>
    `;
    return renderLayout({ site, title: 'Older Entries - Page 2', description: 'Older blog posts by Faysal Ahamed', url: '/page/2/', activeNav: 'Home', content, ...options });
  }

  // 3. Blog (/blog/)
  if (cleanUrl === '/blog/') {
    const content = `
      <div class="mb-10">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Blog</h1>
        <p class="text-base text-zinc-600 dark:text-zinc-400 mt-2">Articles, tutorials, and development experiments.</p>
      </div>
      <div class="grid grid-cols-1 gap-6">
        ${posts.map(renderPostCard).join('\n')}
      </div>
    `;
    return renderLayout({ site, title: 'Blog', description: 'Articles and tutorials by Faysal Ahamed', url: '/blog/', activeNav: 'Blog', content, ...options });
  }

  // 4. About (/about/)
  if (cleanUrl === '/about/') {
    const content = `
      <div class="bg-white dark:bg-[#121316] p-6 sm:p-10 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-xs max-w-3xl mx-auto">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
          ${aboutMeta.title}
        </h1>
        <div class="post-content text-zinc-700 dark:text-zinc-300 leading-relaxed">
          ${aboutHtml}
        </div>
      </div>
    `;
    return renderLayout({ site, title: aboutMeta.title, description: aboutMeta.description, url: '/about/', activeNav: 'About', content, ...options });
  }

  // 5. Resume (/resume/) — print-friendly developer CV
  if (cleanUrl === '/resume/') {
    const contactHtml = resume.contact.map(c => {
      const icon = (icons[c.icon] || '').replace(/class="[^"]*"/, 'class="cv-icon"');
      const external = c.link && c.link.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
      const label = c.link ? `<a href="${c.link}"${external}>${c.label}</a>` : `<span>${c.label}</span>`;
      return `<li>${icon}${label}</li>`;
    }).join('');

    const experienceHtml = resume.experience.map(exp => `
      <li class="cv-job">
        <div class="cv-job-head">
          <h3 class="cv-role">${exp.role}</h3>
          <span class="cv-period">${exp.period}</span>
        </div>
        <p class="cv-company">${exp.company}</p>
        ${exp.highlights && exp.highlights.length ? `
          <ul class="cv-points">
            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>` : ''}
      </li>
    `).join('');

    const skillsHtml = resume.skills.map(s => {
      const items = Array.isArray(s.items) ? s.items : String(s.items).split(',').map(i => i.trim());
      return `
        <div class="cv-skill-group">
          <h3 class="cv-subheading">${s.category}</h3>
          <ul class="cv-chips">${items.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>
      `;
    }).join('');

    const educationHtml = resume.education.map(e => `
      <li>
        <div class="cv-edu-head">
          <strong>${e.degree}</strong>
          ${e.year ? `<span class="cv-period">${e.year}</span>` : ''}
        </div>
        <span class="cv-muted">${e.institution}</span>
      </li>
    `).join('');

    const content = `
      <div class="cv-toolbar no-print">
        <a href="/" class="cv-back">${icons.arrowLeft} Back to Home</a>
        <button type="button" onclick="window.print()" class="cv-print-btn">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          Print / Save as PDF
        </button>
      </div>

      <article class="cv">
        <div class="cv-header">
          <img src="${resume.avatar}" alt="${resume.name}" width="88" height="88" class="cv-avatar">
          <div class="cv-identity">
            <h1 class="cv-name">${resume.name}</h1>
            <p class="cv-title">${resume.title || site.tagline}</p>
            <ul class="cv-contact">${contactHtml}</ul>
          </div>
        </div>

        <div class="cv-body">
          <div class="cv-main">
            <section class="cv-section">
              <h2 class="cv-heading">Profile</h2>
              <p class="cv-summary">${resume.about}</p>
            </section>

            <section class="cv-section">
              <h2 class="cv-heading">Experience</h2>
              <ol class="cv-timeline">${experienceHtml}</ol>
            </section>
          </div>

          <aside class="cv-side">
            <section class="cv-section">
              <h2 class="cv-heading">Skills</h2>
              ${skillsHtml}
            </section>

            <section class="cv-section">
              <h2 class="cv-heading">Dev Setup</h2>
              <dl class="cv-setup">
                <dt>OS</dt><dd>${resume.devSetup.os}</dd>
                <dt>Editor</dt><dd>${resume.devSetup.ide}</dd>
                <dt>AI Agents</dt><dd>${resume.devSetup.aiAgent}</dd>
              </dl>
            </section>

            <section class="cv-section">
              <h2 class="cv-heading">Education</h2>
              <ul class="cv-education">${educationHtml}</ul>
            </section>
          </aside>
        </div>
      </article>
    `;
    return renderLayout({ site, title: 'Resume', description: resume.about, url: '/resume/', activeNav: 'Resume', content, ...options });
  }


  // 6. Single Post (/{slug}/)
  const postMatch = posts.find(p => p.url === cleanUrl || p.slug === cleanUrl.replace(/^\/|\/$/g, ''));
  if (postMatch) {
    const postIndex = posts.findIndex(p => p.slug === postMatch.slug);
    const prevPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
    const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;

    const content = `
      <article class="max-w-3xl mx-auto">
        <!-- Post Header -->
        <header class="mb-8 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div class="mb-4">
            <a href="/blog/" class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              ${icons.arrowLeft}
              Back to all articles
            </a>
          </div>

          <div class="flex flex-wrap items-center gap-2 mb-3">
            ${postMatch.categories.map(c => `
              <a href="${c.url}" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100 transition-colors">
                ${c.name}
              </a>
            `).join('')}
          </div>

          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4">
            ${postMatch.title}
          </h1>

          <div class="flex items-center gap-3 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            <img 
              src="${site.author.avatar}" 
              alt="${site.name}" 
              class="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-500/30"
            >
            <span><a href="/author/devfaysal/" class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">${site.name}</a></span>
            <span>•</span>
            <span class="inline-flex items-center gap-1">
              ${icons.calendar}
              ${postMatch.formatted_date}
            </span>
            <span>•</span>
            <span class="inline-flex items-center gap-1">
              ${icons.clock}
              ${postMatch.reading_time}
            </span>
          </div>
        </header>

        <!-- Post Body -->
        <div class="post-content text-zinc-700 dark:text-zinc-300">
          ${postMatch.content}
        </div>

        <!-- Post Navigation Links -->
        <div class="mt-14 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            ${prevPost ? `
              <a href="${prevPost.url}" class="group block p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500/50 bg-white dark:bg-[#121316] transition-all">
                <span class="text-xs text-zinc-400 font-mono flex items-center gap-1 mb-1">
                  ${icons.arrowLeft} Older Article
                </span>
                <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-1">
                  ${prevPost.title}
                </span>
              </a>
            ` : '<div></div>'}
          </div>
          <div>
            ${nextPost ? `
              <a href="${nextPost.url}" class="group block p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500/50 bg-white dark:bg-[#121316] sm:text-right transition-all">
                <span class="text-xs text-zinc-400 font-mono flex items-center justify-end gap-1 mb-1">
                  Newer Article ${icons.arrowRight}
                </span>
                <span class="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-1">
                  ${nextPost.title}
                </span>
              </a>
            ` : ''}
          </div>
        </div>

      </article>
    `;

    const extraMeta = `
  <meta property="article:published_time" content="${postMatch.date}T00:00:00Z">
  <meta property="article:author" content="${site.name}">
  ${postMatch.categories.map(c => `<meta property="article:section" content="${c.name}">`).join('\n  ')}
`;

    const postJsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": postMatch.title,
      "datePublished": `${postMatch.date}T00:00:00Z`,
      "dateModified": `${postMatch.date}T00:00:00Z`,
      "description": postMatch.excerpt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${site.url}${postMatch.url}`
      },
      "url": `${site.url}${postMatch.url}`,
      "author": {
        "@type": "Person",
        "name": site.name,
        "url": site.url
      },
      "publisher": {
        "@type": "Person",
        "name": site.name,
        "url": site.url,
        "image": `${site.url}${site.author.avatar}`
      },
      "image": `${site.url}${site.author.avatar}`,
      "articleSection": postMatch.categories.map(c => c.name).join(', ')
    };

    return renderLayout({ site, title: postMatch.title, description: postMatch.excerpt, url: postMatch.url, activeNav: 'Blog', ogType: 'article', extraMeta, jsonLd: postJsonLd, content, ...options });
  }

  // 7. Category Archive (/category/{slug}/)
  const catMatch = categories.find(c => c.url === cleanUrl || cleanUrl === `/category/${c.slug}/`);
  if (catMatch) {
    const catPosts = posts.filter(p => p.categories && p.categories.some(c => c.slug === catMatch.slug));
    const content = `
      <div class="mb-10">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 mb-2">
          Category Archive
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">${catMatch.name}</h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">${catPosts.length} article${catPosts.length === 1 ? '' : 's'} categorized under "${catMatch.name}"</p>
      </div>
      <div class="grid grid-cols-1 gap-6">
        ${catPosts.map(renderPostCard).join('\n')}
      </div>
    `;
    return renderLayout({ site, title: `${catMatch.name} Category`, description: `Articles in ${catMatch.name}`, url: catMatch.url, activeNav: 'Blog', content, ...options });
  }

  // 8. Author Archive (/author/devfaysal/)
  if (cleanUrl === '/author/devfaysal/') {
    const content = `
      <div class="mb-10">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 mb-2">
          Author Archive
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Posts by Faysal Ahamed</h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Showing all articles written by Faysal</p>
      </div>
      <div class="grid grid-cols-1 gap-6">
        ${posts.map(renderPostCard).join('\n')}
      </div>
    `;
    return renderLayout({ site, title: 'Posts by Faysal Ahamed', description: 'All blog posts written by Faysal Ahamed', url: '/author/devfaysal/', activeNav: 'Blog', content, ...options });
  }

  // 9. 404 Page
  if (cleanUrl === '/404.html' || cleanUrl === '/404') {
    const content = `
      <div class="text-center py-20">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 font-mono text-2xl font-bold mb-4">
          404
        </div>
        <h1 class="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">Page Not Found</h1>
        <p class="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist, has been removed, or was moved to another location.
        </p>
        <a href="/" class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl shadow-sm transition-colors">
          Return to Home
          ${icons.arrowRight}
        </a>
      </div>
    `;
    return renderLayout({ site, title: '404 - Page Not Found', description: 'Page not found', url: '/404.html', activeNav: '', content, ...options });
  }

  return null;
}

export function getAllPages(options = {}) {
  const data = loadData();
  const pages = [];

  // Home
  pages.push({ path: 'index.html', html: renderPage('/', options) });

  // Page 2
  if (data.posts.length > 10) {
    pages.push({ path: 'page/2/index.html', html: renderPage('/page/2/', options) });
  }

  // Blog
  pages.push({ path: 'blog/index.html', html: renderPage('/blog/', options) });

  // About
  pages.push({ path: 'about/index.html', html: renderPage('/about/', options) });

  // Resume
  pages.push({ path: 'resume/index.html', html: renderPage('/resume/', options) });

  // Posts
  for (const post of data.posts) {
    pages.push({ path: `${post.slug}/index.html`, html: renderPage(post.url, options) });
  }

  // Categories
  for (const cat of data.categories) {
    pages.push({ path: `category/${cat.slug}/index.html`, html: renderPage(cat.url, options) });
  }

  // Author
  pages.push({ path: 'author/devfaysal/index.html', html: renderPage('/author/devfaysal/', options) });

  // 404
  pages.push({ path: '404.html', html: renderPage('/404.html', options) });

  return { pages, data };
}
