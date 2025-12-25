/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        studio: {
          base: '#F6F7FB',
          dark: '#1A1A1C',
          gray: '#4A4A52',
          light: '#E8EAF0',
          blue: '#2153F6',
          yellow: '#FFC93C',
          red: '#EB3A2C',
          mint: '#54E0C5',
          lavender: '#A38BFF',
        }
      },
      spacing: {
        '128': '32rem',
      }
    }
  },
  plugins: [],
}
