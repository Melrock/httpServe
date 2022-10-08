const http = require('http');
const PORT = process.env.PORT || 5000;
const todos = require('./todos');

const server = http.createServer((request, response) => {
    if (request.url === '/api/v1/users' && request.method === "GET") {
        console.info(request.url);

        response.writeHead(200, {
            "context-type": "text/plain"
        })
        response.end(JSON.stringify(todos));
    }

})

server.listen(PORT, () => {
    console.info('server is ready and PORT', PORT);
})

server.on('error', () => {
    if (erorr.code = "EADR") {
        console.error('Port already in use')
    }
})