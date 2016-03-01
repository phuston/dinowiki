var DinoDetail = React.createClass({
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

	handleDinoDelete: function() {
		console.log("DELETING");
		this.props.handleDinoDelete(this.props.dino);
	},

	render: function(){
		return (
			<div id="dino-detail-container">
				<h1>{this.props.dino.species}</h1>
				<p>{this.props.dino.content}</p>
				<p>RATING: {this.props.dino.upvotes - this.props.dino.downvotes}</p>
				<button onClick={this.upvoteDino}>+1</button>
				<button onClick={this.downvoteDino}>-1</button>
				<button onClick={this.handleDinoDelete}>Delete</button>
			</div>
		)
	}
});

module.exports = DinoDetail;