
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME_TEXT_HTML = { 'Content-Type': 'text/html' };

http.createServer((req, res) => {
  const {pathname} = url.parse(req.url);


  const fileName = pathname === "/" ? "./index.html" : path.join(".", pathname);

  fs.readFile(fileName, (err, buffer) => {
    if (err) {
      fs.readFile('./404.html', (err, buffer) => {
        if (err) {
        res.writeHead(500, MIME_TEXT_HTML);
        res.end("Internal error");
      } else {
        res.writeHead(404, MIME_TEXT_HTML);
        res.end(buffer);
        }
      });
    } else {
      res.writeHead(200, MIME_TEXT_HTML);
      res.end(buffer);
    }
  });
}).listen(8080);
