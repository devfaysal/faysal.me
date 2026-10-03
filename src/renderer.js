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
  location: `<svg class="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  phone: `<svg class="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
  email: `<svg class="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  github: `<svg class="w-5 h-5 text-gray-700 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  twitter: `<svg class="w-5 h-5 text-gray-700 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  globe: `<svg class="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const clean = dateStr.split('T')[0];
  const [year, month, day] = clean.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[month - 1]} ${day}, ${year}`;
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

    posts.push({
      title: data.title,
      date: postDate,
      formatted_date: formatDate(postDate),
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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="alternate" type="application/rss+xml" title="${site.name} Feed" href="${site.url}/feed.xml">
  
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
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
  
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
<body class="bg-[#f1f5f9] text-[#444444] font-sans min-h-screen flex flex-col antialiased">
  
  <header class="w-full pt-8 pb-4">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      
      <div class="flex items-center gap-5 sm:gap-7">
        <a href="/" class="block flex-shrink-0 group">
          <img 
            src="${site.author.avatar}" 
            alt="${site.name}" 
            fetchpriority="high"
            decoding="async"
            width="120"
            height="120"
            class="w-24 h-24 sm:w-28 sm:h-28 md:w-[120px] md:h-[120px] rounded-full object-cover shadow-sm ring-2 ring-white/80 group-hover:scale-105 transition-transform duration-200"
          >
        </a>
        <div class="flex-1">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            <a href="/" class="hover:text-[#2ea3f2] transition-colors">${site.name}</a>
          </h1>
          <p class="text-base sm:text-lg text-gray-600 mt-1 font-normal">${site.tagline}</p>
          
          <div class="flex items-center gap-3.5 mt-2.5">
            <a href="${site.social.facebook}" target="_blank" rel="noopener noreferrer" class="opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-150" aria-label="Facebook">
              <img src="/assets/images/facebook.svg" alt="Facebook" class="w-5 h-5">
            </a>
            <a href="${site.social.twitter}" target="_blank" rel="noopener noreferrer" class="opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-150" aria-label="X / Twitter">
              <img src="/assets/images/twitter.svg" alt="Twitter" class="w-5 h-5">
            </a>
            <a href="${site.social.github}" target="_blank" rel="noopener noreferrer" class="opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-150" aria-label="GitHub">
              <img src="/assets/images/github.svg" alt="GitHub" class="w-5 h-5">
            </a>
          </div>
        </div>
      </div>
      
      <div class="border-y border-gray-400/50 mt-6 sm:mt-7" x-data="{ open: false }">
        <div class="flex items-center justify-between sm:justify-center py-2 sm:py-2.5">
          <nav class="hidden sm:flex items-center justify-center gap-1 sm:gap-2">
            ${site.nav.map(item => {
              const isActive = activeNav === item.name;
              return `<a href="${item.url}" class="px-4 py-1 text-[16px] transition-colors ${isActive ? 'font-bold text-[#2ea3f2]' : 'font-normal text-gray-800 hover:text-[#2ea3f2]'}">${item.name}</a>`;
            }).join('')}
          </nav>
          
          <span class="sm:hidden text-sm font-medium text-gray-600">Menu</span>
          <button 
            type="button" 
            @click="open = !open" 
            class="sm:hidden p-1.5 text-gray-700 hover:text-[#2ea3f2] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" x-show="!open">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" x-show="open" x-cloak style="display: none;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div 
          x-show="open" 
          x-cloak
          @click.outside="open = false" 
          x-transition:enter="transition ease-out duration-150"
          x-transition:enter-start="opacity-0 -translate-y-1"
          x-transition:enter-end="opacity-100 translate-y-0"
          class="sm:hidden border-t border-gray-300/80 py-2 flex flex-col"
          style="display: none;"
        >
          ${site.nav.map(item => {
            const isActive = activeNav === item.name;
            return `<a href="${item.url}" class="px-3 py-2 text-base ${isActive ? 'font-bold text-[#2ea3f2] bg-slate-200/60' : 'text-gray-800 hover:text-[#2ea3f2]'}">${item.name}</a>`;
          }).join('')}
        </div>
      </div>
      
    </div>
  </header>
  
  <main class="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
    ${content}
  </main>
  
  <footer class="w-full bg-[#2e3740] text-gray-300 py-6 mt-12 text-center text-sm">
    <div class="max-w-4xl mx-auto px-4">
      <p>© ${new Date().getFullYear()} ${site.name}</p>
    </div>
  </footer>
  
</body>
</html>`;
}

function renderPostMeta(post) {
  const catLinks = post.categories && post.categories.length > 0
    ? post.categories.map(c => `<a href="${c.url}" class="text-[#2ea3f2] hover:underline">${c.name}</a>`).join(', ')
    : 'Uncategorized';
  
  return `<p class="text-sm text-gray-500 mb-3">
    by <a href="/author/devfaysal/" class="text-gray-600 hover:text-[#2ea3f2]">Faysal Ahamed</a>
    <span class="mx-1.5 text-gray-400">|</span>
    <span>${post.formatted_date}</span>
    <span class="mx-1.5 text-gray-400">|</span>
    <span>${catLinks}</span>
  </p>`;
}

function renderPostCard(post) {
  return `<article class="mb-10 pb-8 border-b border-gray-200/80 last:border-b-0 last:mb-0 last:pb-0">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug">
      <a href="${post.url}" class="hover:text-[#2ea3f2] transition-colors">${post.title}</a>
    </h2>
    ${renderPostMeta(post)}
    <div class="text-gray-600 text-base leading-relaxed">
      <p>${post.excerpt}</p>
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
      <div class="mb-10 sm:mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">${site.heroTitle}</h2>
        <p class="text-base sm:text-lg text-gray-600 leading-relaxed">${site.heroSubtitle}</p>
      </div>
      <div class="space-y-6">
        ${homePosts.map(renderPostCard).join('\n')}
      </div>
      ${posts.length > 10 ? `
      <div class="flex justify-between items-center pt-8 mt-10 border-t border-gray-200">
        <a href="/page/2/" class="text-[#2ea3f2] hover:underline font-medium text-sm">« Older Entries</a>
        <div></div>
      </div>` : ''}
    `;
    return renderLayout({ site, title: '', description: site.heroSubtitle, url: '/', activeNav: 'Home', content, ...options });
  }

  // 2. Page 2 (/page/2/)
  if (cleanUrl === '/page/2/') {
    const page2Posts = posts.slice(10);
    const content = `
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-1">Older Entries</h2>
        <p class="text-sm text-gray-500">Page 2 of 2</p>
      </div>
      <div class="space-y-6">
        ${page2Posts.map(renderPostCard).join('\n')}
      </div>
      <div class="flex justify-between items-center pt-8 mt-10 border-t border-gray-200">
        <div></div>
        <a href="/" class="text-[#2ea3f2] hover:underline font-medium text-sm">« Newer Entries</a>
      </div>
    `;
    return renderLayout({ site, title: 'Older Entries - Page 2', description: 'Older blog posts by Faysal Ahamed', url: '/page/2/', activeNav: 'Home', content, ...options });
  }

  // 3. Blog (/blog/)
  if (cleanUrl === '/blog/') {
    const content = `
      <div class="space-y-6">
        ${posts.map(renderPostCard).join('\n')}
      </div>
    `;
    return renderLayout({ site, title: 'Blog', description: 'Articles and tutorials by Faysal Ahamed', url: '/blog/', activeNav: 'Blog', content, ...options });
  }

  // 4. About (/about/)
  if (cleanUrl === '/about/') {
    const content = `
      <div class="bg-white/70 p-6 sm:p-10 rounded-xl shadow-xs border border-gray-200/70 max-w-3xl">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">${aboutMeta.title}</h2>
        <div class="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed post-content">
          ${aboutHtml}
        </div>
      </div>
    `;
    return renderLayout({ site, title: aboutMeta.title, description: aboutMeta.description, url: '/about/', activeNav: 'About', content, ...options });
  }

  // 5. Resume (/resume/)
  if (cleanUrl === '/resume/') {
    const content = `
      <div class="bg-white/80 p-6 sm:p-10 rounded-xl shadow-xs border border-gray-200/70 space-y-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 items-start pb-8 border-b border-gray-200">
          <div class="md:col-span-1 flex justify-center md:justify-start">
            <img 
              src="${resume.avatar}" 
              alt="${resume.name}" 
              width="120"
              height="120"
              class="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
            >
          </div>
          <div class="md:col-span-3 space-y-3">
            <h1 class="text-3xl font-bold text-gray-900 leading-tight">${resume.name}</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-gray-700 pt-2">
              ${resume.contact.map(c => {
                const iconSvg = icons[c.icon] || '';
                const linkHtml = c.link 
                  ? `<a href="${c.link}" class="hover:text-[#2ea3f2] transition-colors truncate" ${c.link.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${c.label}</a>` 
                  : `<span class="truncate">${c.label}</span>`;
                return `
                  <div class="flex items-center gap-2.5 min-w-0" title="${c.label}">
                    ${iconSvg}
                    ${linkHtml}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start pb-8 border-b border-gray-200">
          <div class="md:col-span-1">
            <h2 class="text-xl font-bold text-gray-900">About me</h2>
          </div>
          <div class="md:col-span-3 text-base text-gray-700 leading-relaxed">
            <p>${resume.about}</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start pb-8 border-b border-gray-200">
          <div class="md:col-span-1">
            <h2 class="text-xl font-bold text-gray-900">Dev setup</h2>
          </div>
          <div class="md:col-span-3 text-base text-gray-700 space-y-1.5">
            <p><strong class="font-semibold text-gray-900">OS:</strong> ${resume.devSetup.os}</p>
            <p><strong class="font-semibold text-gray-900">IDE:</strong> ${resume.devSetup.ide}</p>
            <p><strong class="font-semibold text-gray-900">Browser:</strong> ${resume.devSetup.browser}</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start pb-8 border-b border-gray-200">
          <div class="md:col-span-1">
            <h2 class="text-xl font-bold text-gray-900">Experience</h2>
          </div>
          <div class="md:col-span-3 space-y-6">
            ${resume.experience.map(exp => `
              <div>
                <h3 class="text-lg font-bold text-gray-900">${exp.title}</h3>
                ${exp.description ? `<p class="text-gray-700 text-base mt-1">${exp.description}</p>` : ''}
                <p class="text-sm text-gray-500 mt-1 font-medium">${exp.period}</p>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start pb-8 border-b border-gray-200">
          <div class="md:col-span-1">
            <h2 class="text-xl font-bold text-gray-900">Education</h2>
          </div>
          <div class="md:col-span-3 space-y-4">
            ${resume.education.map(edu => `
              <div>
                <h3 class="text-base font-bold text-gray-900">${edu.degree}</h3>
                <p class="text-gray-600 text-sm mt-0.5">${edu.institution}</p>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start">
          <div class="md:col-span-1">
            <h2 class="text-xl font-bold text-gray-900">Skills</h2>
          </div>
          <div class="md:col-span-3 space-y-4">
            ${resume.skills.map(skill => `
              <div>
                <h3 class="text-base font-bold text-gray-900">${skill.category}</h3>
                <p class="text-gray-700 text-sm sm:text-base mt-0.5 leading-relaxed">${skill.items}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
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
      <article class="max-w-3xl">
        <header class="mb-6 pb-4 border-b border-gray-200">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">${postMatch.title}</h1>
          ${renderPostMeta(postMatch)}
        </header>
        <div class="post-content text-gray-700 text-base leading-relaxed">
          ${postMatch.content}
        </div>
        <div class="mt-12 pt-6 border-t border-gray-300 flex flex-col sm:flex-row justify-between gap-4 text-sm font-medium">
          <div>
            ${prevPost ? `<a href="${prevPost.url}" class="text-[#2ea3f2] hover:underline">« ${prevPost.title}</a>` : ''}
          </div>
          <div class="sm:text-right">
            ${nextPost ? `<a href="${nextPost.url}" class="text-[#2ea3f2] hover:underline">${nextPost.title} »</a>` : ''}
          </div>
        </div>
        <div class="mt-8 text-center">
          <a href="/blog/" class="inline-flex items-center text-sm font-medium text-gray-600 hover:text-[#2ea3f2] transition-colors">
            ← Back to Blog
          </a>
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
      <div class="mb-8">
        <div class="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Category Archive</div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">${catMatch.name}</h1>
      </div>
      <div class="space-y-6">
        ${catPosts.map(renderPostCard).join('\n')}
      </div>
    `;
    return renderLayout({ site, title: `${catMatch.name} Category`, description: `Articles in ${catMatch.name}`, url: catMatch.url, activeNav: 'Blog', content, ...options });
  }

  // 8. Author Archive (/author/devfaysal/)
  if (cleanUrl === '/author/devfaysal/') {
    const content = `
      <div class="mb-8">
        <div class="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Author Archive</div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Posts by Faysal Ahamed</h1>
      </div>
      <div class="space-y-6">
        ${posts.map(renderPostCard).join('\n')}
      </div>
    `;
    return renderLayout({ site, title: 'Posts by Faysal Ahamed', description: 'All blog posts written by Faysal Ahamed', url: '/author/devfaysal/', activeNav: 'Blog', content, ...options });
  }

  // 9. 404
  if (cleanUrl === '/404.html' || cleanUrl === '/404') {
    const content = `
      <div class="text-center py-16">
        <h1 class="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p class="text-gray-600 mb-6">The page you were looking for doesn't exist or has been moved.</p>
        <a href="/" class="inline-block px-5 py-2.5 bg-[#2ea3f2] text-white font-medium rounded-lg hover:bg-sky-600 transition-colors">
          Return Home
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
