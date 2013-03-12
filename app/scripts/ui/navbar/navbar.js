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
  layout: Ember.Handlebars.compile(
    '<nav class="navbar">' +
      '<div class="navbar-inner">' +
        '<div class="brand">' +
          '{{yield}}' +
        '</div>' +
      '</div>' +
    '</nav>' +
    '<div class="navbar-spacer"></div>')

  // TODO: CSS to center text, pull buttons left and right
  // TODO: navbar-spacer CSS
  // TODO: Configure Gruntfile.js to compile this template separately from demo

});


// Template shorthand:  {{#navbar [options]}}Text{{/navbar}}
Ember.Handlebars.registerHelper('navbar', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.Navbar', options);
});
