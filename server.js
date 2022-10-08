const http= require('http');
const PORT= process.env.PORT || 5000;

const server= http.createServer((request, response)=>{
    response.writeHead(200, {
        "context-type": "text/plain"
    })
    response.end("Hello");
})

server.listen(PORT, ()=>{
    console.info('server is ready and PORT', PORT);
})

server.on('error', ()=>{
    if (erorr.code= "EADR") {
        console.error('Port already in use')
    }
})