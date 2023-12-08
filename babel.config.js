module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-transform-flow-strip-types",
      "@babel/plugin-proposal-export-namespace-from",
      ["@babel/plugin-transform-class-properties", { loose: true }],
      ["@babel/plugin-transform-private-methods", { loose: true }],
      'react-native-reanimated/plugin',
      ['expo-router/babel'],
    ],
  };
};
