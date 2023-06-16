/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}','./src/pages/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        '120': '120vh',
      },
      zIndex: {
        '106':'106',
        '105':'105',
        '104':'104',
        '103': '103',
        '102':'102',
        '101': '101',
        '100': '100',
        '99': '99',
      },
      maxWidth:{
        "180":"180px",
        "200":"200px"
      },
      minWidth:{
        "120":"120px",
        "180":"180px"
      },
      minHeight: {
        '200': '200px',
      },
      maxHeight: {
        '200': '200px',
      },
      spacing:{
        "18":"4.3rem",
        "19":"4.8rem",
        "20":"5.2rem"
      },
      colors: {
        "peach-grey":'rgb(218, 220, 221)',
        "light-purple":"rgb(157, 124, 254)",
        "light-blue":"rgb(124, 191, 254)",
        "light-red":"rgb(241, 79, 79)",
        "royalblue":"royalblue",
      }
    },
  },
}