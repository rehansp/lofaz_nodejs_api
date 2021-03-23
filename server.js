const http = require('http');
const app = require('./api/app');
const port = process.env.port || 8085;
const server = http.createServer(app);
server.listen(port);

console.log('Server running at http://127.0.0.1:'+(port)+'/');