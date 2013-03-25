/**
  Action handlers for button demos.
*/
Demo.ButtonController = Ember.Controller.extend({
  clickCount: 0,

  incrementClickCount: function() {
    var clicks = this.get('clickCount');
    clicks += 1;
    this.set('clickCount', clicks);
  },

  alert: function() {
    alert('Clicked');
  }

});
