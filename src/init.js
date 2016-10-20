import { join, basename } from 'path';
import vfs from 'vinyl-fs';
import { renameSync } from 'fs';
import through from 'through2';
import leftPad from 'left-pad';
import chalk from 'chalk';
import { sync as emptyDir } from 'empty-dir';

function logInfo(type, message) {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

function logError(message) {
  console.error(chalk.red(message));
}

function init({ demo, install }) {
  const type = demo ? 'demo' : 'app';
  const cwd = join(__dirname, '../boilerplates', type);
  const dest = process.cwd();
  const projectName = basename(dest);

  if (!emptyDir(dest)) {
    logError('Existing files here, please run init command in an empty folder!');
    process.exit(1);
  }

  console.log(`Creating a new Dva app in ${dest}.`);
  console.log();

  vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, cwdbase: true, dot: true})
    .pipe(template(dest, cwd))
    .pipe(vfs.dest(dest))
    .on('end', function() {
      logInfo('rename', 'gitignore -> .gitignore');
      renameSync(join(dest, 'gitignore'), join(dest, '.gitignore'));
      if (install) {
        logInfo('run', 'npm install');
        require('./install')(printSuccess);
      } else {
        printSuccess();
      }
    })
    .resume();

  function printSuccess() {
    console.log(chalk.green(`
Success! Created ${projectName} at ${dest}.

Inside that directory, you can run several commands:
  * npm start: Starts the development server.
  * npm run build: Bundles the app into dist for production.
  * npm test: Run test.

We suggest that you begin by typing:
  cd ${dest}
  npm start

Happy hacking!`));
  }
}

function template(dest, cwd) {
  return through.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    logInfo('create', file.path.replace(cwd + '/', ''));
    this.push(file);
    cb();
  });
}

export default init;
