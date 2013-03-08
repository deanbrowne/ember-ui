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

  /**
    Constructor.
    @override
  */
  init: function() {
    this._super();

    // Set `classNames` based on a properties assigned in the constructor.
    this._cssChanged();
  },

  /**
    <button> element.
    @const
  */
  tagName: 'button',

  /**
    Properties to surface as <button> attributes.
  */
  attributeBindings: ['disabled'],


  /**
    Defaults to Bootstrap's "btn" CSS plus the optional `style`, `size`, `block`, and `disabled`
    modifiers.  For example it might become the HTML "btn btn-primary".

    Set this explicity to use your own CSS class(es).  Note that if any of the modifier properties
    are changed it will clobber your change.

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
    Optional button modifier to make a button bigger or smaller.  See [Bootstrap's button styles for
    details](http://twitter.github.com/bootstrap/base-css.html#buttons).  Values can be:
      * "large" - Bigger possibly for hero text like "Sign Up"
      * `null` - Default size for almost everything
      * "small" - Small buttons are useful when grouped
      * "mini" - Very small buttons might go in a footer so as not to call attention to them

    @type {?String}
  */
  size: null,

  /**
    Optional button modifier to span the full width of the parent.  Often used with `size` "large".
    See [Bootstrap's button styles for details]
    (http://twitter.github.com/bootstrap/base-css.html#buttons).

    @type {!Boolean}
  */
  block: false,

  /**
    Disables a button from being pressable.  Making `true` will add the disabled attribute to the
    button like:
    ```html
    <button disabled="disabled">
    ```

    @type {!Boolean}
  */
  disabled: false,


  /**
    Change the CSS classes whenever a button modifier property changes.
    @private
  */
  _cssChanged: function() {
    var classes = ['btn'];

    var style = this.get('style');
    if (style) {
      var stateClass = 'btn-' + style;
      classes.pushObject(stateClass);
    }

    var size = this.get('size');
    if (size) {
      var sizeClass = 'btn-' + size;
      classes.pushObject(sizeClass);
    }

    var block = this.get('block');
    if (block) {
      classes.pushObject('btn-block');
    }

    var disabled = this.get('disabled');
    if (disabled) {
      classes.pushObject('disabled');
    }

    this.set('classNames', classes);
  }.observes('style', 'size', 'block', 'disabled')


  // TODO: "action" property
  // TODO: "target" property

  // TODO: http://twitter.github.com/bootstrap/javascript.html#buttons

});


// Template shorthand:  {{button [options]}}
Ember.Handlebars.registerHelper('button', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.Button', options);
});
