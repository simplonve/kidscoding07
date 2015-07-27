var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var routes = require('./routes/');


var app = express();

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.accueil);
app.get('/inscription', routes.inscription);

app.listen(3000);