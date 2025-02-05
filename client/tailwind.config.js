/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkprimary:'#222222',
        darksecondary:'#2D2D2D',
        grayPrimary:'#5A5A5A',
        lightprimary:'#E2E2E2',
        lightsecondary:'#E3E3E3'
      }
    },
  },
  plugins: [],
}