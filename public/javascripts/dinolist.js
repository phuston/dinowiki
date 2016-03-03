(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DinoList = React.createClass({displayName: "DinoList",
	getInitialState: function() {
    return {
    	selectedDino: null
    };
	},

	componentDidMount: function() {
	    return
	},

	// Show dino in dinodetail
	handleDinoClick: function(dino, i) {
		// console.log(dino);
		this.setState({selectedDino: i});
		this.props.onDisplayDino(dino);
	},

	handleAddDino: function() {
		this.setState({selectedDino: 'add'});
		this.props.onAddDino();
	},

	render: function() {
		console.log("CALLED", this.state.selectedDino);
		var dinoList = this.props.dinos.map(function(dino, i){
			var style = {};
			if (i === this.state.selectedDino) {
				style = {'background': '#FC3468'}
			}
			return (
				React.createElement("div", {style: style, 
							className: "dino-label", 
							onClick: this.handleDinoClick.bind(this, dino, i), 
							key: i}, 
					dino.species
				)
			);
		}, this);

		var styleAdd;
		if (this.state.selectedDino === 'add') {
			styleAdd = {'background': '#777777'};
		}

		return (
			React.createElement("div", {id: "dino-list-container"}, 
				React.createElement("div", {className: "list-button"}, 
					React.createElement("button", {style: styleAdd, id: "add-dino", onClick: this.handleAddDino}, 
						"Add a Dino"
					)
				), 
				React.createElement("div", {id: "dino-list"}, 
					dinoList
				)
			)
		)
	}
});

module.exports = DinoList;
},{}]},{},[1]);
