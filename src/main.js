import './style.css';
import Alpine from 'alpinejs';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';

window.Alpine = Alpine;
Alpine.start();

// Initialize Theme Toggle
function setupThemeToggle() {
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
  
  function updateTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      updateTheme(!isDark);
    });
  });

  // Listen to system preference changes if user hasn't set an explicit preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      updateTheme(e.matches);
    }
  });
}

// Add Copy-to-Clipboard & Header to Code Blocks
function setupCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach(pre => {
    // Avoid double wrapping
    if (pre.parentElement && pre.parentElement.classList.contains('code-block-wrapper')) {
      return;
    }

    const code = pre.querySelector('code') || pre;
    
    // Determine language from class
    let lang = 'code';
    const classes = (pre.className + ' ' + code.className).split(/\s+/);
    for (const cls of classes) {
      if (cls.startsWith('language-')) {
        lang = cls.replace('language-', '');
        break;
      }
    }
    if (lang === 'markup') lang = 'html';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper not-prose my-6';

    // Create header bar
    const header = document.createElement('div');
    header.className = 'code-block-header flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-400';

    const langSpan = document.createElement('span');
    langSpan.className = 'uppercase tracking-wider font-semibold text-emerald-400';
    langSpan.textContent = lang;

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'code-copy-btn inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors border border-zinc-700';
    copyBtn.innerHTML = `
      <svg class="w-3.5 h-3.5 copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
      <span class="copy-text">Copy</span>
    `;

    copyBtn.addEventListener('click', async () => {
      const textToCopy = code.innerText || pre.innerText;
      try {
        await navigator.clipboard.writeText(textToCopy);
        copyBtn.innerHTML = `
          <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span class="text-emerald-400 font-medium">Copied!</span>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg class="w-3.5 h-3.5 copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <span class="copy-text">Copy</span>
          `;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code: ', err);
      }
    });

    header.appendChild(langSpan);
    header.appendChild(copyBtn);

    // Insert wrapper before pre, then move header and pre inside
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  Prism.highlightAll();
  setupCodeBlocks();
});
