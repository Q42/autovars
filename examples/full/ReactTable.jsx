ReactTable = React.createClass({
  getInitialState() {
    return {
      activeColumn: 0
    }
  },

  activate(col) {
    this.setState({
      activeColumn: col
    });
  },

  render() {
    return (
      <div className="container">
        <h2>ReactTable</h2>
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
      <ReactRow
        key={idx}
        activeColumn={this.state.activeColumn}
        activate={this.activate}
        />
    );
  }
});
