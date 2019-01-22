const path = require("path")
const slsw = require("serverless-webpack")

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  externals: ["aws-sdk"],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", {
                  targets: {
                    node: "8.10"
                  }
                }]
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  }
}