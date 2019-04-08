// const autoprefixer = require('autoprefixer');
const { useBabelRc, override } = require('customize-cra');

// const overrideConfig = () => (config, env = process.env.NODE_ENV) => {
//   config.plugins.push(new BundleAnalyzerPlugin());
// };

module.exports = {
  webpack: override(
    useBabelRc(),
    // overrideConfig(),
  ),
  // jest: override(
  //   overrideConfig()
  // ),
};
