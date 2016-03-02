module.exports = React.createClass({
	getInitialState: function() {
	    return {
	    	species: '',
	    	content: '',
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
	addDino: function(ev) {
		ev.preventDefault();

		if (this.state.species.length == 0) {
			// Show error message?
			return;
		}

		this.props.onDino({
			species: this.state.species,
			content: this.state.content
		});

		this.setState({
			species: '',
			content: ''
		});

		// console.log(this.state.name, this.state.content);
	},
	render: function() {
		return (
			<form id='addForm' onSubmit={this.addDino}>
				<div>
					<div><input type='text' id='species' value={this.state.species} onChange={this.changeSpecies} placeholder="New dino's name"/></div>
				</div>
				<div>
					<textarea rows='4' cols='100' value={this.state.content} onChange={this.changeContent} placeholder="Fun facts about this dino"></textarea>
				</div>
				<div>
					<button>Add Dino!</button>
				</div>
			</form>
		);
	}
})