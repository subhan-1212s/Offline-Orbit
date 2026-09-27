/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orbit: {
          bg: '#FAF9F6',
          card: '#FFFFFF',
          text: '#1E2229',
          muted: '#5A606C',
          coral: '#F95738',
          teal: '#0D9488',
          amber: '#D97706',
          indigo: '#4F46E5',
          border: '#E5E2DA'
        }
      }
    },
  },
  plugins: [],
}
