ReactRow = React.createClass({
  renderCols() {
    return _.range(COLS).map((idx) =>
      <ReactCol
        key={idx}
        colIdx={idx}
        activeColumn={this.props.activeColumn}
        activate={this.props.activate}
        />
    );
  },

  render() {
    return (
      <tr>
        { this.renderCols() }
      </tr>
    );
  }
});
