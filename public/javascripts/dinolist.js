(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DinoList = React.createClass({displayName: "DinoList",
	componentDidMount: function() {
	    return
	},

	// Show dino in dinodetail
	handleDinoClick: function(dino) {
		// console.log(dino);
		this.props.onDisplayDino(dino);
	},

	handleAddDino: function() {
		this.props.showDinoForm();
	},

	render: function() {
		var dinoList = this.props.dinos.map(function(dino, i){
			return (
				React.createElement("li", {onClick: this.handleDinoClick.bind(this, dino), key: i}, 
					dino.species
				)
			);
		}, this);

		return (
			React.createElement("div", {id: "dino-list-container"}, 
				React.createElement("div", {id: "dino-list-header"}, 
					React.createElement("h1", null, "Dinos"), 
					React.createElement("button", {className: "add-dino", onClick: this.props.onAddDino}, "+")
				), 

				React.createElement("div", {id: "dino-list"}, 
					React.createElement("ul", null, 
						dinoList
					)
				)
			)
		)
	}
});

module.exports = DinoList;
},{}]},{},[1]);
