const colors = ["accent", "light", "dark", "orange"];

const colorObject = colors.reduce((acc, color) => {
  acc[color] = `rgba(var(--${color}),<alpha-value>)`;
  return acc;
}, {});

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: colorObject,
      backgroundColor: colorObject,
      borderColor: colorObject,
      stroke: colorObject,
      fill: colorObject,
    },

    fontFamily: {
      regular: ["raleway-regular", "Arial", "sans-serif"],
      semibold: ["raleway-semibold", "Arial", "sans-serif"],
      bold: ["relaway-bold", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
