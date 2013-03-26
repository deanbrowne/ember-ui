/**
  Panels are containers for other views.  A panel is a column, 100% the height of its parent, that
  slides under or over other content.  Typical use cases are left-side menus and right-side property
  panels.

  ```handlebars
  {{#panel id="menu" ordering="above" origin="right" width="240px"}}
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
  classNameBindings: ['_borderCss'],

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

  _borderCss: function() {
    var ordering = this.get('ordering');
    var origin = this.get('origin');
    return 'ui-panel-' + ordering + '-' + origin;
  }.property('ordering', 'origin'),


  /**
    Flag to prevent opening/closing while an animation is in progress.  The math involved assumes
    the panel is fully open or closed so doing something mid-animation will offset the panel from
    where it is expected to be.

    @type {Boolean}
    @private
  */
  _isAnimating: false,

  /**
    Animates the panel to the left or right.

    @param {Boolean} animateToRight slides everything to the right or left.
    @param {Number} duration is an optional parameter for the length of the panel slide animation.
    @param {String} easing is an optional parameter defining the easing function for the animation.
        The default is 'swing', 'linear' is possible, [others are available with jQuery UI]
        (http://jqueryui.com/resources/demos/effect/easing.html).
    @private
  */
  _animate: function(animateToRight, duration, easing) {
    // Animate the panel onto the screen.
    var direction = animateToRight ? '+=' : '-=';
    var width = this.get('width');

    var props = { 'left': direction + width };
    duration = duration || 200;
    easing = easing || 'swing';

    var me = this;
    this._isAnimating = true;
    this.$().animate(props, duration, easing, function() {
      me._isAnimating = false;
    });

    // Move siblings.
    var origin = this.get('origin');
    var isLeft = origin === 'left';
    if (isLeft) {
      this.$().nextAll().animate(props, duration, easing);
    } else {
      this.$().prevAll().animate(props, duration, easing);
    }
  },

  /**
    Shows the panel.  Moves other content to make space if needed.

    @param {Number} duration is an optional parameter for the length of the panel slide animation.
    @param {String} easing is an optional parameter defining the easing function for the animation.
        The default is 'swing', 'linear' is possible, [others are available with jQuery UI]
        (http://jqueryui.com/resources/demos/effect/easing.html).
  */
  open: function(duration, easing) {
    var isOpen = this.get('isOpen');
    if (!isOpen && !this._isAnimating) {
      this.set('isOpen', true);

      // Animate the panel onto the screen.
      var origin = this.get('origin');
      var isLeft = origin === 'left';
      this._animate(isLeft, duration, easing);
    }
  },

  /**
    Hides the panel.  Other content will typically move to occupy the forfeited space (depending on
    CSS).

    @param {Number} duration is an optional parameter for the length of the panel slide animation.
    @param {String} easing is an optional parameter defining the easing function for the animation.
        The default is 'swing', 'linear' is possible, [others are available with jQuery UI]
        (http://jqueryui.com/resources/demos/effect/easing.html).
  */
  close: function(duration, easing) {
    var isOpen = this.get('isOpen');
    if (isOpen && !this._isAnimating) {
      this.set('isOpen', false);

      // Animate the panel off the screen.
      var origin = this.get('origin');
      var isLeft = origin === 'left';
      this._animate(!isLeft, duration, easing);
    }
  },

  /**
    Hides the panel if it visible; otherwise shows the panel.

    @param {Number} duration is an optional parameter for the length of the panel slide animation.
    @param {String} easing is an optional parameter defining the easing function for the animation.
        The default is 'swing', 'linear' is possible, [others are available with jQuery UI]
        (http://jqueryui.com/resources/demos/effect/easing.html).
  */
  toggle: function(duration, easing) {
    var isOpen = this.get('isOpen');
    if (isOpen) {
      this.close(duration, easing);
    } else {
      this.open(duration, easing);
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
    var isLeft = origin === 'left';
    var isOpen = this.get('isOpen');

    // Calculate this panel's position.
    var $parent = this.$().parent();
    var left = isLeft ? 0 : $parent.css('width');

    // Align the panel with its parent assuming it is open.
    this.$().css({
      'left': left,
      'width': width
    });

    // If the panel is closed, put it in its hidden position.
    if (!isOpen) {
      var direction = isLeft ? '-=' : '+=';
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

    // Parent element must mask this child.
    var $parent = this.$().parent();
    $parent.css({
      'overflow': 'hidden',
      'position': 'relative'
    });
  }

});


// Template shorthand:  {{#panel [options]}}Text{{/panel}}
Ember.Handlebars.registerHelper('panel', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.Panel', options);
});
