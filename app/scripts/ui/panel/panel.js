/**
  Panels are containers for other views.  A panel is a column 100% the height of its parent.  Panels
  can slide under or over other content.  Applications are often composed of a number of panels: a
  menu panel on the left that others slide on top of, a main panel area for the content, and
  auxilary panels for lists, etc.

  ```handlebars
  {{#panel id="menu" ordering="below" origin="left" width="240px"}}
    {{! Menu contents }}
  {{/panel}}
  ```

  @class Panel
  @namespace Ember.UI
  @extends Ember.UI.View
*/
Ember.UI.Panel = Ember.UI.View.extend({

  /**
    The type of panel:
      * 'below' appears beneath other content (default)
      * 'above' appears over other content

    @property ordering
    @type {'below'|'above'}
  */
  ordering: 'below',  // TODO: enum

  /**
    If the panel appears from "left" or "right" side of the screen.

    @property origin
    @type {'left'|'right'}
  */
  origin: 'left',

  /**
    The width of the panel as a CSS value like '320px' or '10%'.

    @property width
    @type {String}
  */
  width: '100%',


  /**
    Properties to surface attributes on the <div>.

    @property attributeBindings
    @type {Array[String]}
    @override
  */
  attributeBindings: ['style'],

  /**
    Apply basic panel CSS.

    @property classNames
    @type {Array[String]}
    @override
  */
  classNames: ['ui-panel'],

  /**
    Changing the `depth` property will append CSS classes.

    @property classNameBindings
    @type {Array[String]}
    @override
  */
  classNameBindings: ['_orderingCss'],

  /**
    The `style` attribute used in addition to `classNames`.

    @property style
    @type {String}
  */
  style: function() {
    var vals = [];
    vals.pushObject('width:' + this.get('width'));
    return vals.join(';');
  }.property('width'),

  _orderingCss: function() {
    var ordering = this.get('ordering');
    return 'ui-panel-' + ordering;
  }.property('ordering'),


  /**
    Shows the panel.  Moves other content to make space if needed.
  */
  show: function() {
    var isVisible = this.get('isVisible');
    if (!isVisible) {
      var parent = this.get('parentView');
      var parentWidth = parent.$.width();
      var width = this.get('width');
      var origin = this.get('origin');

      // Set the edge just off the screen.  This happens immediately and will not be animated.
      var left = origin === 'left' ?
          -1 * width :
          parentWidth;
      this.$.offset({ 'left': left });

      // Animate the panel onto the screen.
      this.$.css({ translateX: width });

      this.set('isVisible', true);
    }
  },

  /**
    Hides the panel.  Other content will typically move to occupy the forfeited space (depending on
    CSS).
  */
  hide: function() {
    var isVisible = this.get('isVisible');
    if (isVisible) {

      // translate -10000,-10000

      this.set('isVisible', false);
    }
  },

  /**
    Hides the panel if it visible; otherwise shows the panel.
  */
  toggle: function() {
    var isVisible = this.get('isVisible');
    if (isVisible) {
      this.hide();
    } else {
      this.show();
    }
  },

/* Size to parent.  Needs position:fixed to scroll independently from other content.

  didInsertElement: function() {
    // Set dimensions relative to parent.
    //var parent = this.get('parentView');
  },

  resize: function() {
    // Good enough?  Or need to listen to parent's resize (for scrolling and resizing because this
    // is fixed and probably doesn't resize
    // Move relative to parent.
  }

*/

});


// Template shorthand:  {{#panel [options]}}Text{{/panel}}
Ember.Handlebars.registerHelper('panel', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.Panel', options);
});
