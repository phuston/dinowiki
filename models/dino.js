var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dino = new Schema({
	content: {type: String, required: true},
	species: {type: String, required: true, unique: true},
	upvotes: {type: Number, default: 0, required: true},
	downvotes: {type: Number, default: 0, required: true},
	img: {type: String}
}, {collection: 'Dino'});

module.exports = mongoose.model('Dino', Dino);