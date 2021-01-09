module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'], // Remove unused styles in production
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridRowStart: {
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
