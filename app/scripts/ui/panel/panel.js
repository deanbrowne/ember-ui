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
  ordering: 'below',

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


  show: function() {
    // Set the edge just off the screen.  This happens immediately and will not be animated.

    // Animate the panel onto the screen.
    // this.$.css({ translateX: "100px"; });

  },

  hide: function() {
    // translate -10000,-10000
  },

  toggle: function() {

  },

  // Good enough?  Or need to listen to <body>?
  resize: function() {

  }

});


// Template shorthand:  {{#panel [options]}}Text{{/panel}}
Ember.Handlebars.registerHelper('panel', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.Panel', options);
});
