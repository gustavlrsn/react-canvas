import path from "path";

const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist"),

    // the name of the exported library

    libraryTarget: "commonjs" // universal module definition
    // the type of the exported library
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            plugins: [
              "transform-class-properties",
              "transform-object-rest-spread"
            ]
          }
        }
      }
    ]
  }
};

export default config;
