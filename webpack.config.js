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
        use: {
          loader: "babel-loader",
          options: { babelrc: true },
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "webpack-strip-block",
            options: {
              start: "serveronly:start",
              end: "serveronly:end",
            },
          },
        ],
      },
    ],
  },
};
