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
    The value attribute of the currently selected button(s) in the group.  If it is a radio button
    group this will always return a string of the one selected button's value.  If it is a checkbox
    button group it returns an array of strings for each selected button's value; and if no buttons
    are selected it returns a zero-length array.

    @property selected
    @type {String|Array[String]}
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
    buttons. Alternatively the template defining this view can have set the `value` on the buttons.

    @override
  */
  didInsertElement: function() {
    // Get the controller value bound to `selected`.
    var controllerSelected = this.get('selected');
    if (controllerSelected && controllerSelected.length > 0) {
      // Initially selected button specified by the controller.
      this.forEachChildView(function(button) {
        var val = button.get('value');
        var isSelected = controllerSelected.indexOf(val);
        button.set('selected', isSelected);
      });
    } else {
      // The initially selected button specified by the template.
      var values = [];

      this.forEachChildView(function(button) {
        var isSelectedButton = button.get('selected');

        if (isSelectedButton) {
          var val = button.get('value');
          values.pushObject(val);
        }
      });

      this.set('selected', values);
    }
  }

});


// Template shorthand:  {{#checkbox-button-group [options]}}...{{/checkbox-button-group}}
Ember.Handlebars.registerHelper('checkbox-button-group', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.CheckboxButtonGroup', options);
});
