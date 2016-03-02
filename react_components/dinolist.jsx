var DinoList = React.createClass({
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
				<div className="dino-label" onClick={this.handleDinoClick.bind(this, dino)} key={i}>
					{dino.species}
				</div>
			);
		}, this);

		return (
			<div id='dino-list-container'>
				<div id='list-plus'>
					<button id='add-dino' onClick={this.props.onAddDino}>
						Add a Dino
					</button>
				</div>

				<div id='dino-list'>
					{dinoList}
				</div>
			</div>
		)
	}
});

module.exports = DinoList;