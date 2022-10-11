var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});

	res.write('<!doctype html> \
   	<html> \
        <head>\
            <title> This page is about Me <title>\
        </head>\
        <body>\
            <h1> My Name is Brahath Shet  </h1>\
            <p> I love to play online games and love to ride my bike around the neigbourhood </p>\
        </body>\
    </html>');

    res.end();
}).listen(8000, function () {

    console.log('Node server is running...');
  });
