module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': "./src/components",
          '@pages': "./src/pages",
          '@data': "./src/data",
          "@shared": "./src/shared",
        },
      },
    ],
  ],
};
