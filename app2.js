var http = require("http");
var url = require('url');
var fs = require('fs');

function start(route) {
  function onRequest(request, response) {
    var path = url.parse(request.url).pathname;
    console.log("Request received.");
    route(path)
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end();
  }

  http.createServer(onRequest).listen(8888,'127.0.0.1');
  console.log("Server has started.");
}

start(route);



var handle = {};
handle['/'] = function () {
  console.log('home')
};
handle['/users'] = function () {
  fs.readFile('users.json','utf-8', function (err, data) {
    if(err) {
      console.error(err);
    } else {
      console.log(data)
    }
  });
}

function route(pathname) {
  if(typeof handle[pathname] === 'function') {
    handle[pathname]()
  }
}