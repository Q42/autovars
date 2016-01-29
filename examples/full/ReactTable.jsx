ReactTable = React.createClass({
  getInitialState() {
    return {
      activeColumn: 0
    }
  },

  moveColumn(dir) {
    const activeColumn = this.state.activeColumn;
    this.setState({ activeColumn: (activeColumn + 1) % COLS });
  },

  render() {
    return (
      <div>
        <h1>ReactTable</h1>
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
      <ReactRow key={idx} rowIdx={idx} activeColumn={this.state.activeColumn}/>
    );
  }
});
