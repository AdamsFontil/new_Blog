/* eslint-disable no-undef */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "rgb(16 185 129)",
          secondary: "rgb(251 146 60)",
          accent: "rgb(107 114 128)",
          neutral: "rgb(255 255 255)",
          "base-100": "rgb(16 185 129)",
          info: "#8FC8DB",
          success: "#1F9E8F",
          warning: "#FCAB31",
          error: "#E5463E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
