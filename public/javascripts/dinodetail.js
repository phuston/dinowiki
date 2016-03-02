(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Editable = require('./editable.jsx');

var DinoDetail = React.createClass({displayName: "DinoDetail",
	upvoteDino: function() {
		var editedDino = Object.assign({}, this.props.dino);
		editedDino.upvotes += 1;
		this.props.onEditDino(editedDino);
	},

	downvoteDino: function() {
		var editedDino = Object.assign({}, this.props.dino);
		editedDino.downvotes += 1;
		this.props.onEditDino(editedDino);
	},

	changeSpecies: function(newSpecies) {
		var editedDino = Object.assign({}, this.props.dino);
		editedDino.species = newSpecies;
		this.props.onEditDino(editedDino);
	},

	changeContent: function(newContent) {
		var editedDino = Object.assign({}, this.props.dino);
		editedDino.content = newContent;
		this.props.onEditDino(editedDino);
	},

	handleDinoDelete: function() {
		console.log("DELETING");
		this.props.handleDinoDelete(this.props.dino);
	},

	render: function(){
		return (
			React.createElement("div", {id: "dino-detail-container"}, 
				React.createElement(Editable, {onChange: this.changeSpecies, text: this.props.dino.species, tag: "h1"}), 
				React.createElement(Editable, {onChange: this.changeContent, text: this.props.dino.content, tag: "p"}), 
				React.createElement("p", null, "RATING: ", this.props.dino.upvotes - this.props.dino.downvotes), 
				React.createElement("button", {onClick: this.upvoteDino}, "+1"), 
				React.createElement("button", {onClick: this.downvoteDino}, "-1"), 
				React.createElement("button", {onClick: this.handleDinoDelete}, "Delete")
			)
		)
	}
});

module.exports = DinoDetail;
},{"./editable.jsx":2}],2:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  render: function() {
    if (this.props.tag === 'h1') {
      return React.createElement("h1", {onBlur: this.commitChange, 
                contentEditable: true}, this.props.text);
    } else {
      return React.createElement("p", {onBlur: this.commitChange, 
                contentEditable: true}, this.props.text);
    }
  },

  // shouldComponentUpdate: function(nextProps) {
  //   return nextProps.html !== this.getDOMNode().innerHTML;
  // },

  commitChange: function() {
    var html = ReactDOM.findDOMNode(this).innerHTML; //this.getDOMNode().innerHTML;
    this.props.onChange(html);
  }
});
},{}]},{},[1]);
