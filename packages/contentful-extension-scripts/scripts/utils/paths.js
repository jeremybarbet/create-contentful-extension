const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = (inputPath, outputPath) => ({
  packageJson: resolveApp('package.json'),
  root: resolveApp(`${inputPath}/.`),
  src: resolveApp(`${inputPath}/src`),
  build: resolveApp(`${outputPath}/.`),
  cache: resolveApp(`${outputPath}/.cache`),
  coverage: resolveApp(`${outputPath}/.coverage`),
});
