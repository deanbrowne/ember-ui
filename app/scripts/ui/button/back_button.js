/**
  Back button to use on `Navbar`.  It is equivalent to the browser's back button and only visible
  if there is history.  It is styled to look like the iOS back button.

  ```handlebars
  // Go back to the previous page in the browser's history.
  {{#back-button}}Back{{/back-button}}

  // Always go to a specific route
  {{#back-button parentRoute="theRouteName"}}Back{{/back-button}}
  ```

  @class BackButton
  @namespace Ember.UI
  @extends Ember.UI.Button
*/
Ember.UI.BackButton = Ember.UI.Button.extend({

  /**
    Set to a route name to always navigate to that page.  Setting a route name overrides the default
    behavior acting like the brower's back button.

    @property parentRoute
    @type {String}
  */
  parentRoute: null,


  /**
    Applies the additional 'btn-back' class to style the button as a back arrow (like found on iOS).

    @property classNameBindings
    @type {Array[String]}
    @override
  */
  classNameBindings: ['_appearanceCss', '_sizeCss', '_blockCss', 'disabled', '_backButtonCss'],

  /**
    Is the "btn-back" CSS classname if the required CSS properties are available to style a back
    button.
    @property _backButtonCss
    @private
  */
  _backButtonCss: function() {
    var parentRoute = this.get('parentRoute');
    if (!parentRoute) {
      // Don't display the button if it there is no browser history for it to go back to.
      var hasHistory = window && window.history.length > 1;
      if (!hasHistory) {
        return 'none';  // display: none
      }
    }

    // If CSS rotations are available apply the 'btn-back' CSS class.
    if (document) {
      if ('WebkitTransform' in document.body.style ||
          'MozTransform' in document.body.style ||
          'OTransform' in document.body.style ||
          'transform' in document.body.style) {
        return 'btn-back';
      }
    }

    return null;
  }.property(),


  /**
    Navigates back a page.  If `parentRoute` is set it goes to that page; otherwise it goes back one
    page in the browser's history.

    @event 'click'
    @override
  */
  click: function() {
    var parentRoute = this.get('parentRoute');
    if (parentRoute) {
      // Go to the parent route.
      var controller = this.get('controller');
      controller.transitionTo(parentRoute);
    } else {
      // Go to the previous page.
      window.history.back();
    }
  }

});


// Template shorthand:  {{#back-button [options]}}Text{{/back-button}}
Ember.Handlebars.registerHelper('back-button', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.BackButton', options);
});
