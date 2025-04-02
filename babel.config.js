// babel.config.js
module.exports = {
  // Make sure to keep your existing presets (like 'module:@react-native/babel-preset')
  presets: [
    'module:@react-native/babel-preset',
    'nativewind/babel' // Add this line
  ],
  // Keep existing plugins if any
  plugins: [
    // Add 'react-native-reanimated/plugin' HERE if you haven't already
    // IMPORTANT: Reanimated plugin must be listed last.
    'react-native-reanimated/plugin',
  ],
};
