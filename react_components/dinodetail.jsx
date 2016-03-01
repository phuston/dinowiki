var DinoDetail = React.createClass({

	handleDinoDelete: function(){
		console.log("DELETING");
		this.props.handleDinoDelete(this.props.dino);
	},

	render: function(){
		return (
			<div id="dino-detail-container">
				<h1>{this.props.dino.species}</h1>
				<p>{this.props.dino.content}</p>
				<button>+1</button>
				<button>-1</button>
				<button onClick={this.handleDinoDelete}>Delete</button>
			</div>
		)
	}
});

module.exports = DinoDetail;