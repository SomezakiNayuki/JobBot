const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const chalk = require('chalk');

const bundle_i18n = (locale) => {
  const i18nDir = path.join('src', 'assets', 'i18n');
  const outputFile = path.join(i18nDir, 'locale', `${locale}.json`);

  // Use glob to find all JSON files recursively in src/app
  glob('src/app/**/*.json', (err, files) => {
    if (err) {
      console.error(chalk.red('\nError scanning JSON files:', err));
      return;
    }

    const mergedData = {};

    // Read and merge all JSON files
    files.forEach((file) => {
      try {
        const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
        _.merge(mergedData, data);
      } catch (fileErr) {
        console.error(chalk.yellow(`\nWarning: Failed to parse JSON file: ${file}`));
      }
    });

    // Ensure the locale directory exists
    const localeDir = path.dirname(outputFile);
    if (!fs.existsSync(localeDir)) {
      fs.mkdirSync(localeDir, { recursive: true });
    }

    // Write the merged JSON to the output file
    fs.writeFileSync(outputFile, JSON.stringify(mergedData, null, 2), 'utf-8');
    console.log(chalk.green(`\nMerged i18n files written to ${outputFile}`));
  });
};

module.exports = bundle_i18n;