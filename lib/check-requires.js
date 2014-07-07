var fs = require('fs');
module.exports = function(dir, requires) {

  var files = fs.readdirSync(dir);

  var missing = [];
  requires.forEach(function(req) {
    if (files.indexOf(req) == -1) {
      missing.push(req);
    }
  });
  return missing;
};
