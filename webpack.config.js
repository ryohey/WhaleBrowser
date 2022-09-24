module.exports = {
  mode: "development",
  devtool: "inline-cheap-module-source-map",
  target: "electron-renderer",
  entry: {
    main: './src/index.tsx'
  },
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "css-loader"
      },
      {
        test: /\.styl$/,
        loader: "stylus-loader",
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
}
