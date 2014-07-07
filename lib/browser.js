var path = require('path');

exports.requires = [
  'grunt-concat-bower',
  'grunt-contrib-connect',
  'grunt-contrib-watch',
  'grunt-contrib-less',
  'grunt-contrib-concat',
  'grunt-contrib-jshint',
  'grunt-contrib-clean',
  'grunt-autoprefixer',
  'grunt-mocha',
  'grunt-jscs',
  'grunt-notify',
  'grunt'
];

exports.run = function(grunt, obj, done) {

  var libName = obj.filename || obj.name;

  require('load-grunt-config')(grunt, {
    configPath: path.resolve(__dirname, '../types/browser/grunt'),
    data: {
      name: obj.name,
      info: grunt.file.readJSON('bower.json'),
      libName: libName,
      bowerExclude: obj.bowerExclude || [],
      livereloadPort: obj.livereloadPort || Math.floor(Math.random() * 999) + 35000
    },
    postProcess: function(config) {
      config.jshint.options = {
        reporter: require('jshint-stylish')
      };
      if (!obj.less) {
        config.aliases.styles = [];
      }
    }
  });

  done();

};

