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
				<li onClick={this.handleDinoClick.bind(this, dino)} key={i}>
					{dino.species}
				</li>
			);
		}, this);

		return (
			<div id="dino-list-container">
				<div id="dino-list-header">
					<div id='list-title'><h1>Dinos</h1></div>
					<div id='list-plus'><button id="add-dino" onClick={this.props.onAddDino}>+</button></div>
				</div>

				<div id="dino-list">
					<ul>
						{dinoList}
					</ul>
				</div>
			</div>
		)
	}
});

module.exports = DinoList;