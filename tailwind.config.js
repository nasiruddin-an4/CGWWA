/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './context/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brandBlue: '#091E3A',
        brandYellow: '#f5ee31',
        brandYellowDark: '#c7c122',
        brandRed: '#F42A41',
      },
      fontSize: {
        'heading-1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '800' }],
        'heading-2': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
};
