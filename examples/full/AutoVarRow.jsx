AutoVarRow = React.createClass({
  mixins: [AutoVarMixin],

  renderCols() {
    return _.range(COLS).map((idx) =>
      <AutoVarCol key={idx} rowIdx={this.props.rowIdx} colIdx={idx} activeColumn={this.props.activeColumn}/>
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
