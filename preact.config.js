/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

export default (config, env) => {
  if (env.isProd) {
    config.devtool = "source-map";
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
        cert: fs.readFileSync("./webpack/cert/dev.local.crt"),
      },
      static: {
        directory: path.join(__dirname, "src/data"),
        publicPath: "/data",
      },
    };
  }

  // Vendor / app bundling.
  config.optimization = {
    runtimeChunk: "single",
    splitChunks: {
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        d3: {
          test: /[\\/]node_modules[\\/](d3|d3-.*?)[\\/]/,
          name: "d3",
          // Though the docs recommend setting `name` to `false`, that
          // breaks the site. Using a string doesn't appear to be
          // causing frequently-changing bundles, though.
          chunks: "all",
        },
        plot: {
          test: /[\\/]node_modules[\\/]@observablehq[\\/]plot[\\/]/,
          name: "plot",
          chunks: "all",
        },
        // Improvised app-only chunk b/c `chunks: "all"` in the main
        // config is breaking the site.
        // All remaining chunks should be vendors.
        app: {
          test(module) {
            return module.resource
              && module.resource.includes(env.src);
          },
          name: "app",
          chunks: "all",
        },
      },
    },
  };
};
