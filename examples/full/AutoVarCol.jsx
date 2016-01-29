AutoVarCol = React.createClass({
  mixins: [AutoVarMixin],

  // Here goes all logic previously in getMeteorData and getInitialState
  constructAutoVars() {
    return {
      isActive: () => this.props.activeColumn.get() === this.props.colIdx
    }
  },

  activate() {
    this.props.activeColumn.set(this.props.colIdx);
  },

  render() {
    const clazz = this.autovars.isActive.get() ? 'active' : 'inactive';
    console.log('column', this.props.colIdx);
    return (
      <td className={clazz} onMouseOver={this.activate}>
        <div class="box"></div>
      </td>
    );
  }
});
