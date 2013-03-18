/**
  Standard HTML <button> element.  Styled with [Bootstrap]
  (http://twitter.github.com/bootstrap/base-css.html#buttons).  Eliminates the 300ms click delay on
  touch devices.

  ```handlebars
  // Simple button that calls `this.get('target').onButtonClick()`
  {{#button action="onButtonClick"}}Press Me{{/button}}

  // Primary button that calls `this.get('controller').onButtonClick()`
  {{#button appearance="default" action="onButtonClick" target="controller"}}Press Me{{/button}}
  ```

  @class Button
  @namespace Ember.UI
  @extends Ember.UI.View
*/
Ember.UI.Button = Ember.UI.View.extend({

  /**
    <button> element.
    @property tagName
    @override
    @final
  */
  tagName: 'button',

  /**
    Properties to surface as <button> attributes.
    @property attributeBindings
    @override
  */
  attributeBindings: ['type', 'disabled', 'tabindex'],

  /**
    <button type="submit"> is default.  Can change to 'button' or 'reset'.

    @property type
    @type {!String}
  */
  type: 'submit',

  /**
    Disables a button from being pressable.  Making `true` will add the disabled attribute to the
    button like:

    ```html
    <button disabled="disabled">
    ```

    @property disabled
    @type {!Boolean}
  */
  disabled: false,


  /**
    Defaults to Bootstrap's "btn" CSS class.  Override to add your own CSS class and/or remove the
    Bootstrap class.

    @property classNames
    @type {Array[String]}
    @override
  */
  classNames: ['btn'],

  /**
    Changing the `appearance`, `size`, `block`, or `disabled` properties will append CSS classes.

    @property classNameBindings
    @type {Array[String]}
    @override
  */
  classNameBindings: ['_appearanceCss', '_sizeCss', '_blockCss', 'disabled', '_selectedCss'],

  /**
    @param {!String} propertyName is the property to convert into a Bootstrap CSS class name.
    @return {?String} Bootstrap CSS class name; `null` if the property was not set.
    @private
  */
  _bootstrapClass: function(propertyName) {
    var propertyValue = this.get(propertyName);
    return propertyValue ? 'btn-' + propertyValue : null;
  },

  /**
    Optional button modifier.  See [Bootstrap's button styles for details]
    (http://twitter.github.com/bootstrap/base-css.html#buttons).  Besides the default `null`, values
    can be:
      * "primary" - Provides extra visual weight and identifies the primary action in a button set
      * "info" - Used as an alternative to the default
      * "success" - Indicates a successful or positive action
      * "warning" - Indicates caution should be taken with this action
      * "danger" - Indicates a dangerous or potentially negative action

    @property appearance
    @type {String}
  */
  appearance: null,

  _appearanceCss: function() {
    var propertyValue = this.get('appearance');
    return propertyValue ? 'btn-' + propertyValue : null;
  }.property('appearance'),

  /**
    Optional button modifier to make a button bigger or smaller.  See [Bootstrap's button styles for
    details](http://twitter.github.com/bootstrap/base-css.html#buttons).  Values can be:
      * "large" - Bigger possibly for hero text like "Sign Up"
      * `null` - Default size for almost everything
      * "small" - Small buttons are useful when grouped
      * "mini" - Very small buttons might go in a footer so as not to call attention to them

    @property size
    @type {String}
  */
  size: null,

  _sizeCss: function() {
    var propertyValue = this.get('size');
    return propertyValue ? 'btn-' + propertyValue : null;
  }.property('size'),

  /**
    Optional button modifier to span the full width of the parent.  Often used with `size` "large".
    See [Bootstrap's button styles for details]
    (http://twitter.github.com/bootstrap/base-css.html#buttons).

    @property block
    @type {!Boolean}
  */
  block: false,

  _blockCss: function() {
    var propertyValue = this.get('block');
    return propertyValue ? 'btn-block' : null;
  }.property('block'),

  /**
    Set to `true` to make the button appear depressed.  Used to let the user make binary on/off
    choices typically in the context of a `ButtonGroup`.

    @property selected
    @type {!Boolean}
  */
  selected: false,

  _selectedCss: function() {
    var propertyValue = this.get('selected');
    return propertyValue ? 'active' : null;
  }.property('selected'),

  /**
    Toggles the `selected` state of the current button.  Toggling is automatically handled by
    surrounding one or more buttons in a `ButtonGroup`.
  */
  toggle: function() {
    var selected = this.get('selected');
    this.set('selected', !selected);
  }

});


// Template shorthand:  {{#button [options]}}Text{{/button}}
Ember.Handlebars.registerHelper('button', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.Button', options);
});
