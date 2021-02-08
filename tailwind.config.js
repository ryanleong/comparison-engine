const get = require('lodash/get');
const colors = require('tailwindcss/colors');
const config = require('./config/stroller/config.json');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      headers: ['Raleway', 'sans-serif'],
    },
    colors: {
      ...colors,
      accent: get(colors, config.theme.accentColor),
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
