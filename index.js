var checkRequires = require('./lib/check-requires');
var updateNotifier = require('update-notifier');
var path = require('path');
var pkg = require('./package.json');

module.exports = function(type, grunt, obj) {
  //update notifier
  var notifier = updateNotifier({
    packageName: pkg.name,
    packageVersion: pkg.version
  });

  if (notifier.update) {
    notifier.notify();
  }

  var types = {
    browser: require('./lib/browser')
  };


  var requires = types[type].requires;
  var missingReqs = checkRequires(path.resolve(process.cwd(), 'node_modules'), requires);

  if (missingReqs.length != 0) {
    console.log('Not all required modules are installed, please run this:');
    var cmd = 'npm install --save-dev '+ missingReqs.join(' ');
    console.log(cmd);
    process.exit(0);
  }

  types[type].run(grunt, obj, function() {

  });


};
