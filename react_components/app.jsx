var DinoList = require('./dinolist.jsx');
var DinoDetail = require('./dinodetail.jsx');
var DinoForm = require('./dinoForm.jsx');

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

		this.setState({dinos: deletedDinos, detailDisplay: DISPLAY_NONE});

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
          <div>
            <img id='logo' src="../images/dino.png" width="70%"/>
          </div>
        )
        break;

      case DISPLAY_FORM: 
        detail = <DinoForm onDino={this.handleDinoSubmit}/>;
        break;

      case DISPLAY_DINO:
        detail = (
          <DinoDetail
            dino={this.state.displayDino}
            onEditDino={this.handleDinoEdit}
            handleDinoDelete={this.handleDinoDelete}
          />
        )
        break;
    }

    return (
      <div>
        <audio id="audio" controls autoPlay>
          <source src="http://soundbible.com/grab.php?id=1782&type=mp3" type="audio/mpeg"/>
        </audio>
        <DinoList
          dinos={this.state.dinos}
          onAddDino={this.showDinoForm}
          onDisplayDino={this.showDinoDetail}
        />
        <div id="main-container">
          {detail}
        </div>
      </div>
    )
	}
});

ReactDOM.render(
  <DinoApp url="/api/dinos" pollInterval={2} />,
  document.getElementById('content')
);