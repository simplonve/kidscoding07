var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
	res.render('accueil');
});

app.get('/inscription', function(req, res){
	res.render('inscription');
});

app.post('/inscription', function(req, res){
	if (req.body) { console.log(req.body); }
	res.render('accueil');
});


fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});


app.listen(3000);