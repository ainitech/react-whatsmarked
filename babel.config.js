module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { browsers: [">0.25%", "not dead"] }, // transpila para ES5 compatível
        modules: "auto",
        useBuiltIns: false    // 👈 importante: NÃO gerar imports de core-js
      }
    ],
    "@babel/preset-react"
  ]
};
