module.exports = React.createClass({
  render: function() {
    if (this.props.tag === 'h1') {
      return <h1 onBlur={this.commitChange}
                contentEditable>{this.props.text}</h1>;
    } else {
      return <p onBlur={this.commitChange}
                contentEditable>{this.props.text}</p>;
    }
  },

  // shouldComponentUpdate: function(nextProps) {
  //   return nextProps.html !== this.getDOMNode().innerHTML;
  // },

  commitChange: function() {
    var html = ReactDOM.findDOMNode(this).innerHTML; //this.getDOMNode().innerHTML;
    this.props.onChange(html);
  }
});