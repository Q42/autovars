AutoVarMixin = {
  componentWillMount: function() {
    var component = this;

    // Interface to access autovars from render and other component functions.
    component.autovars = {};

    // Internal autovars state per component.
    component.__autovars_trackers = {};
    component.__autovars_propsDependency = new Tracker.Dependency;

    // Keep track of incoming props to make sure they are rendered.
    if (component.componentWillReceiveProps) {
      console.warn(
        'AutoVarMixin needs full control over de React render process, so ' +
        'componentWillReceiveProps on ' + component.constructor.displayName +
        ' is ignored. Use reactive var dependencies instead.');
    }

    // Check if props have changed (!==) and trigger render if so.
    component.componentWillReceiveProps = function(nextProps) {
      var changedProp = _.find(nextProps, function(nextProp, key) {
        return component.props[key] !== nextProp;
      });
      var removedProp = !changedProp &&
        _.find(component.props, function(prop, key) {
          return nextProps[key] !== prop;
        });

      if (changedProp || removedProp) {
        component.__autovars_propsDependency.changed();
      }
    };

    // Replace render so we can trigger it when needed.
    if (!component.__autovar_oldRender) {
      if (component.shouldComponentUpdate) {
        console.warn(
          'AutoVarMixin needs full control over de React render process, so ' +
          'shouldComponentUpdate on ' + component.constructor.displayName +
          ' is ignored. Use reactive var dependencies instead.');
      }

      // Prevent React from rendering components.
      // Autovars will trigger render when needed.
      component.shouldComponentUpdate = function(nextProps, nextState) {
        return false;
      };

      component.__autovar_oldRender = component.render;
      component.render = function() {
        var renderResult = null;

        // The renderRun flag indicates if the render was called from React
        // (synchronously) or if the autorun trigger due to a dependency.
        // This results in the following cycle:
        // 1. React decides to mount a component
        // 2. shouldComponentUpdate is not called at that time
        // 3. React call component.render
        // 4. renderRun is set to true
        // 5. Autovars calls the components real render function
        // 6. Tracker records reactive dependencies
        // 7. The output of the real render function is returned to React
        // ...
        // 8. A reactive dependency is changed
        // 9. The autorun is triggered
        // 10. Autovars schedules the component for update
        // 11. More dependencies trigger, but the scheduler ignores reschedules
        // 12. The scheduler runs, calls forceUpdate on the scheduled component
        // 13. Goto step 2
        //
        var renderRun = true;
        Tracker.autorun(function() {
          // Rerun when props are changed
          component.__autovars_propsDependency.depend();

          if (renderRun) {
            renderResult = component.__autovar_oldRender();
          }
          else
          {
            AutoVarGlobal.scheduleForUpdate(component);
          }
        });
        renderRun = false;

        return renderResult;
      };
    }

    // If the component declares autovars, create them here.
    // constructAutoVars is optional because you may want to trigger a render
    // reactively without declaring autovars on the component.
    if (component.constructAutoVars) {
      var varDecls = component.constructAutoVars();
      _.each(varDecls, function(argument, varName) {
        // Autorunning function
        if (typeof argument === 'function') {
          var updateFunc = argument;
          component.autovars[varName] = new ReactiveVar();

          // The heart of the autovars, this reruns the update function when
          // tracked deps change. firstRun is used to calculate initial value
          // of the functions synchronously because at that time we don't know
          // their reactive dependencies yet. The execution order is a good
          // enough predictor of the dependencies.
          var firstRun = true;
          component.__autovars_trackers[varName] = Tracker.autorun(function() {
            // Rerun when props are changed
            component.__autovars_propsDependency.depend();

            var val = updateFunc();
            if (firstRun) {
              component.autovars[varName].set(val);
            } else {
              // Let Tracker decide to run this async of sync after processing
              // all other autoruns.
              Tracker.afterFlush(function() {
                component.autovars[varName].set(val);
              });
            }
          });
          firstRun = false;
        }
        // Primitive initial value
        else {
          // If the passed value is not a function, we will treat it as the initial value.
          var initialValue = argument;
          component.autovars[varName] = new ReactiveVar(initialValue);
        }
      });
    }
  },

  componentWillUnmount: function() {
    var component = this;

    // Cleanup our internal trackers.
    _.each(component.__autovars_trackers, function(tracker) {
      tracker.stop();
    });
  }
};

AutoVarGlobal = {
  isScheduledForUpdate: function(component) {
    return AutoVarGlobal.updateQueue.indexOf(component) !== -1;
  },
  scheduleForUpdate: function(component) {
    // Only schedule components once
    if (!AutoVarGlobal.isScheduledForUpdate(component)) {
      AutoVarGlobal.updateQueue.push(component);
    }

    if (!AutoVarGlobal.updater) {
      // Delay 10 ms to give particlarly mobile browsers a bit more time to do
      // whatever else they need to do.
      if (Meteor.isClient) {
        AutoVarGlobal.updater = setTimeout(AutoVarGlobal.updateQueuedComponents, 10);
      } else {
        AutoVarGlobal.updater = AutoVarGlobal.updateQueuedComponents;
      }
    }
  },
  updateQueuedComponents: function() {
    var currentQueue = AutoVarGlobal.updateQueue;

    // Reset updater since renders may trigger new changes pushed to the queue,
    // so we want to schedule another update run in that case
    AutoVarGlobal.updater = null;
    AutoVarGlobal.updateQueue = [];

    _.each(currentQueue, function(component) {
      // By the time we get here, the component may have been unmounted, or it
      // has already been rescheduled. Either way skip the update.
      if (component.isMounted() && AutoVarGlobal.updateQueue.indexOf(component) === -1) {
        component.forceUpdate();
      }
    });
  },
  updater: null,
  updateQueue: []
};
