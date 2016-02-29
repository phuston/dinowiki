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
	var info = req.body;
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
	var info = req.body;
	var dinoId = new ObjectId(info.id);

	Dino.findOne({
		'_id': dinoId
	}, function(err, dino) {
		if (!err) {
			if (info.species) dino.species = info.species;
			if (info.content) dino.content = info.content;
			if (info.upvotes) dino.upvotes = info.upvotes;
			if (info.downvotes) dino.downvotes = info.downvotes;
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
	var info = req.body;
	Dino.findOne({
		'_id': new ObjectId(info.id)
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
