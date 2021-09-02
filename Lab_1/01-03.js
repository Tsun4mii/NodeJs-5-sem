const http = require('http');

let head = request => { //Чтение заголовков
	let rc = '';
	for (let key in request.headers) {
		rc += `${key}: ${request.headers[key]}`;
	}

	return rc;
};

http.createServer(function(request, response) {
	let body = '';
	request.on('data', chunk => { //Начало запроса
		body += chunk;
		console.log('data', body);
	});
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); //Заголовки
	request.on('end', () => response.end(                                  //Конец запроса 
			'<!DOCTYPE html> <html lang=\"en\"><head><title>Lab1</title></head>' +
			'<body style="background: whitesmoke">' +
			'<h1>REQUEST</h1>' +
			'<p>' + 'method: ' + request.method + '</p>' +
			'<p>' + 'uri: ' + request.url + '</p>' +
			'<p>' + 'version: ' + request.httpVersion + '</p>' +
			'<p>' + 'HEADERS: ' + head(request) + '</p>' +
			'<p>' + 'body: ' + body + '</p>' +
			'</body>' +
			'</html>'
		)
	)
}).listen(3000); //Запуск сервера на порте 3000

console.log('Server running at http://localhost:3000/');