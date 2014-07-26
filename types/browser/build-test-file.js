var fs = require('fs');
var path = require('path');

module.exports = function(testFile) {
  var layout = fs.readFileSync(path.resolve(__dirname, 'test.html'), 'utf8');

  var fixturePath = path.join(process.cwd(), 'test/', testFile);
  var fixture = '';
  if (fs.existsSync(fixturePath)) {
    fixture = fs.readFileSync(fixturePath, 'utf8');
  }
  var html = layout.replace('{{fixture}}', fixture);
  return html;

};
