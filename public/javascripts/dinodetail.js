(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DinoDetail = React.createClass({displayName: "DinoDetail",
	upvoteDino: function() {
		var editedDino = Object.assign({}, this.props.dino);
		editedDino.upvotes += 1;
		console.log(this.props.dino, 'upvote');
		console.log(editedDino, 'upvote');
		this.props.onEditDino(editedDino);
	},

	downvoteDino: function() {
		var editedDino = Object.assign({}, this.props.dino);
		editedDino.downvotes += 1;
		console.log(this.props.dino, 'downvote');
		console.log(editedDino, 'downvote');
		this.props.onEditDino(editedDino);
	},

	render: function(){
		return (
			React.createElement("div", {id: "dino-detail-container"}, 
				React.createElement("h1", null, this.props.dino.species), 
				React.createElement("p", null, this.props.dino.content), 
				React.createElement("p", null, "RATING: ", this.props.dino.upvotes - this.props.dino.downvotes), 
				React.createElement("button", {onClick: this.upvoteDino}, "+1"), 
				React.createElement("button", {onClick: this.downvoteDino}, "-1"), 
				React.createElement("button", null, "Delete")
			)
		)
	}
});

module.exports = DinoDetail;
},{}]},{},[1]);
