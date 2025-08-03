/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buttonYellow: "#F4E041",
        bgColor: "#F8F8F8",
        customGrey: "#7E7E7E",
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      fontSize: {
        bigFont: "40px",
      }
    },
  },
  plugins: [],
}