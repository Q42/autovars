ReactCol = React.createClass({
  activate() {
    this.props.activate(this.props.colIdx);
  },

  render() {
    // Artifically slow down .render to simulate complex logic
    const t0 = Date.now();
    while (Date.now() <= t0)
      ;

    const isActive = this.props.activeColumn === this.props.colIdx;
    const clazz = isActive ? 'active' : 'inactive';
    return (
      <td className={clazz} onMouseMove={this.activate}>
      </td>
    );
  }
});
