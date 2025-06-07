/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
      serif: ['"Times New Roman"', 'Georgia', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
    },
    extend: {
      colors: {
        body: '#000000',
        background: '#FFFFFF',
        accent: '#2c3e50'
      },
      letterSpacing: {
        widest: '0.2em'
      },
      maxWidth: {
        'prose': '65ch'
      },
      spacing: {
        '128': '32rem'
      }
    },
  },
  plugins: [],
} 