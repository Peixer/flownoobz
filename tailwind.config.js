module.exports = {
  content: ['./src/**/*.njs', './src/**/*.jsx', './src/**/*.nts', './src/**/*.tsx'],
  theme: {
    colors: {
      // Dynamic colors
      body: {
        DEFAULT: 'var(--body-color)',
        50: 'var(--body-color-50)',
        100: 'var(--body-color-100)',
        200: 'var(--body-color-200)',
        300: 'var(--body-color-300)',
        400: 'var(--body-color-400)',
        500: 'var(--body-color-500)',
      },
      heading: 'var(--heading-color)',
      primary: {
        DEFAULT: 'var(--primary-color)',
        300: 'var(--primary-color-300)',
      },
      alternate: 'var(--alternate-color)',

      // Static colors
      black: '#000',
      dark: {
        DEFAULT: '#262626',
      },

      gray: {
        100: '#E9E9E9',
        200: '#CACACA',
        300: '#AAAAAA',
        400: '#8C8C8C',
        500: '#585858',
      },
      green: {
        DEFAULT: '#49FF2C',
        500: '#1D6611',
      },
      red: {
        DEFAULT: '#FF382C',
        500: '#661612',
      },
      yellow: {
        DEFAULT: '#FFD02C',
        500: '#665311',
      },
      // primary: {
      //   DEFAULT: '#FF2C78',
      //   300: '#FF5B96'
      // },
      white: '#FFF',
    },
    extend: {},
    fontFamily: {
      body: ['Inter', 'sans-serif'],
      heading: ['Poppins', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
