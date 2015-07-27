var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');

var app = express();



// Appel des modèles de l'app

fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});
var Inscription = mongoose.model('Inscription')



//Settings de l'app

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



//Routes vers les pages de l'app

app.get('/', function(req, res){
  res.render('accueil');
});

app.get('/inscription', function(req, res){
  res.render('inscription');
});

app.post('/inscription', function(req, res){
  if (req.body) { console.log(req.body); }
  new Inscription({
    nom_enfant          : req.body.nom_enfant,
    prenom_enfant       : req.body.prenom_enfant,
    age                 : req.body.age,
    nom_representant    : req.body.nom_representant,
    prenom_representant : req.body.prenom_representant,
    mail                : req.body.mail,
    telephone           : req.body.telephone,
    date                : req.body.date,
    photo               : req.body.photo,
  }).save( function(err, inscription){
    res.redirect('/ateliers');
  });
});

app.get('/ateliers', function(req, res){
  Inscription.find(function(err, inscrits) {
    res.render('ateliers', {inscrits : inscrits});
  });
});

app.get('/delete/:inscrit_id', function(req, res){
  Inscription.findById(req.params.inscrit_id, function(err, inscrit){
    inscrit.remove(function ( err, inscrit ){
      res.redirect('/ateliers');
    });
  });
});

app.listen(3000);