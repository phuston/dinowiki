var express = require('express');
var router = express.Router();
var Dino = require('./../models/dino');
var ObjectId = require('mongoose').Types.ObjectId;

/* GET all dinos. */
router.get('/', function(req, res, next) {
  Dino.find(function(err, dinos) {
  	if (!err) {
  		res.send(dinos);
  	} else {
  		console.log(err),
  		res.send(err);
  	}
  })
});

router.post('/', function(req, res, next) {
	var dino = req.body;
	(new Dino(req.body)).save(function(err, dino) {
		if (!err) {
			console.log(dino);
			res.send(dino);
		} else {
			console.log(err);
			res.send(err);
		}
	})
});

router.put('/', function(req, res, next) {
	var dino = req.body;
	var dinoId = new ObjectId(dino.id);

	Dino.findOne({
		'_id': dinoId
	}, function(err, dino) {
		if (!err) {
			if (dino.species) dino.species = dino.species;
			if (dino.content) dino.content = dino.content;
			if (dino.upvotes) dino.upvotes = dino.upvotes;
			if (dino.downvotes) dino.downvotes = dino.downvotes;
			dino.save(function(err) {
				if (err) {
					console.log(err);
					res.send(err);
				} else {
					res.send(dino);
				}
			});
		} else {
			console.log(err);
			res.send(err);
		}
	})
});

router.delete('/', function(req, res, next) {
	var dino = req.body;
	Dino.findOne({
		'_id': new ObjectId(dino._id)
	}).remove(function(err, dino) {
		if (!err) {
			res.send(dino);
		} else {
			console.log(err),
			res.send(err);
		}
	})
})

module.exports = router;
