// setup our web server using the HTTP module that comes with Node.js
const http = require('http'); //node library to start web server

const hostname = '127.0.0.1';
const port = 3000;

let students = ['Carlie', 'Tony', 'Sarah', 'Amber', 'Nav', 'Ryan'];

// callback function within the http library called createServer takes in key variables 'request' and 'response' to act on the server
const server = http.createServer((req, res) => {
	//deconstructing variable for the commented actions below
	const { method, url, header } = req;
	//first route for home
	if (method === 'GET' && url === '/') {
		res.setHeader('Content-Type', 'text/plain');
		res.end('Matching Students');
		//else get the students list route
	} else if (method === 'GET' && url === '/students') {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(students));
	} else {
		res.statusCode = 404; // status code for route not found
		res.setHeader('Content-Type', 'text/plain');
		res.end('Not Found'); // not found message
		console.log('Invalid Route'); //log err with message
		throw 'Route not found'; //throws err to catch/handle later
	}
	// res.statusCode = 200; // status code
	// res.setHeader('Content-Type', 'text/plain'); // set content type for header
	// res.end('Hello World'); // send off content to body
});

// tell our server what IP address to use and which to port number to listen on
server.listen(port, hostname, () => {
	//confirmation msg
	console.log(`Server running at http://${hostname}:${port}/`);
});
