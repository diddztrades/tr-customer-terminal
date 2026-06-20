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
        'tr-black': '#0a0a0a',
        'tr-red': '#e63946',
        'tr-dark': '#1a1a1a',
        'tr-gray-dark': '#2a2a2a',
        'tr-gray-light': '#666666',
        'tr-white': '#f5f5f5',
      },
      fontFamily: {
        'tr-mono': ['IBM Plex Mono', 'monospace'],
        'tr-sans': ['IBM Plex Sans', 'sans-serif'],
        'tr-condensed': ['IBM Plex Sans Condensed', 'sans-serif'],
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
