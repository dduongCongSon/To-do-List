/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root', // Thêm dòng này để MUI không bị ghi đè bởi Tailwind
  darkMode: 'class',
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // Thêm dòng này để tránh xung đột với MUI
  },
  plugins: [],
}