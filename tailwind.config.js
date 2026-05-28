/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tiffany: {
          300: '#7de8e4',
          400: '#2ccbc6',
          500: '#0abab5',
          600: '#089490',
          700: '#066e6b',
        },
        light: {
          50:  '#f0fdfb',
          100: '#e0faf8',
          200: '#c8f4f1',
          300: '#a0eae6',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

