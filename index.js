module.exports = function(grunt, obj) {

  var path = require('path');

  var libName = obj.filename || obj.name;
  var fullLibName = obj.fullFilename || obj.name+'.full';

  require('load-grunt-config')(grunt, {
    configPath: path.join(__dirname, 'grunt'),
    config: {
      name: obj.name,
      info: grunt.file.readJSON('bower.json'),
      libName: libName,
      fullLibName: fullLibName
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
