/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- Add this line
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,座}",
  ],
  theme: {
    extend: {
      colors: {
        'planova-mint': '#34d399',
        'planova-dark': '#1e293b',
        'planova-soft': '#f8fafc',
      },
    },
  },
  plugins: [],
}