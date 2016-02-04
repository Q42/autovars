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
    // Artifically slow down .render to simulate complex logic
    const t0 = Date.now();
    while (Date.now() <= t0)
      ;

    const clazz = this.autovars.isActive.get() ? 'active' : 'inactive';
    return (
      <td className={clazz} onMouseMove={this.activate}>
      </td>
    );
  }
});
