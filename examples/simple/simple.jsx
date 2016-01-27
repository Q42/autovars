Hello = React.createClass({
  mixins: [AutoVarMixin],

  constructAutoVars() {
    return {
      counter: 0
    }
  },

  render() {
    return (
      <div>
        <button onClick={_ => this.autovals.counter++}>Click Me</button>
        <p>You've pressed the button {this.autovals.counter} times.</p>
      </div>
    );
  }
});
