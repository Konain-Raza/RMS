/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1e1e1e',
        'dark-card': '#2d2d30',
        'dark-text': '#ffffff',
        'dark-border': '#cccccc',
      },
    },
  },
  plugins: [],
};
