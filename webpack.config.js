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
  target: "node",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/\.test.js$/, /\.server.js$/],
        use: [
          {
            loader: "./isomorphy/tools/ServerOnlyLoader",
          },
          {
            loader: "babel-loader",
            options: { configFile: path.resolve("./babel.client.config.json") },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".client.js", ".server.js"],
  },
};
