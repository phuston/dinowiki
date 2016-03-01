(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DinoList = require('./dinolist.jsx');
var DinoDetail = require('./dinodetail.jsx');
var DinoForm = require('./dinoForm.jsx');

var DISPLAY_NONE = 'none';
var DISPLAY_DINO = 'dino';
var DISPLAY_FORM = 'form';

var DinoApp = React.createClass({displayName: "DinoApp",
	getInitialState: function() {
    return {
      detailDisplay: DISPLAY_NONE,
      dinos: [],
      displayDino: {}
    }
  },

  componentDidMount: function() {
    this.loadDinosFromServer();
    setInterval(this.loadTodosFromServer, this.props.pollInterval);
  },

	loadDinosFromServer: function() {
		$.ajax({
			url:this.props.url,
			dataType: 'json',
			cache: false,
			success: function(dinos){
				this.setState({dinos: dinos})
			}.bind(this),
			error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
		})
	},

	handleDinoSubmit: function(newDino){
    console.log(newDino);
		var oldDinos = this.state.dinos;
		var optimisticDinos = [newDino].concat(this.state.dinos);
    console.log(optimisticDinos);

		this.setState({dinos: optimisticDinos});

    $.ajax({
    	url: this.props.url,
    	type: 'POST',
    	dataType: 'json',
    	data: newDino,
    	success: function(newDino){
        console.log(newDino);
    		this.setState({dinos: [newDino].concat(oldDinos)});
    	}.bind(this),
			error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
	},

	handleDinoEdit: function(editDino){
		var oldDinos = this.state.dinos;

		// Optimistic updating of Dinos
    var editedDinos = this.state.dinos.map(function(dino){
      if (dino.id == editDino.id) {
        dino.content = editDino.content;
        dino.votes = editDino.votes;
      }
      return dino;
    });

    this.setState({dinos: editedDinos})

    $.ajax({
    	url: this.props.url,
    	type: 'PUT',
    	dataType: 'json',
    	data: editDino,
    	success: function(editedDino){
    		// TODO: Do we actually need this?
    	}.bind(this),
    	error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
	},

	handleDinoDelete: function(deleteDino){
		var oldDinos = this.state.dinos;

		var deletedDinos = this.state.dinos.filter(function(dino){
			return dino.id != deleteDino.id;
		});

		this.setState({dinos: deletedDinos});

		$.ajax({
			url: this.props.url,
			type: 'DELETE',
			dataType: 'json',
			data: deleteDino,
			success: function(response){
				// TODO: What is this response?
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		})
	},

  showDinoForm: function() {
    this.setState({detailDisplay: DISPLAY_FORM});
  },

  showDinoDetail: function(dino) {
    this.setState({detailDisplay: DISPLAY_DINO, displayDino: dino});
  },

	render: function(){

    var detail;

    switch(this.state.detailDisplay){
      case DISPLAY_NONE:
        detail = (
          React.createElement("h1", null, "LOGO OR SOMETHING")
        )
        break;

      case DISPLAY_FORM: 
        detail = React.createElement(DinoForm, {onDino: this.handleDinoSubmit});
        break;

      case DISPLAY_DINO:
        detail = (
          React.createElement(DinoDetail, {
            dino: this.state.displayDino}
          )
        )
        break;
    }

    return (
      React.createElement("div", null, 
        React.createElement(DinoList, {
          dinos: this.state.dinos, 
          onAddDino: this.showDinoForm, 
          onDisplayDino: this.showDinoDetail}
        ), 
        React.createElement("div", {id: "main-container"}, 
          detail
        )
      )
    )
	}


});

ReactDOM.render(
  React.createElement(DinoApp, {url: "/api/dinos", pollInterval: 2000}),
  document.getElementById('content')
);
},{"./dinoForm.jsx":2,"./dinodetail.jsx":3,"./dinolist.jsx":4}],2:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
	    return {
	    	species: '',
	    	content: '',
	    };
	},
	changeSpecies: function(ev) {
		this.setState({
			species: ev.target.value
		});
	},
	changeContent: function(ev) {
		this.setState({
			content: ev.target.value
		});
	},
	addDino: function(ev) {
		ev.preventDefault();

		if (this.state.species.length == 0) {
			// Show error message?
			return;
		}

		this.props.onDino({
			species: this.state.species,
			content: this.state.content
		});

		this.setState({
			species: '',
			content: ''
		});

		// console.log(this.state.name, this.state.content);
	},
	render: function() {
		return (
			React.createElement("form", {id: "addForm", onSubmit: this.addDino}, 
				React.createElement("div", null, 
					React.createElement("div", null, React.createElement("input", {type: "text", id: "species", value: this.state.species, onChange: this.changeSpecies, placeholder: "New dino's name"}))
				), 
				React.createElement("div", null, 
					React.createElement("textarea", {rows: "4", cols: "40", value: this.state.content, onChange: this.changeContent, placeholder: "Fun facts about this dino"})
				), 
				React.createElement("div", null, 
					React.createElement("button", null, "Add Dino!")
				)
			)
		);
	}
})
},{}],3:[function(require,module,exports){
var DinoDetail = React.createClass({displayName: "DinoDetail",
	render: function(){
		return (
			React.createElement("div", {id: "dino-detail-container"}, 
				React.createElement("h1", null, this.props.dino.species), 
				React.createElement("p", null, this.props.dino.content), 
				React.createElement("button", null, "+1"), 
				React.createElement("button", null, "-1"), 
				React.createElement("button", null, "Delete")
			)
		)
	}
});

module.exports = DinoDetail;
},{}],4:[function(require,module,exports){
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
					React.createElement("div", {id: "list-title"}, React.createElement("h1", null, "Dinos")), 
					React.createElement("div", {id: "list-plus"}, React.createElement("button", {id: "add-dino", onClick: this.props.onAddDino}, "+"))
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
