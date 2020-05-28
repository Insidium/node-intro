// setup our web server using the HTTP module that comes with Node.js
const http = require('http'); //node library to start web server

const hostname = '127.0.0.1';
const port = 3000;

// callback function within the http library called createServer takes in key variables 'request' and 'response' to act on the server
const server = http.createServer((req, res) => {
	res.statusCode = 200; // status code
	res.setHeader('Content-Type', 'text/plain'); // set content type for header
	res.end('Hello World'); // send off content to body
});

// tell our server what IP address to use and which to port number to listen on
server.listen(port, hostname, () => {
	//confirmation msg
	console.log(`Server running at http://${hostname}:${port}/`);
});
