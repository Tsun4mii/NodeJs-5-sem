const http = require('http');
const url = require('url');
const fs = require('fs');

let fact = (k) => {return (k === 0 ? 1 : fact(k-1)*k);};

function factorialTick(k, callback)
{
    this.fk = k;
    this.ffact = fact;
    this.cb = callback;
    this.calc = ()=> process.nextTick(()=>{this.cb(null, this.ffact(this.fk))})
}
function factorialImmediate(k, callback)
{
    this.fk = k;
    this.ffact = fact;
    this.cb = callback;
    this.calc = ()=> {setImmediate(()=>{this.cb(null, this.ffact(this.fk))})}
}

http.createServer((req, res) => {
    let base = 'http://' + req.headers.host + '/'
    const myUrl = new URL(req.url, base);
    if(myUrl.pathname === '/fact')
    {
        let k = +myUrl.searchParams.get('k');
        if(Number.isInteger(k))
        {
            console.log(fact(k));
            res.writeHead(200,{'Content-Type' : 'application/json'})
            res.end(JSON.stringify({k: k, fact: fact(k)}));
        }
    }
    else if(myUrl.pathname === '/')
    {
        let result = fs.readFileSync('index.html')
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(result);
    }
    else if(myUrl.pathname === '/tickk')
    {
        let result = fs.readFileSync('tick.html')
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(result);
    }
    else if(myUrl.pathname === '/immm')
    {
        let result = fs.readFileSync('imm.html')
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(result);
    }
    else if(myUrl.pathname === '/tick')
    {
        let k = +myUrl.searchParams.get('k');
        if(Number.isInteger(k))
        {
            res.writeHead(200,{'Content-Type': 'application/json'})
            let f = new factorialTick(k,(err,result)=>{res.end(JSON.stringify({ k:k , fact : result}));});
            f.calc();
        }
    }
    else if(myUrl.pathname === '/imm')
    {
        let k = +myUrl.searchParams.get('k');
        if(Number.isInteger(k))
        {
            res.writeHead(200,{'Content-Type': 'application/json'})
            let f = new factorialImmediate(k,(err,result)=>{res.end(JSON.stringify({ k:k , fact : result}));});
            f.calc();
        }
    }
}).listen(5000);    

//1. global - хранит var-данные на уровне модуля
//	process - информация о среде выполнения, о текущем процессе
//	buffer - класс Buffer – предназначен для работы с двоичными данными.
//	console - используется для печати в stdout и stderr
//2. Асинхронная функция – это функция, после вызова которой JavaScript
//   приложение продолжает работать, потому что функция сразу выполняет возврат.
//3. process.stdin - поток на чтение содержит стандартный системный поток ввода.
//   process.stdout - поток на запись, содержащий стандартный системный вывод.
//   process.stderr - поток на запись, содержащий стандартный системный вывод ошибок. 
//4. setImmediate() - переданынй callback будет выполнен на следующей итерации цикла событий. 
//   callback`и помещаются в в цикл обработки событий
//   nextTick() - переданный callback будет выполнен после пердыдущей итерации цикла событий и до следующей
//   колбэки не помещаются в цикл обрабоки событий 