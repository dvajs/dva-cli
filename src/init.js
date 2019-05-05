import { join, basename } from 'path';
import vfs from 'vinyl-fs';
import { renameSync } from 'fs';
import through from 'through2';
import { sync as emptyDir } from 'empty-dir';
import leftPad from 'left-pad';
import chalk from 'chalk';
import inquirer from 'inquirer';

function info(type, message) {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

function error(message) {
  console.error(chalk.red(message));
}

function success(message) {
  console.error(chalk.green(message));
}

function init({ demo, install }) {
  const type = demo ? 'demo' : 'app';
  const cwd = join(__dirname, '../boilerplates', type);
  const dest = process.cwd();
  const projectName = basename(dest);

  if (!emptyDir(dest, function(filepath) {
    return !/\.git/i.test(filepath);
  })) {
    error('Existing files here, please run init command in an empty folder!');
    process.exit(1);
  }

  console.log(`Creating a new Dva app in ${dest}.`);
  console.log();

  vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, cwdbase: true, dot: true})
    .pipe(template(dest, cwd))
    .pipe(vfs.dest(dest))
    .on('end', function() {
      info('rename', 'gitignore -> .gitignore');
      renameSync(join(dest, 'gitignore'), join(dest, '.gitignore'));
      if (install) {
        info('run', 'npm install');
        require('./install')(printSuccess);
      } else {
        printSuccess();
      }
    })
    .resume();

  function printSuccess() {
    success(`
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

function template(dest, cwd) {
  return through.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    info('create', file.path.replace(cwd + '/', ''));
    this.push(file);
    cb();
  });
}

export default function (...args) {
  console.log();
  console.log(chalk.bold(chalk.red(`dva-cli is deprecated, please use ${chalk.blue(`create-umi`)} instead, checkout ${chalk.gray(chalk.underline('https://umijs.org/guide/create-umi-app.html'))} for detail.`)));
  console.log(chalk.bold(chalk.green(`如果你是蚂蚁金服内部用户，请使用 bigfish 创建项目，详见 https://bigfish.alipay.com/ 。`)));
  console.log();
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'insist',
      message: `Do you insist on using dva-cli?`,
      default: false,
    },
  ]).then(({ insist }) => {
    if (insist) {
      init(...args);
    } else {
      console.log('Have a good day!');
    }
  }).catch(e => {
    console.error(chalk.red(`> Project init failed.`));
    console.error(e);
  })
};
