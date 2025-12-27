/** @type {import(tailwindcss).Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        "brand-beige": "#FCFCF5",
        "brand-gold": "#ddbb97",
        "brand-brown": "#B38B6D",
        "brand-black": "#000000",
      },
      fontFamily: {
        compact: ["Compact", "sans-serif"],
        prestige: ["Prestige", "serif"],
      },
    },
  },
  plugins: [],
};
