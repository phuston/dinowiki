(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DinoList = require('./dinolist.jsx');
var DinoDetail = require('./dinodetail.jsx');
var DinoForm = require('./dinoForm.jsx');

var DisplayEnum = Object.freeze({
  DISPLAY_NONE: 'none',
  DISPLAY_DINO: 'dino',
  DISPLAY_FORM: 'form'
});

var DinoApp = React.createClass({displayName: "DinoApp",
	getInitialState: function() {
    return {
      detailDisplay: DisplayEnum.DISPLAY_NONE,
      dinos: [],
      displayDino: {}
    }
  },

  componentDidMount: function() {
    this.loadDinosFromServer();
    setInterval(this.loadDinosFromServer, this.props.pollInterval);
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

    $.ajax({
    	url: this.props.url,
    	type: 'POST',
    	dataType: 'json',
    	data: newDino,
    	success: function(newDino){
        console.log(newDino);
        if (!newDino.code) {
          this.setState({dinos: oldDinos.concat([newDino])});
        }
    	}.bind(this),
			error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
	},

	handleDinoEdit: function(editDino){
    console.log(editDino);
		var oldDinos = this.state.dinos;

		// Optimistic updating of Dinos
    var editedDinos = this.state.dinos.map(function(dino){
      if (dino._id == editDino._id) {
        dino.species = dino.species;
        dino.content = editDino.content;
        dino.upvotes = editDino.upvotes;
        dino.downvotes = editDino.downvotes;
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
    console.log(deleteDino)

		var oldDinos = this.state.dinos;

		var deletedDinos = this.state.dinos.filter(function(dino){
			return dino._id != deleteDino._id;
		});

		this.setState({dinos: deletedDinos, detailDisplay: DisplayEnum.DISPLAY_NONE});

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
    this.setState({detailDisplay: DisplayEnum.DISPLAY_FORM});
  },

  showDinoDetail: function(dino) {
    this.setState({detailDisplay: DisplayEnum.DISPLAY_DINO, displayDino: dino});
  },

	render: function(){

    var detail;

    switch(this.state.detailDisplay){
      case DisplayEnum.DISPLAY_NONE:
        detail = (
          React.createElement("div", null, 
            React.createElement("img", {id: "logo", src: "../images/dino.png", width: "70%"})
          )
        )
        break;

      case DisplayEnum.DISPLAY_FORM: 
        detail = React.createElement(DinoForm, {onDino: this.handleDinoSubmit});
        break;

      case DisplayEnum.DISPLAY_DINO:
        detail = (
          React.createElement(DinoDetail, {
            dino: this.state.displayDino, 
            onEditDino: this.handleDinoEdit, 
            handleDinoDelete: this.handleDinoDelete}
          )
        )
        break;
    }

    return (
      React.createElement("div", null, 
        React.createElement("audio", {id: "audio", controls: true, autoPlay: true}, 
          React.createElement("source", {src: "http://soundbible.com/grab.php?id=1782&type=mp3", type: "audio/mpeg"})
        ), 
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
  React.createElement(DinoApp, {url: "/api/dinos", pollInterval: 500000}),
  document.getElementById('content')
);
},{"./dinoForm.jsx":2,"./dinodetail.jsx":3,"./dinolist.jsx":4}],2:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
	    return {
	    	species: '',
	    	content: '',
	    	img: ''
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
	changeImg: function(ev) {
		this.setState({
			img: ev.target.value
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
			content: this.state.content,
			img: this.state.img
		});

		this.setState({
			species: '',
			content: '',
			img: '',
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
					React.createElement("textarea", {rows: "4", cols: "100", value: this.state.content, onChange: this.changeContent, placeholder: "Fun facts about this dino"})
				), 
				React.createElement("div", null, 
					React.createElement("div", null, React.createElement("input", {type: "text", id: "imgsrc", value: this.state.img, onChange: this.changeImg, placeholder: "Link a photo of your dino"}))
				), 
				React.createElement("div", null, 
					React.createElement("button", null, "Add Dino!")
				)
			)
		);
	}
})
},{}],3:[function(require,module,exports){
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
		if (this.props.dino.img) {
			console.log(this.props.dino.img);
			var img = (React.createElement("div", {id: "dino-image"}, 
									React.createElement("img", {src: this.props.dino.img})
								));
		}
		return (
			React.createElement("div", {id: "dino-detail-container"}, 
				React.createElement(Editable, {onChange: this.changeSpecies, text: this.props.dino.species, tag: "h1"}), 
				React.createElement(Editable, {onChange: this.changeContent, text: this.props.dino.content, tag: "p"}), 
				React.createElement("h2", null, "RATING: ", this.props.dino.upvotes - this.props.dino.downvotes), 
				React.createElement("div", {className: "buttons"}, 
					React.createElement("button", {className: "upvote-button", onClick: this.upvoteDino}, "+1"), 
					React.createElement("button", {className: "downvote-button", onClick: this.downvoteDino}, "-1"), 
					React.createElement("button", {className: "delete-button", onClick: this.handleDinoDelete}, "Delete")
				), 
				img
			)
		)
	}
});

module.exports = DinoDetail;
},{"./editable.jsx":5}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  render: function() {
    if (this.props.tag === 'h1') {
      return React.createElement("h1", {spellCheck: "false", 
                onBlur: this.commitChange, 
                contentEditable: true}, this.props.text
              );
    } else {
      return React.createElement("p", {spellCheck: "false", 
                onBlur: this.commitChange, 
                contentEditable: true}, this.props.text);
    }
  },

  commitChange: function() {
    var html = ReactDOM.findDOMNode(this).innerHTML; //this.getDOMNode().innerHTML;
    this.props.onChange(html);
  }
});
},{}]},{},[1]);
