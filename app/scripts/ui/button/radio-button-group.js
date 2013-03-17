/**
  Groups multiple buttons together with exactly one button always selected (radio buttons).
  Pressing a different button will select it and unselect the previous one.

  ```handlebars
  {{#radio-button-group selectedBinding="foobar"}}
    {{#button value="foo"}}Foo{{/button}}
    {{#button value="bar"}}Bar{{/button}}
  {{/radio-button-group}}
  ```

  It is important to set the initially selected button in the controller.

  ```javascript
  // In the controller.
  foobar: 'bar'  // The "Bar" button above will be initally selected
  ```

  @class RadioButtonGroup
  @namespace Ember.UI
  @extends Ember.UI.View
*/
Ember.UI.RadioButtonGroup = Ember.UI.View.extend({

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
  selected: null,

  /**
    Toggles the clicked button in the group.  Toggles the previously selected button.

    @event 'click'
    @parameter {jQuery.Event} $event is the click event.
    @override
  */
  click: function($event) {
    var $clickedButton = $event.target;

    this.forEachChildView(function(button) {
      var $button = button.$()[0];
      var isClickedButton = ($button === $clickedButton);
      button.set('selected', isClickedButton);

      if (isClickedButton) {
        var val = button.get('value');
        this.set('selected', val);
      }
    });
  },

  /**
    Initialize which child button has been marked selected.  Typically `selected` is bound to a
    controller property and it should equal the `value` of the initially selected button.
    Alternatively the template defining this view can have set the `value` on one of the buttons.

    @override
  */
  didInsertElement: function() {
    // Get the controller value bound to `selected`.
    var controllerSelected = this.get('selected');
    if (controllerSelected) {
      // Initially selected button specified by the controller.
      this.forEachChildView(function(button) {
        var val = button.get('value');
        if (val === controllerSelected) {
          button.set('selected', true);
          return;  // Short circuit looping through the remaining buttons.
        }
      });
    } else {
      // The initially selected button specified by the template.
      this.forEachChildView(function(button) {
        var isSelectedButton = button.get('selected');

        if (isSelectedButton) {
          var val = button.get('value');
          this.set('selected', val);
          return;  // Short circuit looping through the remaining buttons.
        }
      });
    }
  }

});


// Template shorthand:  {{#radio-button-group [options]}}...{{/radio-button-group}}
Ember.Handlebars.registerHelper('radio-button-group', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.RadioButtonGroup', options);
});
