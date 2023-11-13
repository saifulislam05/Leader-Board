/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require("daisyui")],
};
