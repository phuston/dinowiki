var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dino = new Schema({
	species: {type: String, required: true, unique: true},
	content: {type: String},
	upvotes: {type: Number, default: 0, required: true},
	downvotes: {type: Number, default: 0, required: true},
	img: {type: String}
}, {collection: 'Dino'});

module.exports = mongoose.model('Dino', Dino);