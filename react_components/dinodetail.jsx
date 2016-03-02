var Editable = require('./editable.jsx');

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
			<div id="dino-detail-container">
				<Editable onChange={this.changeSpecies} text={this.props.dino.species} tag={"h1"}/>
				<Editable onChange={this.changeContent} text={this.props.dino.content} tag={"p"}/>
				<h2>RATING: {this.props.dino.upvotes - this.props.dino.downvotes}</h2>
				<div className='buttons'>
					<button className='upvote-button' onClick={this.upvoteDino}>+1</button>
					<button className='downvote-button' onClick={this.downvoteDino}>-1</button>
					<button className='delete-button' onClick={this.handleDinoDelete}>Delete</button>
				</div>
			</div>
		)
	}
});

module.exports = DinoDetail;