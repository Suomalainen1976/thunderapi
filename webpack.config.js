/**
 * ONLY RUN BUILDS WITH `npm run webpack`!
 * DO NOT USE THE NORMAL WEBPACK! IT WON'T WORK!
 */

const path = require("path");
const webpack = require("webpack");
const createVariants = require("parallel-webpack").createVariants;
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const version = require("./package.json").version;

const createConfig = options => {
  const plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ];

  if (options.minify) {
    plugins.push(new UglifyJSPlugin({
      uglifyOptions: {
        mangle: { keep_classnames: true },
        output: { comments: false },
      },
    }));
  }

  // eslint-disable-next-line max-len
  const filename = `thunderapi${process.env.VERSIONED === "false" ? "" : `.${version}`}${options.minify ? ".min" : ""}.js`;

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve("./webpack"),
      filename,
      library: "thunderapi",
      libraryTarget: "window",
    },
    module: {
      exprContextRegExp: /^\.\/.*$/,
      unknownContextRegExp: /^\.\/.*$/,
      rules: [
        { test: /\.md$/, loader: "ignore-loader" },
        {
          test: require.resolve("./package.json"),
          use: {
            loader: "json-filter-loader",
            options: {
              used: ["version", "homepage"],
            },
          },
        },
        ...require("snekfetch/webpack.supplemental").rules,
      ],
    },
    node: {
      fs: "empty",
      dns: "mock",
      tls: "mock",
      net: "empty",
      child_process: "empty",
      dgram: "empty",
      __dirname: true,
      process: true,
      path: "empty",
      Buffer: true
    },
    plugins
  };
};

module.exports = createVariants({}, { minify: [false, true] }, createConfig);