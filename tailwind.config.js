import colors from 'tailwindcss/colors';
import withMT from '@material-tailwind/react/utils/withMT.js';

export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        mainGray: '#f7f7f7',
        borderGray: '#E5E5E5',
        darkGray: '#333',
        mainOrange: '#ffcd99',
        mainYello: '#ffd969',
        mainDarkGray: '#333',
        mainRed: '#bd5353',
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
      },
    },
  },
  plugins: [],
});
