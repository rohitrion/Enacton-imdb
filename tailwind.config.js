/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1280px", // Set the maximum width to 1280 pixels for large screens (md and above)
        xl: "1280px", // Also for extra-large screens (xl)
      },
    },
  },
  plugins: [],
}