ReactCol = React.createClass({
  activate() {
    this.props.activate(this.props.colIdx);
  },

  render() {
    // This console.log artifically slows down .render to simulate complex logic
    console.log('render column', this.props.colIdx);

    const isActive = this.props.activeColumn === this.props.colIdx;
    const clazz = isActive ? 'active' : 'inactive';
    return (
      <td className={clazz} onMouseMove={this.activate}>
      </td>
    );
  }
});
