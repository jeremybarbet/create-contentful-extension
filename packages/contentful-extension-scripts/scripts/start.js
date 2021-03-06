/* eslint-disable no-console */

process.env.NODE_ENV = 'development';

const argv = require('yargs').argv;
const Bundler = require('parcel-bundler');
const chalk = require('chalk');

const utilsPaths = require('./utils/paths');
const updateExtension = require('./utils/updateExtension');

const inputPath = argv.input || '.';
const outputPath = argv.output || '.';
const paths = utilsPaths(inputPath, outputPath);
const entry = paths.src + '/index.html';
const https = argv.https || false;
const port = argv.port || 1234;
const id = argv.id;
const name = argv.name;
const spaceId = argv.spaceId;
const fieldTypes = argv.fieldTypes;
const managementToken = argv.mt;

const options = {
  outDir: paths.build, // The out directory to put the build files in, defaults to dist
  outFile: 'index.html', // The name of the outputFile
  watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: false, // Enabled or disables caching, defaults to true
  cacheDir: paths.cache, // The directory cache gets put in, defaults to .cache
  contentHash: false, // Disable content hash from being included on the filename
  minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
  scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors
  hmr: true, // Enable or disable HMR while watching
  hmrPort: 0, // The port the HMR socket runs on
  sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
  hmrHostname: '', // A hostname for hot module reload, default to ''
  detailedReport: false, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  https: https, // This flag generates a self-signed certificate, you might have to configure your browser to allow self-signed certificates for localhost
  autoInstall: false, // Disable auto install
};

const bundler = new Bundler(entry, options);

const run = async () => {
  try {
    if (!id || !name || !spaceId || !managementToken) {
      throw new Error('Missing id, name, spaceId or managementToken');
    }

    if (!argv.serveOnly) {
      await updateExtension({ port, https, id, name, spaceId, fieldTypes, managementToken });
    }

    await bundler.serve(port, https);
  } catch (e) {
    console.log();
    throw new Error(chalk.red(e.message));
  }
};

run();
