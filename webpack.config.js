const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  devtool: "inline-source-map",
  output: {
    publicPath: "http://localhost:3001/",
  },
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    port: 3001,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Products",
      filename: "product.js",
      library: { type: "var", name: "Products" },
      // expose each component
      exposes: {
        "./App": "./src/App",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },

        "react-redux": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-redux"],
        },

        "@reduxjs/toolkit": {
          singleton: true,
          eager: true,
          requiredVersion: deps["@reduxjs/toolkit"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "./index.html",
      chunksSortMode: "none",
    }),
  ],
};
