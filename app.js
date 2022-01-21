const path = require('path');
const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');

// Create express app
var app = express();

// Parse incoming requests data
app.use(bodyParser.json());

// Select Enviroment
require('dotenv').config();

// Map static/assets folder
app.use(express.static('assets'));

// Log requests to the console.
// More options here - https://github.com/bithavoc/express-winston#request-logging
app.use(
	expressWinston.logger({
		transports: [new winston.transports.Console()],
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.json()
		),
		meta: false,
		msg: 'HTTP  ',
		expressFormat: true,
		colorize: false,
		ignoreRoute: function (req, res) {
			return false;
		},
	})
);

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you are sure that authentication is not needed

app.all('/api/*', [require('./middlewares/jwt-middleware')]);

// Add Routing Mapping
app.use('/', require('./routes/router'));

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
	return res.status(404).send({
		success: false,
		message: 'Not Found',
	});
});

// Start the server
app.set('port', process.env.APP_PORT || 8080);

var server = app.listen(app.get('port'), function () {
	console.log(
		`${process.env.APP_NAME || 'Express.js server'} is listening on port ${
			server.address().port
		}`
	);
});
