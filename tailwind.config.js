import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto": ["Roboto"] 
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          background:"#070707",
          background2: "#0D0D0D",
          content5: "#771212",
          content6: "#17c964",
          danger: "#FF000F"
        }
      },
      light: {
        colors: {
          background2: "#DEDEDE",
          content5: "#771212",
          content6: "#17c964",
          danger: "#FF000F"
        }
      }
    },
  })],
}

