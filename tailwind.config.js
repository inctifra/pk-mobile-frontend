/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
   extend: {
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        poppinsBold: ["Poppins_700Bold"],
      },
    },
  },
  plugins: [],
}