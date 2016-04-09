var path = require('path');

var server = './src';

module.exports = {
  resolve: {
    alias: {
      api: path.join(__dirname, server, 'api'),
      lib: path.join(__dirname, server, 'lib')
    }
  }
}
