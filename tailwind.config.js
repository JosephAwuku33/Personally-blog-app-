/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'gray-dark':'#1D2939',
      'gray-light':'#445f88',
      'white': '#FFFFFF',
      'light-white': '#F2F4F7',
      'red-dark': '#4C0000',
      'light-red':'#AF7C7B',
      'green':'#00FF00',
    },
    fontFamily: {
      'work-sans': ['Work Sans', 'sans-serif']
    },
  },
  plugins: [],
}
