import { join, basename } from 'path';
import vfs from 'vinyl-fs';
import { renameSync } from 'fs';
import through from 'through2';
const chalk = require('chalk');
const cat = chalk.green;

function init({ demo, install }) {
  const type = demo ? 'demo' : 'app';
  const cwd = join(__dirname, '../boilerplates', type);
  const dest = process.cwd();
  const projectName = basename(dest);

  console.log(`Creating a new Dva app in ${dest}.`);
  console.log();

  vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, cwdbase: true, dot: true})
    .pipe(template(dest))
    .pipe(vfs.dest(dest))
    .on('end', function() {
      console.log(`  ${cat('Rename')} ./gitignore to ./.gitignore`);
      renameSync(join(dest, 'gitignore'), join(dest, '.gitignore'));
      if (install) {
        require('./install')(printSuccess);
      } else {
        printSuccess();
      }
    })
    .resume();

  function printSuccess() {
    console.log(`
Success! Created ${projectName} at ${dest}.

Inside that directory, you can run several commands:
  * npm start: Starts the development server.
  * npm run build: Bundles the app into dist for production.
  * npm test: Run test.

We suggest that you begin by typing:
  cd ${dest}
  npm start

Happy hacking!`);
  }
}

function template(dest) {
  return through.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    console.log(`   ${cat('Write')} %s`, simplifyFilename(join(dest, basename(file.path))));
    this.push(file);
    cb();
  });
}

function simplifyFilename(file) {
  return file.replace(process.cwd(), '.');
}

export default init;
