var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');

var app = express();



// Node Mailer

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();



// Appel des modèles de l'app

fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});
var Inscription = mongoose.model('Inscription')
var Message = mongoose.model('Message')


mongoose.connect('mongodb://localhost:27017/inscriptions');



//Settings de l'app

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



//Routes vers les pages de l'app

app.get('/', function(req, res){
  res.render('accueil');
});

app.post('/', function(req, res){
  transporter.sendMail({
    from: req.body.email,
    to: 'kidscoding07@gmail.com',
    subject: 'Question à propos de KidsCoding.',
    text: req.body.question
  });
  res.redirect('/');
});

app.get('/inscription', function(req, res){
  res.render('inscription');
});

app.post('/inscription', function(req, res){
  new Inscription({
    nom_enfant          : req.body.nom_enfant,
    prenom_enfant       : req.body.prenom_enfant,
    age                 : req.body.age,
    nom_representant    : req.body.nom_representant,
    prenom_representant : req.body.prenom_representant,
    mail                : req.body.mail,
    telephone           : req.body.telephone,
    date                : req.body.date,
    photo               : req.body.photo
  }).save(function(err){
      if(!err) {
          res.redirect('/ateliers');
      } else {
          console.log(err);
          return response.send('ERROR');
      }
  });
});

app.get('/ateliers', function(req, res){
  Inscription.find(function(err, inscrits) {
    res.render('admin', {inscrits : inscrits});
  });
});

app.get('/edit/:inscrit_id', function(req, res){
  Inscription.findById(req.params.inscrit_id, function(err, inscrit){
    console.log(inscrit);
    res.render( 'edit', {
      id                  : inscrit.id,
      nom_enfant          : inscrit.nom_enfant,
      prenom_enfant       : inscrit.prenom_enfant,
      age                 : inscrit.age,
      nom_representant    : inscrit.nom_representant,
      prenom_representant : inscrit.prenom_representant,
      mail                : inscrit.mail,
      telephone           : inscrit.telephone,
      date                : inscrit.date,
      photo               : inscrit.photo
    });
  });
});

app.post('/edit/:inscrit_id', function(req, res){
    return Inscription.findById(req.params.inscrit_id, function(err, inscrit){
        inscrit.nom_enfant          = req.body.nom_enfant;
        inscrit.prenom_enfant       = req.body.prenom_enfant;
        inscrit.age                 = req.body.age;
        inscrit.nom_representant    = req.body.nom_representant;
        inscrit.prenom_representant = req.body.prenom_representant;
        inscrit.mail                = req.body.mail;
        inscrit.telephone           = req.body.telephone;
        inscrit.date                = req.body.date;
        inscrit.photo               = req.body.photo;

        return inscrit.save(function(err){
            if(!err) {
                res.redirect('/ateliers');
            } else {
                console.log(err);
                return response.send('ERROR');
            }
        });
    });
});

app.get('/delete/:inscrit_id', function(req, res){
  Inscription.findById(req.params.inscrit_id, function(err, inscrit){
    inscrit.remove(function(err){
      res.redirect('/ateliers');
    });
  });
});

app.get('/messages', function(req, res){
  Message.find(function(err, messages) {
    res.render('message', {messages : messages});
  });
});

app.get('/admin', function(req, res){
  Inscription.find(function(err, inscrits) {
    res.render('admin', {inscrits : inscrits});
  });
});



//Lancemant du serveur sur le port 3000 

app.listen(3000);