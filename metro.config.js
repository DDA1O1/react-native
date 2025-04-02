// metro.config.js
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {}; // You can start with an empty object or your existing custom config

// Make sure to replace './global.css' with the correct relative path to your CSS file
module.exports = withNativeWind(mergeConfig(getDefaultConfig(__dirname), config), {
  input: "./global.css", // <--- Or your relative path e.g., "./src/global.css"
  output: "nativewind-output.js", // Optional: specify the output file name
});