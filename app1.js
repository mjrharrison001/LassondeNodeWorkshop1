//Generic Express Hello World Code
// Example of final app running on Bluemix - http://lassondenode.mybluemix.net/form
// Try entering your first and last name


//Declaring variables and "importing"/requiring dependancies
//You must npm install express as shown in the workshop <-- npm install express --save
var express = require('express');
var app = express();

/**
* routes are a key component of express - how you the developer tell the server
* how to handle htpp requests.
**/
app.get('/', function (req, res) {
  res.send('Hello World!');
});

/**
* will run on port 3000
* 1) start server using the - node app1.js (on terminal/cmd) command
* 2) type http://localhost:3000/ into browser
**/
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
