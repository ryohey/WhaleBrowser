const path = require("path")

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: "cheap-module-inline-source-map",
  target: "electron",
  entry: {
    javascript: './index.js'
  },
  output: {
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
}
