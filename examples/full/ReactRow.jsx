ReactRow = React.createClass({
  renderCols() {
    return _.range(COLS).map((idx) =>
      <ReactCol key={idx} rowIdx={this.props.rowIdx} colIdx={idx} activeColumn={this.props.activeColumn}/>
    );
  },

  render() {
    console.log('renderRow', this.props.rowIdx);
    return (
      <tr>
        { this.renderCols() }
      </tr>
    );
  }
});
