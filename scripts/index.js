let http = require("http");
let url = require("url");
let fs = require("fs");


http.createServer((req, res) => {
  let q = url.parse(req.url, true);
  let filename = (q.pathname !== "/") ? "../pages/" +  q.pathname + ".html" : "../pages/index.html";
  fs.readFile(filename, (err, data) => {
        if (err) {
            let errorFile = "../pages/404.html";
            fs.readFile(errorFile, (err, data) => {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
          } else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    });
}).listen(8080);
