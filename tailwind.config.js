/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'background-base': '#000000',
        'surface-dark': '#0B0B0B',
        'surface-container-high': '#2a2a2a',
        'card-overlay': 'rgba(0, 0, 0, 0.55)',
        'border-subtle': 'rgba(255, 255, 255, 0.70)',
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255, 255, 255, 0.75)',
        primary: '#e0c294',
        'on-primary': '#3f2d0c',
        'primary-container': '#6b5530',
        'accent-hover': '#A98A4F',
        secondary: '#88d4d0',
        outline: '#998f83',
        'outline-variant': '#4d463b',
        'input-bg': '#FFFFFF',
        'input-placeholder': '#8A8A8A',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      spacing: {
        'margin-mobile': '1.5rem',
        margin: '4rem',
        gutter: '1.5rem',
        'section-gap': '7.5rem',
        'section-gap-mobile': '5rem',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['"EB Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        'pill-label': ['11px', { lineHeight: '14px', letterSpacing: '0.08em', fontWeight: '600' }],
        'nav-label': ['12px', { lineHeight: '16px', letterSpacing: '0.04em', fontWeight: '400' }],
        'card-title': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'body-default': ['14px', { lineHeight: '22.4px', fontWeight: '400' }],
        'headline-md': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'quote-display': ['56px', { lineHeight: '68px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'quote-display-mobile': ['32px', { lineHeight: '42px', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}
