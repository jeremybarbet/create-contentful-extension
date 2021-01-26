/* eslint-disable no-console */

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk');

module.exports = async ({ port, https, id, name, spaceId, fieldTypes, managementToken }) => {
  console.log(chalk.cyan(`Installing extension in development mode...`));

  const { stdout } = await exec(
    `contentful extension update --src ${
      https ? 'https' : 'http'
    }://localhost:${port} --id ${id} --name ${name} --space-id ${spaceId} --field-types ${fieldTypes} --mt ${managementToken} --force`
  );

  console.log(stdout);
};
