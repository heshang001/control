var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;//
var path = require('path');
var open = require("open");

var port = 2001;

function start() {
    console.log("call the start");

    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        var realPath = path.join("./", pathname);    //这里设置自己的文件名称;
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        fs.exists(realPath, function (exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        response.end(err);
                    } else {
                        var contentType = mine[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
        });
    }

    http.createServer(onRequest).listen(port);

    console.log("Server has started.");

    openBrower();
}

start();

function openBrower() {
    open("http://127.0.0.1:2001/index.html", "chrome");
}
