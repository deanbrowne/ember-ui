/**
  Navigation bar that spans the top (or bottom) of its parent.

  Styled with [Bootstrap](http://twitter.github.com/bootstrap/components.html#navbar).  Some
  customizations added to make it behave like an app.

  ```handlebars
  {{#navbar}}Title{{/navbar}}
  ```

  @class Navbar
  @namespace Ember.UI
  @extends Ember.UI.View
*/
Ember.UI.Navbar = Ember.UI.View.extend({
  layoutName: 'navbar/navbarLayout'
});


// Template shorthand:  {{#navbar [options]}}Text{{/navbar}}
Ember.Handlebars.registerHelper('navbar', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.Navbar', options);
});
