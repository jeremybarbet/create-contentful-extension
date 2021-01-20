const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = (basePath) => ({
  packageJson: resolveApp('package.json'),
  root: resolveApp(`${basePath}/.`),
  src: resolveApp(`${basePath}/src`),
  build: resolveApp(`${basePath}/build`),
  cache: resolveApp(`${basePath}/.cache`),
  coverage: resolveApp(`${basePath}/.coverage`)
});
