module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // transpila para ES5, compatível até com IE11
        targets: {
          browsers: [">0.25%", "not dead", "ie 11"]
        },
        useBuiltIns: "usage", // injeta polyfills só quando necessário
        corejs: 3             // usa core-js v3
      }
    ],
    "@babel/preset-react"
  ]
};
