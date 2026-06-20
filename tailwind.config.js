/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tr-black': '#0A0A0A',
        'tr-surface': '#141414',
        'tr-surface-alt': '#1B1B1B',
        'tr-border': '#262626',
        'tr-red': '#E8001E',
        'tr-green': '#16C784',
        'tr-gold': '#F2B705',
        'tr-bronze': '#C2783C',
        'tr-chrome': '#ECECEC',
        'tr-dark': '#1B1B1B',
        'tr-gray-dark': '#262626',
        'tr-gray-light': '#9A9A9A',
        'tr-gray-tertiary': '#5C5C5C',
        'tr-white': '#F5F5F5',
      },
      fontFamily: {
        'tr-mono': ['IBM Plex Mono', 'monospace'],
        'tr-sans': ['IBM Plex Sans', 'sans-serif'],
        'tr-condensed': ['Barlow Condensed', 'sans-serif'],
      },
      fontSize: {
        'tr-xs': ['10px', '12px'],
        'tr-sm': ['12px', '14px'],
        'tr-base': ['14px', '16px'],
        'tr-lg': ['16px', '20px'],
        'tr-xl': ['18px', '24px'],
        'tr-2xl': ['22px', '28px'],
        'tr-3xl': ['28px', '32px'],
        'tr-4xl': ['36px', '40px'],
        'tr-heading': ['48px', '52px'],
      },
      letterSpacing: {
        'tr-tight': '-0.02em',
        'tr-wide': '0.05em',
        'tr-wider': '0.1em',
      },
    },
  },
  plugins: [],
}
