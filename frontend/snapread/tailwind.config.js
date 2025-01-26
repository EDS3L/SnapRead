/** @type {import('tailwindcss').Config} */
export default {
  darkMode: '',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}',
  ],
  theme: {
    extend: {
      screens: {
        xxl: '1420px',
      },
    },
  },
  plugins: [],
};
