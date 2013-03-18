/**
  Groups one or more buttons together.  Zero or more buttons are selectable.

  ```handlebars
  {{#checkbox-button-group selectedBinding="foobar"}}
    {{#button value="foo"}}Foo{{/button}}
    {{#button value="bar"}}Bar{{/button}}
  {{/checkbox-button-group}}
  ```

  To initially select buttons give their values in the controller.

  ```javascript
  // In the controller.
  foobar: ['foo', 'bar']
  ```

  @class CheckboxButtonGroup
  @namespace Ember.UI
  @extends Ember.UI.View
*/
Ember.UI.CheckboxButtonGroup = Ember.UI.View.extend({

  /**
    Use Bootstrap's "btn-group" CSS class to modify the styling of button children.

    @property classNames
    @type {Array[String]}
    @override
  */
  classNames: 'btn-group',

  /**
    An array of the value attributes for the selected buttons in the group.  This is always bound to
    a controller property.

    ```handlebars
    {{#checkbox-button-group selectedBinding="controllerPropertyName"}}
    ```

    @property selected
    @type {Array[String]}
  */
  selected: [],

  /**
    Toggles the clicked button in the group.

    @event 'click'
    @parameter {jQuery.Event} $event is the click event.
    @override
  */
  click: function($event) {
    var $clickedButton = $event.target;
    var values = [];

    this.forEachChildView(function(button) {
      // Toggle the clicked button.
      var $button = button.$()[0];
      var isClickedButton = ($button === $clickedButton);
      if (isClickedButton) {
        button.toggle();
      }

      // Compute 'selected'.
      var selected = button.get('selected');
      if (selected) {
        var val = button.get('value');
        values.pushObject(val);
      }
    });

    this.set('selected', values);
  },

  /**
    Initialize which child buttons has been marked selected.  Typically `selected` is bound to an
    array controller property whose elements should equal the `value`s of the initially selected
    buttons.

    @override
  */
  didInsertElement: function() {
    // Get the controller value bound to `selected`.
    var controllerSelected = this.get('selected');
    if (controllerSelected && controllerSelected.length > 0) {
      // Initially selected button specified by the controller.
      this.forEachChildView(function(button) {
        var val = button.get('value');
        var isSelected = controllerSelected.indexOf(val) >= 0;
        button.set('selected', isSelected);
      });
    }
  }

});


// Template shorthand:  {{#checkbox-button-group [options]}}...{{/checkbox-button-group}}
Ember.Handlebars.registerHelper('checkbox-button-group', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.CheckboxButtonGroup', options);
});
