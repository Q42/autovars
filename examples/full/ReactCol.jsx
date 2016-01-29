ReactCol = React.createClass({









  activate() {
    this.props.activate(this.props.colIdx);
  },

  render() {
    const isActive = this.props.activeColumn === this.props.colIdx;
    const clazz = isActive ? 'active' : 'inactive';
    console.log('column', this.props.colIdx);
    return (
      <td className={clazz} onMouseOver={this.activate}>
        <div class="box"></div>
      </td>
    );
  }
});
