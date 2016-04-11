var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dino = new Schema({
	species: {type: String, required: true, unique: true},
	content: {type: String},
	upvotes: {type: Number, default: 0, required: true},
	downvotes: {type: Number, default: 0, required: true},
	img: {type: String}
}, {collection: 'Dino'});

// probably don't need to specify collection twice
module.exports = mongoose.model('Dino', Dino);
