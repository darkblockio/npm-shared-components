const { faRightToBracket } = require("@fortawesome/free-solid-svg-icons")

module.exports = {
  mode: "jit",
  content: ["./src/lib/**/*.js", "./src/lib/**/*.jsx"],
  theme: {
    screens: {
      mobile: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        fadeUp: "fadeOutUp 1s ease-in-out",
        fadeDown: "fadeOutDown 1s ease-in-out",
      },
      keyframes: {
        fadeOutUp: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translate3d(0, -100%, 0)" },
        },
        fadeOutDown: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translate3d(0, 100%, 0)" },
        },
      },
    },
  },
  plugins: [],
}
