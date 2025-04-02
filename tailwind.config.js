// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update this array to include paths to all files where you use Tailwind classes
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}" // Add other directories/patterns as needed
  ],
  presets: [require("nativewind/preset")], // Add the NativeWind preset
  theme: {
    extend: {},
  },
  plugins: [],
}
