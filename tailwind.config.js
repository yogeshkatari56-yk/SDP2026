/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all your React files for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        // You can add custom brand colors here
        brand: {
          light: '#6366f1',
          dark: '#4f46e5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Optional: if you use custom fonts
      },
    },
  },
  plugins: [],
}