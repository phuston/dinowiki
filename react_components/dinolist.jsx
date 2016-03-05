// Side bar list of dinosaur names

var DinoList = React.createClass({
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
				<div style={style}
							className="dino-label" 
							onClick={this.handleDinoClick.bind(this, dino, i)} 
							key={i}>
					{dino.species}
				</div>
			);
		}, this);

		var styleAdd;
		if (this.state.selectedDino === 'add') {
			styleAdd = {'background': '#777777'};
		}

		return (
			<div id='dino-list-container'>
				<div className='list-button'>
					<button style={styleAdd} id='add-dino' onClick={this.handleAddDino}>
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