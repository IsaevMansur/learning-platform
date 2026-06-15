/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0F1115',
        'secondary': '#1A1D24',
        'accent-success': '#00FF94',
        'accent-info': '#00D4FF',
        'accent-error': '#FF4D4D',
      },
    },
  },
  plugins: [],
}