const http = require('http');
const fs = require('fs');
const mail = require('sendmail');
const url = require('url')

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    if(url.parse(request.url).pathname === '/' && request.method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            response.end(data);
        });
    }
    if (url.parse(request.url).pathname === '/' && request.method === 'POST') {
        let body = '';
        request.on('data', (chunk) => { body += chunk.toString(); });
        request.on('end', () => {
            let parm = JSON.parse(body);
            console.log(parm.from + ' ' + parm.to + ' ' + parm.message);
            response.end('Status: OK.\nSender: ' + parm.from + ' . Receiver: ' + parm.to + ' .\nMessage: ' + parm.message);
        });
    }
}).listen(5000);
