const http = require('http');
const { parse } = require('path');
const PORT = process.env.PORT || 5000;
const todos = require('./todos');
const getRequestData = require('./utils');

const server = http.createServer(async (request, response) => {
    if (request.url === '/api/v1/users' && request.method === "GET") {
        console.info(request.url);
        response.writeHead(200, {
            "context-type": "text/plain"
        })
        response.end(JSON.stringify(todos));
    } else if (request.url === '/api/v1/todos' && request.method === 'POST') {
        let req_body = await getRequestData(request)
        todos.push(JSON.parse(req_body))
        response.writeHead(201, { 'content-type': 'aplication/json' });
        response.end(JSON.stringify(JSON.parse(req_body)));
    } else if (request.url.match(/\/api\/v1\/todos\/([0-9])/) && request.method === "PUT") {
        const id = request.url.split("/")[4];
        const todo = todos.find(t=>t.id=== parseInt(id));
        if (!todo) {
            response.writeHead(404,{"content-type":"aplication/json"});
            response.end("No todo with id present");
        }else{
            const index = todos.indexOf(todo);
            let todo_data= await getRequestData(request);
            todos.splice(index,1,JSON.parse(todo_data));
            response.writeHead(404, {"Content-type":"aplication/json"});
            response.end(JSON.stringify(JSON.parse(todo_data)));
        }

    }

    else if (request.url.match(/\/api\/v1\/todos\/([0-9])/) && request.method === 'DELETE') {
        const id = request.url.split("/")[4]
        const todo = todos.find(t => t.id === parseInt(id))
        if (!todo) {
            response.writeHead(404, {'content-type': 'application/json'});
            response.end("No todo with the specific id is available")
        }
        else {
            const index = todos.indexOf(todo);
            todos.splice(index, 1);
            response.writeHead(200, {
                "content-type": "aplication/json"
            })
            response.end("Deleted the specific todo");

        }
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