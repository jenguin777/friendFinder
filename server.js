var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

// serve static assets
// app.use(express.static(__dirname + '/app/public'));

var app = express();
var PORT = 8082;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Require routing files
var htmlRoutes = require("./app/routing/htmlRoutes")(app);
var apiRoutes = require("./app/routing/apiRoutes")(app);
// 'C:\coding_bootcamp\gitLab\friendFinder\app\routing\app\public\survey.html'

// app.use(apiRoutes);
// app.use(htmlRoutes);
  
  // app.get("/api/people/:chosen?", function(req, res) {

  //   var chosen = req.params.chosen;

  // });

  // app.get("/", function(req, res) {
  //   res.send("Welcome to the FriendFinder Application");
  //   res.end();
  // });

  // app.get('/survey', function(req, res) {
  //   res.sendFile(path.join(__dirname, '/app/public/survey.html'))
  // });


app.listen(PORT, function() {
    console.log("Server started listening on http://localhost " + PORT);
});