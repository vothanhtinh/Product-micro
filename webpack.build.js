const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;

module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  entry: [path.resolve("./src/index.tsx")],
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath:
      "https://micro-frontends.tuando.net/demo/react-redux/products/dist/",
    crossOriginLoading: "anonymous",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    open: false,
    hot: true,
    historyApiFallback: true,
    port: 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Products",
      library: { type: "var", name: "Products" },
      filename: "products.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: {
        react: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve("./public/index.html"),
      filename: "index.html",
      chunksSortMode: "none",
    }),
  ],
};
