const bundle_i18n = require('./build-scripts/bundle-i18n');
const chalk = require('chalk');

module.exports = (config, options, targetOptions) => {
  console.log(chalk.blue('\nBundling i18n package...'));
  bundle_i18n('en');

  return config;
};