// NOTE: This demonstrates the difference between ReactMeteorData and AutoVarsMixin

// App component - represents the whole app
App = React.createClass({
  mixins: [AutoVarMixin],

  // Here goes all logic previously in getMeteorData and getInitialState
  constructAutoVars() {
    // These cursors never change, so create them once (constructAutoVars is
    // called once in the React component lifecycle).
    const sortBy = { sort: { createdAt: -1 } };
    const allCursor = Tasks.find({}, sortBy);
    const incompleteCursor = Tasks.find({ checked: { $ne: true } }, sortBy);

    return {
      // Creates this.autovars.hideCompleted that can be set in code below
      hideCompleted: false,

      // Executed when hideCompleted changes or when the currently used cursor
      // updates.
      tasks: () => this.autovars.hideCompleted.get() ?
        incompleteCursor.fetch() :
        allCursor.fetch(),

      // Executed when
      incompleteCount: () => incompleteCursor.count()
    }
  },

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const textInput = ReactDOM.findDOMNode(this.refs.textInput);

    const text = textInput.value.trim();
    Tasks.insert({
     text: text,
     createdAt: new Date()
    });

    // Clear form
    textInput.value = "";
  },

  toggleHideCompleted() {
    // Toggle the boolean, will cause all depending autovars to be reexecuted
    this.autovars.hideCompleted.set(!this.autovars.hideCompleted.get());
  },

  renderTasks() {
    return this.autovars.tasks.get().map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  render() {
    // Render will depend on incompleteCount, hideCompleted and tasks (through
    // renderTasks). If any or all of those change, render will be executed
    // exactly once.
    const incompleteCount = this.autovars.incompleteCount.get();
    const hideCompleted = this.autovars.hideCompleted.get();
    return (
      <div className="container">
        <header>
          <h1>Todo List ({incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly={true}
              checked={hideCompleted}
              onClick={this.toggleHideCompleted} />
            Hide Completed Tasks
          </label>

          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks" />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
