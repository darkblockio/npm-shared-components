module.exports = {
  mode: 'jit',
  content: ["./src/lib/**/*.js"],
  theme: {
    screens: {
      mobile: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px"
    },
    extend: {},
  },
  plugins: [],
}
