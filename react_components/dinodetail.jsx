var DinoDetail = React.createClass({

	render: function(){
		return (
			<div id="dino-detail-container">
				<h1>{this.props.dino.species}</h1>
				<p>{this.props.dino.content}</p>
			</div>
		)
	}
});

module.exports = DinoDetail;