module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          src: "./src",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@api": "./src/api",
          "@hooks": "./src/hooks",
          "@helpers": "./src/helpers",
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
  ],
};
