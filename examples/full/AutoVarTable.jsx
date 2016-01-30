AutoVarTable = React.createClass({
  mixins: [AutoVarMixin],

  constructAutoVars() {
    return {
      activeColumn: 0
    }
  },

  render() {
    return (
      <div className="container">
        <h2>AutoVarTable</h2>
        <table>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </div>
    );
  },

  renderRows() {
    return _.range(ROWS).map((idx) =>
      <AutoVarRow
        key={idx}
        activeColumn={this.autovars.activeColumn}
        />
    );
  }
});
