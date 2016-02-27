

var DinoApp = React.createClass({
	getInitialState: function() {
    return {
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: '',
      todos: []
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

		// $.post(this.props.url, newTodo)
  //     .done(function(newDino, status){
  //         console.log('successful save!');
  //         this.setState({dinos: [newDino].concat(oldDinos)});
  //     }.bind(this))
  //     .error(function(data, status){
  //         this.setState({todos: oldTodos});
  //         console.error(data);
  //     });

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
		// Optimistic updating of Dinos
    var editedDinos = this.state.dinos.map(function(dino){
      if (dino.id == editDino.id) {
        dino.content = editDino.content;
      }
      return dino;
    });

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

	handleDinoDelete: function(dino){

	},


});

ReactDOM.render(
  <DinoApp url="/api/dinos" pollInterval={2000} />,
  document.getElementById('content')
);