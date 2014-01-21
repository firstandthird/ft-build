module.exports = function(grunt, obj) {
  //update notifier
  var updateNotifier = require('update-notifier');
  var notifier = updateNotifier();

  if (notifier.update) {
      notifier.notify();
  }

  var path = require('path');

  var libName = obj.filename || obj.name;
  var fullLibName = obj.fullFilename || obj.name+'.full';

  require('load-grunt-config')(grunt, {
    configPath: path.join(__dirname, 'grunt'),
    config: {
      name: obj.name,
      info: grunt.file.readJSON('bower.json'),
      libName: libName,
      fullLibName: fullLibName,
      bowerExclude: obj.bowerExclude || [],
      fatjsPath: __dirname,
      jshintStylish: require('jshint-stylish')
    },
    loadGruntTasks: false
  });

  grunt.file.expand(path.join(__dirname, 'node_modules/grunt-*/tasks')).forEach(grunt.loadTasks);

  if (obj.full === false) {
    grunt.registerTask('scripts', ['scriptLib']);
  } else {
    grunt.registerTask('scripts', ['scriptLib', 'scriptFull']);
  }

};
