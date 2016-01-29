AutoVarRow = React.createClass({
  mixins: [AutoVarMixin],

  renderCols() {
    return _.range(COLS).map((idx) =>
      <AutoVarCol
        key={idx}
        colIdx={idx}
        activeColumn={this.props.activeColumn}
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
