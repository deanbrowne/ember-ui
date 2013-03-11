/**
  A `View` is represented by a <div> in HTML.  The `View` class is responsible for adding extra UI
  logic like [removing the 300ms click delay on mobile devices]
  (https://developers.google.com/mobile/articles/fast_buttons).

  `View` serves as the superclass for all other views in Ember.UI.

  @class View
  @namespace Ember.UI
  @extends Ember.UI.ClickableView
*/
Ember.UI.View = Ember.UI.ClickableView.extend({
});
