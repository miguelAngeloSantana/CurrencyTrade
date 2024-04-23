/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-theme-black': '#121212',
        'bg-theme-black-main': '#06121F',
        'white': '#FAFAFA',
        'gray': {
          50: 'rgba(245,245,245, .1)',
          200: '#E0E0E0',
          500: '#757575'
        },
        'Lime': {
          400: '#33FF00'
        },
        'Red': {
          600: 'FB2c2c'
        }
      }
    },
  },
  plugins: [],
}

