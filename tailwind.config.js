/** @type {import(tailwindcss).Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        compact: ['Compact', 'sans-serif'],
        prestige: ['Prestige', 'sans-serif'],
      },
    },
  },
  plugins: [],
}