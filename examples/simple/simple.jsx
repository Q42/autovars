Hello = React.createClass({
  mixins: [AutoVarMixin],

  constructAutoVars() {
    return {
      counter: 0
    }
  },

  click() {
    const counterVar = this.autovars.counter;
    counterVar.set(counterVar.get() + 1);
  },

  render() {
    const counter = this.autovars.counter.get();
    return (
      <div>
        <button onClick={this.click}>Click Me</button>
        <p>You've pressed the button {counter} times.</p>
      </div>
    );
  }
});
