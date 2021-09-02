const http = require('http')
const fs = require('fs') //Доступ к файловой системе

http.createServer((req, res)=>{
    if(req.url === '/html')
    {
        fs.readFile('inddex.html',(err, data)=>{
            if(err)
            {
                ErrHandler(res);
            }
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.end(data);
        });
    }
    if(req.url === '/png')
    {
        fs.readFile('What.png', (err, data)=>
        {
            if(err)
            {
                ErrHandler(res);
            }
            res.writeHead(200, {'Content-Type': 'image/png'})
            res.end(data);  
        })
    }
    if(req.url === '/api/name')
    {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Yuri Shust');  
    }
    if(req.url === '/xmlhttprequest')
    {
        fs.readFile('xmlhttprequest.html',(err,data)=>{
            if(err)
            {
                ErrHandler(res);
            }
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(data);
        })
    }
    if(req.url === '/fetch')
    {
        fs.readFile('fetch.html',(err, data)=>
        {
            if(err)
            {
                ErrHandler(res);
            }
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(data);
        })
    }
    if(req.url === '/jquery')
    {
        fs.readFile('jquery.html',(err, data)=>
        {
            if(err)
            {
                ErrHandler(res);
            }
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(data);
        })
    }
}).listen(5000)

function ErrHandler(res){
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Error occured</h1>')
}