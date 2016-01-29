AutoVarCol = React.createClass({
  mixins: [AutoVarMixin],

  // Here goes all logic previously in getMeteorData and getInitialState
  constructAutoVars() {
    return {
      isActive: () => this.props.activeColumn.get() === this.props.colIdx
    }
  },

  render() {
    const clazz = this.autovars.isActive.get() ? 'active' : 'inactive';
    const text = this.props.colIdx + '-' + this.props.rowIdx;
    console.log('renderCol', text);
    return (
      <td className={clazz}>
        { text }
      </td>
    );
  }
});
