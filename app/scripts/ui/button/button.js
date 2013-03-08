/**
  Standard HTML <button> element.  Eliminates the 300ms click delay introduced on touch devices.

  ```handlebars
  // Simple button that calls `this.get('route').onButtonClick()`
  {{#button action="onButtonClick"}}Press Me{{/button}}

  // Primary button that calls `this.get('controller').onButtonClick()`
  {{#button style="error" action="onButtonClick" target="controller"}}Press Me{{/button}}
  ```
*/
Ember.UI.Button = Ember.UI.View.extend({

  init: function() {
    this._super();

    // Set `classNames` based on a `style` property assigned in the constructor.
    this._styleChanged();
  },

  // <button>
  tagName: 'button',

  /**
    Defaults to Bootstrap's "btn" CSS plus the optional `style` modifier like "btn btn-primary".

    @override
  */
  classNames: ['btn'],

  /**
    <button type="submit"> is default.  Can change to 'button' or 'reset'.

    @type {!String}
  */
  type: 'submit',

  /**
    Optional button modifier.  See [Bootstrap's button styles for details]
    (http://twitter.github.com/bootstrap/base-css.html#buttons).  Besides the default `null`, values
    can be:
      * "primary" - Provides extra visual weight and identifies the primary action in a button set
      * "info" - Used as an alternative to the default styles
      * "success" - Indicates a successful or positive action
      * "warning" - Indicates caution should be taken with this action
      * "danger" - Indicates a dangerous or potentially negative action

    @type {?String}
  */
  style: null,

  /**
    Change the CSS classes when the `style` changes.
    @private
  */
  _styleChanged: function() {
    var classes = ['btn'];

    var style = this.get('style');
    if (style) {
      var stateClass = 'btn-' + style;
      classes.pushObject(stateClass);
    }

    this.set('classNames', classes);
  }.observes('style')

  // http://twitter.github.com/bootstrap/base-css.html#buttons
  // TODO: Sizes CSS
  // TODO: Disabled CSS

  // TODO: "action" property
  // TODO: "target" property

  // TODO: http://twitter.github.com/bootstrap/javascript.html#buttons

});


// Template shorthand:  {{button [options]}}
Ember.Handlebars.registerHelper('button', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.Button', options);
});
