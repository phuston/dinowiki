// Editable component for editing

module.exports = React.createClass({
  render: function() {
    if (this.props.tag === 'h1') {
      return <h1 spellCheck='false'
                onBlur={this.commitChange}
                contentEditable>{this.props.text}
              </h1>;
    } else {
      return <p spellCheck='false'
                onBlur={this.commitChange}
                contentEditable>{this.props.text}</p>;
    }
  },

  commitChange: function() {
    var html = ReactDOM.findDOMNode(this).innerHTML;
    this.props.onChange(html);
  }
});