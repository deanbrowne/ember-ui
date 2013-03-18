/**
  Moves the progress bar in the demo.
*/
Demo.ProgressRoute = Ember.Route.extend({

  timer: null,

  setupController: function(controller) {
    controller.set('controllerProgress', -1);
  },

  /**
    Run a timer that makes the progress bar grow.
    @override
  */
  activate: function() {
    var me = this;
    this.timer = setInterval(function() {
      var controller = me.get('controller');
      var progress = controller.get('controllerProgress');

      progress += 10;
      if (progress > 100) {
        progress = 0;
      }

      controller.set('controllerProgress', progress);
    }, 800);
  },

  /**
    Cleanup.
    @override
  */
  deactivate: function() {
    clearInterval(this.timer);
  }

});
