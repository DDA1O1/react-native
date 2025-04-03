module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@store': './src/store',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};