/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        firacode: ["Fira Code", "monospace"],
        ArsenalSC: ["Arsenal SC", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
}
