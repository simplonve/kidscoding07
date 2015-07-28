var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    email : { type: String, required: true },
    question : { type: String, required: true }
});

var Inscription = mongoose.model('Message', messageSchema);