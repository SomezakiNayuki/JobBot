const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');

const bundle_i18n = (locale) => {
  const i18nDir = path.join('src', 'assets', 'i18n');
  const outputFile = path.join(i18nDir, 'locale', `${locale}.json`);

  // Read all files in the i18n directory
  fs.readdir(i18nDir, (err, files) => {
    if (err) {
      console.error(chalk.red('\nError reading i18n directory:', err));
      return;
    }

    // Filter to get only .json files
    const jsonFiles = files.filter(file => file.endsWith('.json') && file !== 'locale/en.json');

    const mergedData = {};

    // Read and merge all JSON files
    jsonFiles.forEach(file => {
      const filePath = path.join(i18nDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      _.merge(mergedData, data);
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