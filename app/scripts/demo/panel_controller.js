/**
  Panel demos.
*/
Demo.PanelController = Ember.Controller.extend({

  toggleLeft: function() {
    var panel = Ember.View.views['panelLeft'];
    panel.toggle();
  },

  toggleRight: function() {
    var panel = Ember.View.views['panelRight'];
    panel.toggle();
  },

  toggle100: function() {
    var panel = Ember.View.views['panel100'];
    panel.toggle();
  }

});
