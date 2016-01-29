ReactCol = React.createClass({
  render() {
    const isActive = this.props.activeColumn === this.props.colIdx;
    const clazz = isActive ? 'active' : 'inactive';
    const text = this.props.colIdx + '-' + this.props.rowIdx;
    console.log('renderCol', text);
    return (
      <td className={clazz}>
        { text }
      </td>
    );
  }
});
