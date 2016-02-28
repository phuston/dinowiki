var DinoList = require('./dinolist.jsx');

var DISPLAY_NONE = 'none';
var DISPLAY_DINO = 'dino';
var DISPLAY_FORM = 'form';

var DinoApp = React.createClass({
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
		var oldDinos = this.state.dinos;
		var optimisticDinos = [newDino].concat(this.state.dinos);

		this.setState({dinos: optimisticDinos});

    $.ajax({
    	url: this.props.url,
    	type: 'POST',
    	dataType: 'json',
    	data: newDino,
    	success: function(newDino){
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
    // console.log(dino);
    this.setState({detailDisplay: DISPLAY_DINO, displayDino: dino});
  },

	render: function(){

    var detail;

    switch(this.state.detailDisplay){
      case DISPLAY_NONE:
        detail = (
          <h1>LOGO OR SOMETHING</h1>
        )
        break;

      case DISPLAY_FORM: 
        detail = (
          <h1>FORM</h1>
        )
        break;

      case DISPLAY_DINO:
        detail = (
          <h1>DINO</h1>
        )
        break;
    }

    return (
      <div>
        <DinoList
          dinos={this.state.dinos}
          onAddDino={this.showDinoForm}
          onDisplayDino={this.showDinoDetail}
        />
        <div id="detail-container">
          {detail}
        </div>
      </div>
    )
	}


});

ReactDOM.render(
  <DinoApp url="/api/dinos" pollInterval={2000} />,
  document.getElementById('content')
);