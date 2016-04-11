var express = require('express');
var router = express.Router();
var Dino = require('./../models/dino');
var ObjectId = require('mongoose').Types.ObjectId;

// GET all dinos
// weird indenting here, you should probably convert tabs to spaces in your editor or atleast make sure to be consistent to use one over the other
router.get('/', function(req, res, next) {
  Dino.find(function(err, dinos) {
  	if (!err) {
  		res.send(dinos);
  	} else {
  		res.send(err);
  	}
  })
});

// POST a new dino
router.post('/', function(req, res, next) {
	var dino = req.body;
        //Dino.create would be a bit more concise
	(new Dino(req.body)).save(function(err, dino) {
		if (!err) {
			res.send(dino);
		} else {
			console.log(err);
			res.send(err);
		}
	})
});

// EDIT a dino
router.put('/', function(req, res, next) {
	var body = req.body;
	var dinoId = new ObjectId(body._id);

        //findByIdAndUpdate
	Dino.findOne({
		'_id': dinoId
	}, function(err, dino) {
		if (!err) {
			dino.species = body.species;
			dino.content = body.content;
			dino.upvotes = body.upvotes;
			dino.downvotes = body.downvotes;
			dino.save(function(err) {
				if (err) {
					res.send(err);
				} else {
					res.send(dino);
				}
			});
		} else {
			res.send(err);
		}
	})
});

// DELETE a dino
router.delete('/', function(req, res, next) {
	var body = req.body;
        // could use findByIdAndRemove(I
	Dino.findOne({
		'_id': new ObjectId(body._id)
	}).remove(function(err, dino) {
		if (!err) {
			res.send(dino);
		} else {
			res.send(err);
		}
	})
})

module.exports = router;
