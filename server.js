var express = require('express');
var logger = require("morgan");
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');



var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));

app.set('view engine', "handlebars");
// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// connecting to the database
mongoose.Promise = Promise; 
mongoose.connect(db, function(error){
  if (error) {
    console.log(error);
  }
  else{
    console.log("mongoose connection is successful");
  }
});

app.listen(PORT, function(){
  console.log("listening on port:" + PORT);
  });
