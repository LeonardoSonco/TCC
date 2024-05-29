/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray": "#A7A7A7",
        "strong_gray" : "#5B5B5B",
        "light_gray": "#D9D9D9",
        "black_button" : "#001A1A",
      },
      boxShadow:{
        "shadowBox" : "0px 4px 15px 5px rgba(0,0,0,0.1);"
        
      },
      screens:{
        'max-xs' : {'max': '380px'},
        'max-sm+' : {'max': '815px'},
        'max-sm': {'max': '600px'},
        'max-lg': {'max': '1024px'},
        'max-mobile': {'max': '964px'},
      },
      fontFamily: {
        'goldman': ['"Goldman", sans-serif']
      }
    },
  },
  plugins: [
   
  ],
};
