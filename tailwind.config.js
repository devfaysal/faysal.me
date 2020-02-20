module.exports = {
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      mono: ['IBM Plex Mono', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      serif: ['Merriweather', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      slab: [
        'Zilla Slab',

        // Fall back to sans-serif stack
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
    extend: {
      colors: {
        twitter: '#1da1f2',
        github: '#4078c0',
        facebook: '#4267b2',
      },
      screens: {
        'print': { 'raw': 'print' },
      }
    }
  },
  variants: {},
  plugins: []
}
