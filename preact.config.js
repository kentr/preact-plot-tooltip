/* eslint-disable @typescript-eslint/no-var-requires */
/*
  global
    __dirname
    process
    require
*/
const fs = require("fs");
const path = require("path");

export default (config, env) => {
  if (env.isProd) {
    config.devtool = false;
    config.output.publicPath = "./";
  }
  if (config.performance) {
    config.performance.maxAssetSize = 250000;
    config.performance.maxEntrypointSize = 250000;
  }

  if (!process.env.HOSTNAME.startsWith("sse-sandbox")) {
    config.devServer = {
      http2: true,
      // `https` option deprecated in later webpack versions.
      https: {
        key: fs.readFileSync("./webpack/cert/dev.local.key"),
        cert: fs.readFileSync("./webpack/cert/dev.local.crt")
      },
      static: {
        directory: path.join(__dirname, "src/data"),
        publicPath: "/data"
      }
    };
  }

  config.resolve.alias = {
    ...config.resolve.alias,
    "@observablehq/plot": "@observablehq/plot/src"
  };
};
