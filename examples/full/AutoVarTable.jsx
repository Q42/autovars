AutoVarTable = React.createClass({
  mixins: [AutoVarMixin],

  constructAutoVars() {
    return {
      activeColumn: 0
    }
  },

  moveColumn() {
    const activeColumn = this.autovars.activeColumn.get();
    this.autovars.activeColumn.set((activeColumn + 1) % COLS);
  },

  render() {
    return (
      <div>
        <h1>AutoVarTable</h1>
        <button onClick={this.moveColumn}>Next</button>
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
      <AutoVarRow key={idx} rowIdx={idx} activeColumn={this.autovars.activeColumn}/>
    );
  }
});
