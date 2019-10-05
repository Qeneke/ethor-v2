/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign,@typescript-eslint/explicit-function-return-type */

/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

// const withCss = require('@zeit/next-css');

const withSass = require("@zeit/next-sass");

const envs = require("./envs");

const plugins = [
  [withSass],
  [
    withBundleAnalyzer,
    {
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static",
          reportFilename: "../../bundles/server.html"
        },
        browser: {
          analyzerMode: "static",
          reportFilename: "../bundles/client.html"
        }
      }
    }
  ],
  [
    (nextConfig = {}) => ({
      ...nextConfig,
      webpack(config, options) {
        if (!options.defaultLoaders) {
          throw new Error(
            "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
          );
        }

        /**
         * with-absolute-imports https://github.com/zeit/next.js/blob/canary/examples/with-absolute-imports/next.config.js
         */
        config.resolve.alias["@@components"] = `${options.dir}/components`;
        config.resolve.alias["@@static"] = `${options.dir}/static`;
        config.resolve.alias["@@utils"] = `${options.dir}/utils`;

        /**
         * with-polyfills https://github.com/zeit/next.js/blob/canary/examples/with-polyfills/next.config.js
         */
        const originalEntry = config.entry;
        config.entry = async () => {
          const entries = await originalEntry();

          if (
            entries["main.js"] &&
            !entries["main.js"].includes("./polyfills.js")
          ) {
            entries["main.js"].unshift("./polyfills.js");
          }

          return entries;
        };

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      }
    })
  ]
];

const pluginsWith = withPlugins(plugins, {
  // distDir: "build",
  /* onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2
    }, */
  generateBuildId: async () => {
    return "0_0_2";
  },
  poweredByHeader: false,
  env: envs.publicEnvs
  // pageExtensions: ['mdx', 'jsx', 'js']
  // compress: false
});

module.exports = pluginsWith;
