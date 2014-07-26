var path = require('path');
var buildTestFile = require('../types/browser/build-test-file');

exports.requires = [
  'grunt-concat-bower',
  'grunt-contrib-connect',
  'grunt-contrib-watch',
  'grunt-contrib-less',
  'grunt-contrib-concat',
  'grunt-contrib-jshint',
  'grunt-contrib-clean',
  'grunt-autoprefixer',
  'grunt-contrib-uglify',
  'grunt-bytesize',
  'grunt-mocha',
  'grunt-jscs',
  'grunt-notify',
  'grunt'
];

exports.run = function(grunt, obj, done) {

  var libName = obj.filename || obj.name;

  if (!libName) {
    throw new Error('name must be passed in');
  }

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

      var middleware = function(connect, options, middlewares) {
        middlewares.unshift(function(req, res, next) {
          if (req.url.match(/^\/test\/$/)) {
            var html = buildTestFile('fixture.html');
            res.end(html);
          } else {
            next();
          }
        });
        return middlewares;
      };
      config.connect.test.options.middleware = middleware;
      config.connect.dev.options.middleware = middleware;
    }
  });

  done();

};

