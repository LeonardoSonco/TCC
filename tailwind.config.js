/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray": "#A7A7A7",
        "light_gray": "#D9D9D9",
        "black_button" : "#001A1A",
      },
      boxShadow:{
        "shadowBox" : "0px 0px 13px 6px rgba(0,0,0,0.1);"
      },
      screens:{
        'max-sm': {'max': '600px'},
        'max-lg': {'max': '1024px'},
        'max-mobile': {'max': '964px'},
      }
    },
  },
  plugins: [],
};
