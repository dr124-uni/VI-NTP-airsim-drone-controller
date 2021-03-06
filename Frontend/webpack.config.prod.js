const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const base_conifg = require("./webpack.config.base");
const merge = require("webpack-merge");

// Config directories
const SRC_DIR = path.resolve(__dirname, "src");
const OUTPUT_DIR = path.resolve(__dirname, "dist");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];

const config = merge.smart(base_conifg, {
  entry: SRC_DIR + "/index.js",
  output: {
    path: OUTPUT_DIR,
    publicPath: "./",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        include: defaultInclude,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" }],
        include: defaultInclude,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          { loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" },
        ],
        include: defaultInclude,
      },
    ],
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin("bundle.css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
  },
});

module.exports = config;
