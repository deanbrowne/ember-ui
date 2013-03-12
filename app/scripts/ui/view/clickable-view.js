/**
  Removes the [300ms click delay](https://developers.google.com/mobile/articles/fast_buttons) on
  mobile devices.  The delay gives users time to perform a gesture on clickable elements.  Typically
  scaling a screen by pinching over a clickable element.

  It is recommended to set the viewport's scale to 1 and turn zooming off completely.  Any element
  that has its own gestures (like a Google Map) will implement its own gesture logic.

  ```html
  <meta name="viewport" content="user-scalable=no,
                                 initial-scale=1, maximum-scale=1, minimum-scale=1,
                                 width=device-width, height=device-height" />
  ```

  @class ClickableView
  @namespace Ember.UI
  @extends Ember.View
  @uses Ember.TargetActionSupport
*/
Ember.UI.ClickableView = Ember.View.extend(Ember.TargetActionSupport, {

  /**
    Stop events from bubbling up.  Common usage is to prevent buttons from submitting forms by
    making sure this is `false`.

    @property propagateEvents
  */
  propagateEvents: false,

  /**
    Overrides `TargetActionSupport`'s `targetObject` computed
    property to use Handlebars-specific path resolution.

    @property targetObject
    @private
    @override
  */
  targetObject: Ember.computed(function() {
    // From https://github.com/emberjs/ember.js/blob/release-builds/ember-1.0.0-rc.1.js#L20639

    var target = this.get('target'),
        root = this.get('context'),
        data = this.get('templateData');

    if (typeof target !== 'string') { return target; }

    return Ember.Handlebars.get(root, target, { data: data });
  }).property('target'),

  /**
    Performs an [Ember Action](http://emberjs.com/guides/templates/actions/).
    @param {jQuery.Event} $event triggered this 'click'.
    @event click
    @override
  */
  click: function($event) {
    // Ember.TargetActionSupport.triggerAction will call the `this.get('action')` method on the
    // `this.get('target')` object.
    this.triggerAction();

    // preventDefault?
    return this.get('propagateEvents');
  }

});


// Only add code to disable click delays on touch devices.  No need to add complexity to desktop
// browsers.
if ('ontouchstart' in window) {

  /**
    Number of pixels a finger can move from the 'touchstart' position and still be counted as a
    click.  22 is 1/2 of the 44px minimum click area recommended by the iOS HIG (Human Interface
    Guidelines).
    @type {Number}
    @const
  */
  Ember.UI.ClickableView.TOUCHMOVE_TOLERANCE = 22;

  /**
    Duration, in milliseconds, to monitor for "ghost clicks".  These typically happen within 300-500
    ms but make it longer in case the main UI thread is tied up in click processing.
    @type {Number}
    @const
  **/
  Ember.UI.ClickableView.GHOST_CLICK_MONITOR = 2500;

  Ember.UI.ClickableView.reopen({

    /**
      Flag to re-enable the click delay.
      @type {Boolean}
    */
    disableClickDelay: true,

    /**
      Initial touch X coordinate.
      @type {Number}
      @private
    */
    _startX: 0,

    /**
      Initial touch Y coordinate.
      @type {Number}
      @private
    */
    _startY: 0,

    /**
      Whether currently tracking a potential click or not.
      @type {Boolean}
      @private
    */
    _isClickTracking: false,

    /**
      Cleanup.
      @override
    */
    willDestroyElement: function() {
      this._super();
      this._cancelClickTracking();
    },

    /**
      Cancels any current click processing and resets for the next time the user touches this
      element.
      @private
    */
    _cancelClickTracking: function() {
      if (this._isClickTracking) {
        $('body').off('touchmove');
        this._isClickTracking = false;
      }
    },

    /**
      @param {jQuery.Event} $ev is the touch event.
      @return {TouchEvent} The primary touch event including `clientX` and `clientY` properties.
      @private
    */
    _firstTouch: function($ev) {
      return $ev && $ev.originalEvent && $ev.originalEvent.touches && $ev.originalEvent.touches[0];
    },

    /**
      All clicks begin with a 'touchstart'.  Time to start tracking a potential click.
      @param {jQuery.Event} $ev is the 'touchstart' event.
      @override
    */
    touchStart: function($ev) {
      this._super($ev);

      if (this.disableClickDelay) {
        this._isClickTracking = true;

        // Prevent parent elements from handling as a 'click' event.
        $ev.stopPropagation();

        // Watch finger movement anywhere on the screen.
        var me = this;
        $('body').on('touchmove', function($ev) {
          me.bodyTouchMove($ev);
        });

        // Capture the initial tap position of the 'click' event.
        var touch = this._firstTouch($ev);
        if (touch) {
          this._startX = touch.clientX;
          this._startY = touch.clientY;
        }
      }
    },

    /**
      Cancel a 'click' if the user moves their finger too far from the initial 'touchstart'
      position.  This event handler is attached to <body>; not to `this`.
      @param {jQuery.Event} $ev is the 'touchmove' event.
    */
    bodyTouchMove: function($ev) {
      var touch = this._firstTouch($ev);
      if (touch) {
        if (Math.abs(touch.clientX - this._startX) > Ember.UI.ClickableView.TOUCHMOVE_TOLERANCE ||
            Math.abs(touch.clientY - this._startY) > Ember.UI.ClickableView.TOUCHMOVE_TOLERANCE) {
          this._cancelClickTracking();
        }
      }
    },

    /**
      Dispatch our own 'click' event immediately.
      @param {jQuery.Event} $ev is the 'touchmove' event.
      @override
    */
    touchEnd: function($ev) {
      this._super($ev);

      if (this.disableClickDelay) {
        if (this._isClickTracking) {
          $ev.stopPropagation();
          this._cancelClickTracking();

          // Create our own synthetic 'click' event.
          this.$().trigger('click');
          this.$().focus();

          // Capture and supress the system's 'click' event.
          Ember.UI.ClickableView.ClickBuster.preventGhostClick(this._startX, this._startY);
        }
      }
    },

    /**
      Cancel the click if some kind of system interruption (like an incoming phone call) happens
      mid-click.
      @param {jQuery.Event} $ev is the 'touchmove' event.
      @override
    */
    touchCancel: function($ev) {
      this._super($ev);

      if (this.disableClickDelay) {
        this._cancelClickTracking();
      }
    }

  });  // Ember.UI.ClickableView


  /**
    Class used to globally catch and suppress "ghost clicks".  Those are clicks generated by the
    system 300ms after our synthetic click.
    @class ClickableView.ClickBuster
  */
  Ember.UI.ClickableView.ClickBuster = function() {};

  Ember.UI.ClickableView.ClickBuster.coordinates = [];

  /**
    Call preventGhostClick to bust all click events that happen within the tolerance radius of the
    provided x, y coordinates in the next couple of seconds.
  */
  Ember.UI.ClickableView.ClickBuster.preventGhostClick = function(x, y) {
    Ember.UI.ClickableView.ClickBuster.coordinates.push(x, y);
    window.setTimeout(Ember.UI.ClickableView.ClickBuster.pop,
                      Ember.UI.ClickableView.TOUCHMOVE_TOLERANCE);
  };

  Ember.UI.ClickableView.ClickBuster.pop = function() {
    Ember.UI.ClickableView.ClickBuster.coordinates.splice(0, 2);
  };

  /**
    If we catch a click event inside the given radius and time threshold then we call
    stopPropagation and preventDefault. Calling preventDefault will stop links from being
    activated.
  */
  Ember.UI.ClickableView.ClickBuster.onClick = function(event) {
    for (var i = 0; i < Ember.UI.ClickableView.ClickBuster.coordinates.length; i += 2) {
      var x = Ember.UI.ClickableView.ClickBuster.coordinates[i];
      var y = Ember.UI.ClickableView.ClickBuster.coordinates[i + 1];
      if (Math.abs(event.clientX - x) <= Ember.UI.ClickableView.TOUCHMOVE_TOLERANCE &&
          Math.abs(event.clientY - y) <= Ember.UI.ClickableView.TOUCHMOVE_TOLERANCE) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };


  // Capture every 'click' and suppress those marked as ghosts before they reach their target.
  document.addEventListener('click', Ember.UI.ClickableView.ClickBuster.onClick, true);

}  // end if (disable click delay)
