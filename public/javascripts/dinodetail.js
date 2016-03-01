(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DinoDetail = React.createClass({displayName: "DinoDetail",

	handleDinoDelete: function(){
		console.log("DELETING");
		this.props.handleDinoDelete(this.props.dino);
	},

	render: function(){
		return (
			React.createElement("div", {id: "dino-detail-container"}, 
				React.createElement("h1", null, this.props.dino.species), 
				React.createElement("p", null, this.props.dino.content), 
				React.createElement("button", null, "+1"), 
				React.createElement("button", null, "-1"), 
				React.createElement("button", {onClick: this.handleDinoDelete}, "Delete")
			)
		)
	}
});

module.exports = DinoDetail;
},{}]},{},[1]);
