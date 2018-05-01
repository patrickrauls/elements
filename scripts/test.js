process.on('unhandledRejection', err => {
  throw err;
});

const jest = require('jest');
const argv = process.argv.slice(2);

// Watch unless in coverage mode
if (argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

jest.run(argv);
