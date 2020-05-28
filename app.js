// FOREVER RUN SERVER forever -c "./node_modules/.bin/nodemon —exitcrash -L" app.js

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
		//else post a student to list route
	} else if (method === 'POST' && url === '/students') {
		// Post request on '/students'
		console.log('received a POST request');
		res.setHeader('Content-Type', 'application/json');
		// Handle getting data from the client request (on POST)
		let data = []; // Used to collect chunks of data
		req.on('data', (chunk) => {
			// Make sure data was sent on the right url
			if (url === '/students') {
				// This event fires when we receive data in the request. The data comes in chunks
				console.log(`Data chunk available: ${chunk}`);
				// We need to parse the chunk, or we will store it as a stream object
				data.push(JSON.parse(chunk));
			}
		});
		req.on('end', () => {
			// The end event signifies the end of the request, and therfore the end of the data stream
			// We'll store any data we got from a post in our array, then send our response to the client
			// If we got data (for a post), add it to our array of students
			// In this case, we only expect to get a single chunk of data - just a student name to add to our array of students
			if (data.length > 0) {
				console.log('retrieved data', data[0]);
				students.push(data[0].name);
				// Send the stringified list of students we've constructed according to the route and method
				res.statusCode = 201; //'created' status code
				res.end(JSON.stringify(students));
			}
		});

		// Handle data and send back updated student list with end
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
