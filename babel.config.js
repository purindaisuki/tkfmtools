module.exports = {
  plugins: [
    [
      "transform-imports",
      {
        "@material-ui/core": {
          transform: "@material-ui/core/esm/${member}",
          preventFullImport: true,
        },
        "@material-ui/lab": {
          transform: "@material-ui/lab/esm/${member}",
          preventFullImport: true,
        },
      },
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    ["@babel/plugin-proposal-private-methods"],
    ["@babel/plugin-proposal-private-property-in-object", { loose: false }],
  ],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript",
    ["babel-preset-gatsby", { targets: { esmodules: true } }],
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"],
    },
  },
};
