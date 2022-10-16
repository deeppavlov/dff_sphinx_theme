import * as path from "path";
import * as webpack from "webpack";

import WebpackCopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: webpack.Configuration = {
  mode: "production",
  entry: ["./scripts/main.ts", "./styles/theme.scss"],
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "./dff_sphinx_theme/static/"),
    publicPath: "../",
    filename: "scripts/theme.min.js",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.[t|j]sx?$/,
        use: "babel-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  plugins: [
    new WebpackCopyPlugin({
      patterns: [
        {
          from: "./templates/",
          to({ absoluteFilename }) {
            const jinja = absoluteFilename.endsWith("theme_variables.jinja");
            return `../[name].${jinja ? "jinja" : "html"}`;
          },
        },
        {
          from: "./extras/",
          to: "../extras/[name][ext]",
        },
        {
          from: "./__init__.py",
          to: "../__init__.py",
        },
        {
          from: "./theme.conf",
          to: "../theme.conf",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles/theme.css",
    }),
  ],
};

// Use `--mode ['development' | 'production']` to control source maps generation
module.exports = (env: { root_path: string }, argv: { mode: string }) => {
  if (argv.mode == "development") config.devtool = "inline-source-map";
  return config;
};
