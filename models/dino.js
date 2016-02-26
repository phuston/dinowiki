var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dino = new Schema({
	content: {type: String, required: true},
	species: {type: String, required: true, unique: true},
	img: {type: String}
}, {collection: 'Dino'});

module.exports = mongoose.model('Dino', Dino);