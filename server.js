var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8082;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Require routing files
var htmlRoutes = require("./app/routing/htmlRoutes")(app);
var apiRoutes = require("./app/routing/apiRoutes")(app);

app.listen(PORT, function() {
    console.log("Server started listening on http://localhost " + PORT);
});