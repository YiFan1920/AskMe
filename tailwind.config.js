/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        borel: ['Borel', 'cursive'],
      },
    },
  },

}

