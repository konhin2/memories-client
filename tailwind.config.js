const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      memory: {
        c1: "#0ABBB5",
        c2: "#6ADBD9",
        c3: "#EBE8E4",
        c4: "#F5C4BD",
        c5: "#F7B3B2",
        c6: "#444a4a",
        c7: "#D0F2F2" 
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}