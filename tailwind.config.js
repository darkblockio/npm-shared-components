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
      backgroundImage: {
        "gradient-3D": "linear-gradient(180deg, #F5F5F5 0%, #E5E5E5 100%)",
      },
    },
  },
  plugins: [],
}
