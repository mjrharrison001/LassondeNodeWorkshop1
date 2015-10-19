//Adding your own routes LINES 16-24

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
* added the route /person/"STRING"
* Can access the variable by storing it in "name"
* We then send the name to the clien's browser using res.send
* Try running http://localhost:3000/person/mike on your browser
**/
app.get('/person/:name', function (req, res) {
  res.send("Hi " + req.params.name);
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
