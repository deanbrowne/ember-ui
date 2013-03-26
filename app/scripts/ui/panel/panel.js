/**
  Panels are containers for other views.  A panel is a column 100% the height of its parent.  Panels
  can slide under or over other content.  Applications are often composed of a number of panels: a
  menu panel on the left that others slide on top of, a main panel area for the content, and
  auxilary panels for lists, etc.

  ```handlebars
  {{#panel id="menu" ordering="below" origin="left" width="240px"}}
    {{! Contents }}
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
    If the panel is open (visible to the user) or closed (hidden from the user).

    @property open
    @type {Boolean}
  */
  isOpen: false,


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
  open: function() {  // TODO: Take duration and easing optional parameters
    var isOpen = this.get('isOpen');
    if (!isOpen) {
      // TODO: Really want to be clipping it, not just setting visibilty.
      // this.$().animate({ 'visibility' : 'visible' }, 0);

      // Animate the panel onto the screen.
      var width = this.get('width');
      var props = { 'left': '+=' + width };
      var durationMs = 200;
      this.$().animate(props, durationMs);

      this.set('isOpen', true);
    }
  },

  /**
    Hides the panel.  Other content will typically move to occupy the forfeited space (depending on
    CSS).
  */
  close: function() {
    var isOpen = this.get('isOpen');
    if (isOpen) {
      // Animate the panel off the screen.
      var width = this.get('width');
      var props = { 'left': '-=' + width };
      var durationMs = 200;
      this.$().animate(props, durationMs);

      this.set('isOpen', false);
    }
  },

  /**
    Hides the panel if it visible; otherwise shows the panel.
  */
  toggle: function() {
    var isOpen = this.get('isOpen');
    if (isOpen) {
      this.close();
    } else {
      this.open();
    }
  },


  /**
    Positions the panel.

    @private
  */
  _resetPosition: function() {
    // This panels positioning properties.
    var width = this.get('width');
    var origin = this.get('origin');
    var isOpen = this.get('isOpen');

    // Parent's positioning.
    var $parent = this.$().parent();

    var parentOffset = $parent.offset();
    var parentTop = Math.round(parentOffset.top) + 'px';
    var parentHeight = $parent.css('height');
    var parentLeft = parentOffset.left;
    var parentWidth = $parent.width();

    // Calculate this panel's position.
    var visibility = isOpen ? 'visible' : 'hidden';
    var left = origin === 'left' ?
        parentLeft :
        parentLeft + parentWidth;
    left = Math.round(left) + 'px';

    // Align the panel with its parent assuming it is open.
    this.$().css({
      'top': parentTop,
      'height': parentHeight,
      'left': left,
      'width': width,
      // 'visibility': visibility
    });

    // If the panel is closed, put it in its hidden position.
    if (!isOpen) {
      var direction = origin === 'left' ? '-=' : '+=';
      this.$().animate({
        'left': direction + width
      }, 0);
    }
  },

  /**
    Set the panel's initial position.

    @override
  */
  didInsertElement: function() {
    this._resetPosition();
  }
/*
  willRemoveElement: function() {

  }
*/
/*
  resize: function() {
    // Good enough?  Or need to listen to parent's resize (for scrolling and resizing because this
    // is fixed and probably doesn't resize
    // Move relative to parent.
  }

  // TODO: Show the panel if there is room.  Example on an iPad or desktop might always show.
*/

});


// Template shorthand:  {{#panel [options]}}Text{{/panel}}
Ember.Handlebars.registerHelper('panel', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.Panel', options);
});
