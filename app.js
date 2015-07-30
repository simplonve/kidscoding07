var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');
var http = require ('http');

var app = express();


var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/inscriptions';
var theport = process.env.PORT || 3000;

// Node Mailer

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();



// Appel des modèles de l'app

fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});
var Inscription = mongoose.model('Inscription')


mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});



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
  var date1 = ["26 Août", []],
      date2 = ["2 Septembre", []],
      date3 = ["9 Septembre", []],
      date4 = ["16 Septembre", []],
      date5 = ["23 Septembre", []],
      date6 = ["30 Septembre", []],
      date7 = ["7 Octobre", []],
      date8 = ["14 Octobre", []],
      date9 = ["21 Octobre", []],
      date10 = ["28 Octobre", []];

  Inscription.find(function(err, inscrits) {
    inscrits.forEach(function(inscrit, i, arr){
      inscrit.date.forEach(function(date, i, arr){
        switch (date) {
          case "26-08":
            date1[1].push(inscrit);
            break;
          case "02-09":
            date2[1].push(inscrit);
            break;
          case "09-09":
            date3[1].push(inscrit);
            break;
          case "16-09":
            date4[1].push(inscrit);
            break;
          case "23-09":
            date5[1].push(inscrit);
            break;
          case "30-09":
            date6[1].push(inscrit);
            break;
          case "07-10":
            date7[1].push(inscrit); 
            break;
          case "14-10":
            date8[1].push(inscrit); 
            break;
          case "21-10":
            date9[1].push(inscrit); 
            break;
          case "28-10":
            date10[1].push(inscrit); 
            break;
          default:
            console.log("Désolé, date introuvable!");
        }
      });
    });
    var date = [date1, date2, date3, date4, date5, date6, date7, date8, date9, date10];
    res.render('ateliers', {date : date});
  });
});

app.get('/edit/:inscrit_id', function(req, res){
  Inscription.findById(req.params.inscrit_id, function(err, inscrit){
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
                res.redirect('/admin');
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
      res.redirect('/admin');
    });
  });
});

app.get('/admin', function(req, res){
  Inscription.find(function(err, inscrits) {
    res.render('admin', {inscrits : inscrits});
  });
});



//Lancemant du serveur sur le port 3000 

app.listen(theport, function() {
    console.log('Our app is running on');
});