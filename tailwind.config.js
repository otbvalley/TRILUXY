import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1BC1DC",
        primary_light: "#E5FBFF",
        secondary: "#002D3C",
        secondary_light: "#005578",
        tertiary: "#939090 ",
        green_light: "#00FFC2 ",
        green_dark: "#4CAF50",
        blue_dark: "#3F51B5",
      },
      fontFamily: {
        OpenSans: ["Open Sans", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Karla: ["Karla", "serif"],
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [daisyui],
};
