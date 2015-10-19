//Adding post /form route and sending collected form data back to client LINES 61-106
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
* added the route /person/"STRING"
* Can access the variable by storing it in "name"
* We then send the name to the clien's browser using res.send
* Try running http://localhost:3000/person/mike on your browser
**/
app.get('/person/:name', function (req, res) {
  res.send("Hi " + req.params.name);
});


// Tell the app where to look for your "views"/html/ejs files
app.set('views', __dirname + '/');

// Allow the app the "render" your html
app.engine('html', require('ejs').renderFile);

// On http requiest /form, render the html to the client
app.get('/form', function (req, res) {
  res.render('page.html');
});

//require body-parser
var bodyParser = require('body-parser');

//by reading the online documentation for body-parser I know to include -
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
* Looking at page.html we see action for the form is to post to /form
* This decleration is the route to hadnle the post
* We can access the data submitted in the fields by using body-parser
* As before, npm install the package, save it on our package.json and require it
* Test what inputting data into the fields do now (on the browser)
* Aside: npm install nodemon -g, then run your app using nodemon appName to speed up production of app
**/
app.post('/form', function (req, res) {
  var fn = req.body.first;
  var ln = req.body.last;
  var out = "Data collected was - " + fn + " and " + ln;

  /**
  * we now aim to send the data back to the client in the form of an html page
  * the method I use below is "hackish" and is used to avoid using databases
  * and other packages (keeping the code simple).
  **/
  //res.send(out);

  //require fs to allow us to load in the html file into memory
  //reuire is normally declared at the top of the app, placing here for easier read
  var fs = require('fs');

  fs.readFile('page2t.html', 'utf-8', function(err, html){
    if (err){
      console.log(err);
      res.send("Whoops");
    }
    else{
      //var html constains our "base template" that we wish to add to
      //using .replace we swap in our collcted data for the "flag"
      //tml = html.replace("#first#", fn);
      //html = html.replace("#last#", ln);
      //res.send(html);

      html = html.replace("#first#", fn);

      var rplc = '#last#</td></tr></tbody>';
      var nxt = ln;

      nxt += '</td></tr><tr><td>#first#</td><td>#last#</td></tr></tbody>';
      //console.log(nxt);
      //console.log(html);
      html = html.replace(rplc, nxt);
      //console.log(html);

      fs.writeFile('page2t.html',html,function(err){
        if(err){
          res.send("Whoops");
        }
        else{
          console.log(html)
          res.send(html);
        }
      });
    }
  });
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
