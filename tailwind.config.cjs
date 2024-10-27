const colors = [
  "accent",
  "light",
  "dark",
  "orange",
  "primary",
  "secondary",
  "line",
  "alert",
  "success",
  "warning",
  "info",
  "body",
];

const colorObject = colors.reduce((acc, color) => {
  acc[color] = `rgba(var(--${color}), <alpha-value>)`;
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

    backgroundImage: {
      skeleton:
        "linear-gradient(90deg, transparent, rgba(var(--primary), .8), transparent )",
    },

    animation: {
      rotate: "rotate 2s linear infinite",
      loading: "loading 1.5s ease-in infinite",
    },

    keyframes: {
      rotate: {
        "100%": { transform: "rotate(360deg)" },
      },
      loading: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(100%)" },
      },
    },
  },
  plugins: [],
};
