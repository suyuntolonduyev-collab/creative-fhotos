/** @type {import(tailwindcss).Config} */
export default {
  content: [
    "./index.html",
    "./vacansii.html",
    "./exemples.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0E0C0A",
        beige: "#FCFCF5",
        gold: "#B38B6D",
        goldHover: "#ddbb97",
      },
      fontFamily: {
        compact: ["Compact", "sans-serif"],
        prestige: ["Prestige", "serif"],
      },
    },
  },
  plugins: [],
};
