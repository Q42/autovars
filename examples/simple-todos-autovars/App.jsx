// NOTE: This demonstrates the difference between ReactMeteorData and AutoVarsMixin

// App component - represents the whole app
App = React.createClass({
  mixins: [AutoVarMixin],

  constructAutoVars() {
    return {
      // Executed once because the result is a cursor which doesn't change
      tasksCursor: () => Tasks.find({}),

      // Executed every time the underlying collection changes because Meteor
      // cursors are reactive.
      tasksCount: () => this.autovars.tasksCursor.get().count(),
      tasks: () => this.autovars.tasksCursor.get().fetch()
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

  renderTasks() {
    const tasks = this.autovars.tasks.get();
    return tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  render() {
    const count = this.autovars.tasksCount.get();
    return (
      <div className="container">
        <header>
          <h1>Todo List ({count})</h1>
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
