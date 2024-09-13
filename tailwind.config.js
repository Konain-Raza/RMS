/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'dark-card': '#141414',
        'dark-text': '#ffffff',
        'dark-border': '#cccccc',
      },
    },
  },
  plugins: [],
};
