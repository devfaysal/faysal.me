import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import { getAllPages, loadData } from '../src/renderer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

async function main() {
  console.log('--- Step 1: Building Assets with Vite ---');
  await build();

  console.log('--- Step 2: Finding Compiled Assets in dist/assets ---');
  const assetsDir = path.join(distDir, 'assets');
  const assetFiles = fs.readdirSync(assetsDir);

  const cssFileName = assetFiles.find(f => f.endsWith('.css') && (f.startsWith('main-') || f.startsWith('style-')));
  const jsFileName = assetFiles.find(f => f.endsWith('.js') && f.startsWith('main-'));

  if (!cssFileName || !jsFileName) {
    console.warn('Warning: Could not locate main CSS or JS in dist/assets:', assetFiles);
  }

  const cssFile = cssFileName ? `/assets/${cssFileName}` : '/src/style.css';
  const jsFile = jsFileName ? `/assets/${jsFileName}` : '/src/main.js';

  console.log(`Using production assets:\n  CSS: ${cssFile}\n  JS:  ${jsFile}`);

  console.log('--- Step 3: Generating Static HTML Pages into dist/ ---');
  const { pages, data } = getAllPages({
    isProd: true,
    cssFile,
    jsFile
  });

  for (const page of pages) {
    const targetPath = path.join(distDir, page.path);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, page.html, 'utf-8');
    console.log(`✓ dist/${page.path}`);
  }

  console.log('--- Step 4: Generating Sitemap and RSS Feed into dist/ ---');
  const { site, posts, categories } = data;

  // Sitemap
  const today = new Date().toISOString().split('T')[0];
  const latestPostDate = posts[0]?.date || today;

  const sitemapUrls = [
    { loc: `${site.url}/`, lastmod: latestPostDate, priority: '1.0', changefreq: 'daily' },
    { loc: `${site.url}/about/`, lastmod: today, priority: '0.8', changefreq: 'monthly' },
    { loc: `${site.url}/blog/`, lastmod: latestPostDate, priority: '0.9', changefreq: 'weekly' },
    { loc: `${site.url}/resume/`, lastmod: today, priority: '0.8', changefreq: 'monthly' },
    ...posts.map(p => ({ loc: `${site.url}${p.url}`, lastmod: p.date, priority: '0.7', changefreq: 'monthly' })),
    ...categories.map(c => ({ loc: `${site.url}${c.url}`, lastmod: latestPostDate, priority: '0.6', changefreq: 'weekly' })),
    { loc: `${site.url}/author/devfaysal/`, lastmod: latestPostDate, priority: '0.5', changefreq: 'weekly' }
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), sitemapXml, 'utf-8');
  console.log('✓ dist/sitemap.xml & public/sitemap.xml');

  // RSS Feed
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.title}</title>
    <link>${site.url}</link>
    <description>${site.heroSubtitle}</description>
    <language>en-US</language>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts.map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${site.url}${p.url}</link>
      <guid>${site.url}${p.url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt}]]></description>
    </item>`).join('')}
  </channel>
</rss>`;
  fs.writeFileSync(path.join(distDir, 'feed.xml'), rssXml, 'utf-8');
  console.log('✓ dist/feed.xml');

  console.log('\n✨ Build complete! All files generated strictly into dist/. Zero root HTML clutter.');
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
