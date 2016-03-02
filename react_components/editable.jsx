module.exports = React.createClass({
  render: function() {
    if (this.props.tag === 'h1') {
      return <h1 spellcheck='false'
                onBlur={this.commitChange}
                contentEditable>{this.props.text}
              </h1>;
    } else {
      return <p spellcheck='false'
                onBlur={this.commitChange}
                contentEditable>{this.props.text}</p>;
    }
  },

  commitChange: function() {
    var html = ReactDOM.findDOMNode(this).innerHTML; //this.getDOMNode().innerHTML;
    this.props.onChange(html);
  }
});