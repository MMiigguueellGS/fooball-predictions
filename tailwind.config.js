/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage:{
        'estadio': "linear-gradient(rgba(5, 7, 12, 0.45),rgba(5, 7, 12, 0.45)), url('/image/estadio1.jpg')", 
        'fondo':  "linear-gradient(rgba(5, 7, 12, 0.05),rgba(5, 7, 12, 0.05)), url('/image/fondo2.jpg')"     
      },
      backgroundColor:{
        'black-opacity' :"rgba(0, 0, 0, 0.7)"
      }
    },
  },
  plugins: [],
}

