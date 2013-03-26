/**
  Panel demo.
*/
Demo.PanelController = Ember.Controller.extend({

  /**
    Shows/hides the panel.
  */
  toggle: function() {
    var panel = Ember.View.views['panel'];
    panel.toggle();
  }

});
