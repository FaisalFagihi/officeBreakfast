const colors = require('tailwindcss/colors')
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports =  withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      mainGray:'#F8F8F8',
      borderGray:'#E5E5E5',
      darkGray:'#333',
      mainOrange:'#ffcd99',
      mainYello:'#ffd969',
      mainDarkGray:'#333',
      mainRed:'#bd5353',
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    extend: {
       },
  },
  plugins: [],

})
