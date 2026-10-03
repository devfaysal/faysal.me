import './style.css';
import Alpine from 'alpinejs';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-bash';

window.Alpine = Alpine;
Alpine.start();

document.addEventListener('DOMContentLoaded', () => {
  Prism.highlightAll();
});
