/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode with a class
  theme: {
    extend: {
      colors: {
        gray: {
          300: '#D1D5DB',
          600: '#4B5563',
          800: '#1F2937',
          900: '#111827', // Very dark gray for background
        },
        yellow: {
          500: '#F59E0B',
        },
        indigo: {
          500: '#6366F1',
        },
        dark: {
          bg: '#1e293b',
          text: '#e2e8f0',
          accent: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
};