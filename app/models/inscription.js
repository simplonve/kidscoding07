var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/inscriptions');

var Schema = mongoose.Schema;

var inscriptionSchema = new Schema({
    nom_enfant : String,
    prenom_enfant : String,
    age : String,
    nom_representant : String,
    prenom_representant : String,
    mail : String,
    telephone : String,
    date : String,
    photo : String,
});

var Inscription = mongoose.model('Inscription', inscriptionSchema);

Inscription.find(function(err, inscrits) {
    console.log(inscrits);
});
