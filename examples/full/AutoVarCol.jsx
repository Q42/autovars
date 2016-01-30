AutoVarCol = React.createClass({
  mixins: [AutoVarMixin],

  constructAutoVars() {
    return {
      isActive: () => this.props.activeColumn.get() === this.props.colIdx
    }
  },

  activate() {
    this.props.activeColumn.set(this.props.colIdx);
  },

  render() {
    // This console.log artifically slows down .render to simulate complex logic
    console.log('render column', this.props.colIdx);

    const clazz = this.autovars.isActive.get() ? 'active' : 'inactive';
    return (
      <td className={clazz} onMouseMove={this.activate}>
      </td>
    );
  }
});
