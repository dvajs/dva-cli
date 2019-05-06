import which from 'which';

function runCmd(cmd, args, fn) {
  args = args || [];
  var runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: "inherit"
  });
  runner.on('close', function (code) {
    if (fn) {
      fn(code);
    }
  });
}

function findExe(exes) {
  for (var i = 0; i < exes.length; i++) {
    try {
      which.sync(exes[i]);
      console.log('use pkg manager: ' + exes[i]);

      return exes[i];
    } catch (e) {
    }
  }

  return null;
}

function findYarn() {
  var yarnExes = process.platform === 'win32' ? ['yarn.cmd', 'yarnpkg.cmd'] : ['yarn', 'yarnpkg'];

  return findExe(yarnExes);
}

function findNpm() {
  var npmExes = process.platform === 'win32' ? ['tnpm.cmd', 'cnpm.cmd', 'npm.cmd'] : ['tnpm', 'cnpm', 'npm'];

  return findExe(npmExes);
}

export default function (done) {
  const yarn = findYarn();

  if (yarn) {
    runCmd(which.sync(yarn), ['install'], function () {
      runCmd(which.sync(yarn), ['add', 'dva'], function () {
        console.log(yarn + ' install end');
        done();
      });
    });
  } else {
    const npm = findNpm();

    if (!npm) {
      throw new Error('please install yarn or npm');
    }

    runCmd(which.sync(npm), ['install'], function () {
      runCmd(which.sync(npm), ['install', 'dva', '--save'], function () {
        console.log(npm + ' install end');
        done();
      });
    });
  }
};
