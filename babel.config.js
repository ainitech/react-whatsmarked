module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { browsers: [">0.25%", "not dead"] }, // gera ES5 sem core-js
        modules: "auto"
      }
    ],
    "@babel/preset-react"
  ]
};
