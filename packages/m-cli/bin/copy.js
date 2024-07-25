const copydir = require('copy-dir');
const fs = require('fs');

function copyDir(from, to, options) {
  copydir.sync(from, to, options);
}

function checkMkdirExists(path) {
  return fs.existsSync(path)
};

exports.checkMkdirExists = checkMkdirExists;
exports.copyDir = copyDir;