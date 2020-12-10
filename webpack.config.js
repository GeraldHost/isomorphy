const path = require("path");
const outputPath = path.resolve(process.cwd(), "build", "client");

module.exports = {
  mode: "development",
  entry: {
    app: ["./src/client.js"],
  },
  output: {
    filename: "bundle.js",
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/\.test.js$/],
        use: [
          {
            loader: "./config/ServerOnlyLoader",
          },
          {
            loader: "babel-loader",
            options: { babelrc: true },
          },
        ],
      },
    ],
  },
};
