var app = require('../src/app.js'),
    http = require('http');

var server = http.createServer(app);

var io = app.io;
io.attach(server);

server.listen(5050);

if (module.hot) {

  // This will handle HMR and reload the server
  module.hot.accept('../src/app.js', function() {
    server.removeListener('request', app);
    app = require('../src/app.js');
    server.on('request', app);
    console.log('Server reloaded!');
  });
}
