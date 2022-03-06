/* eslint-disable unicorn/prefer-module */

const defaultTheme = require('tailwindcss/defaultTheme')

/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  plugins: [],
  purge: ['../src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        '10xl': '5.0rem',
        '4xl': '2.0rem',
        '5xl': '2.5rem',
        '6xl': '3.0rem',
        '7xl': '3.5rem',
        '8xl': '4.0rem',
        '9xl': '4.5rem'
      },
      colors: {
        primary: '#5379FF',
        secondary: '#FFE455F5'
      },
      fontFamily: {
        sans: ['Noto Sans JP', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}

/* eslint-enable */
