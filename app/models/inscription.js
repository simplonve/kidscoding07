var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inscriptionSchema = new Schema({
    nom_enfant : { type: String, required: true },
    prenom_enfant : { type: String, required: true },
    age : { type: String, required: true },
    nom_representant : { type: String, required: true },
    prenom_representant : { type: String, required: true },
    mail : { type: String, required: true },
    telephone : { type: String, required: true },
    date : { type: Array, required: true },
    photo : { type: String, required: true }
});

var Inscription = mongoose.model('Inscription', inscriptionSchema);