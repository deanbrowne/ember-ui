describe('Ember.UI.ClickableView', function() {

  // This code only exists on touch devices.  Easiest to run this in the iPad Simulator.
  if ('ontouchstart' in window) {
    describe('Remove Click Delay', function() {

      /**
        Synthesizes a touch event for testing.
        @param {string} type is 'touchstart', 'touchmove', or 'touchend'.
        @param {number} x is the X-coordinate on the viewport (clientX).
        @param {number} y is the Y-coordinate on the viewport (clientY).
      */
      var triggerEvent = function(type, x, y) {
        Ember.run(function() {
          var $evt = $.Event(type);
          $evt.originalEvent = {
            touches: [
              {
                clientX: x,
                clientY: y
              }
            ]
          };
          $view.trigger($evt);
        });
      };

      /** @type {Ember.UI.ClickableView} */
      var view = Ember.UI.ClickableView.create({elementId: 'testMe'});
      var $view = null;

      beforeEach(function() {
        Ember.run(function() {
          view.append();
        });
        $view = $('#testMe');
      });

      afterEach(function() {
        Ember.run(function() {
          view.remove();
        });
      });

      //
      // Tests
      //

      it('is only enabled on touch devices', function() {
        var touchDevice = ('ontouchstart' in window);
        var disableClickDelay = view.get('disableClickDelay');
        expect(disableClickDelay).to.equal(touchDevice);
      });

      it('dispatches \'click\' events in < 300ms', function(done) {
        var startTime = new Date().getMilliseconds();

        // Register the 'click' handler.
        $view.on('click', function() {
          // The 'click' must happen in less than 300ms.
          var endTime = new Date().getMilliseconds();
          var totalMilliseconds = endTime - startTime;
          expect(totalMilliseconds).to.be.below(300);

          // The test is done.
          done();
        });

        // Simulate the raw touch events that generate a 'click'.
        triggerEvent('touchstart', 10, 10);
        triggerEvent('touchend', 10, 10);
      });

      // This test must take more than 300ms so it will always be slow :(
      it('dispatches only one \'click\' event (test requires ~1/2 second)', function(done) {
        var clickCount = 0;

        $view.on('click', function() {
          clickCount++;
        });

        setTimeout(function() {
          expect(clickCount).to.equal(1);
          done();
        }, 450);  // Takes at least 300ms.  Sometimes a bit more than 400ms.

        // Simulate the raw touch events that generate a 'click'.
        triggerEvent('touchstart', 10, 10);
        triggerEvent('touchend', 10, 10);
      });

      it('cancels clicks if touches move to far from the origin', function(done) {
        var clickCount = 0;

        $view.on('click', function() {
          clickCount++;
        });

        setTimeout(function() {
          expect(clickCount).to.equal(0);
          done();
        }, 20);  // Enough time to reliably wait for the 'click' event

        // Simulate the raw touch events that generate a 'click'.
        triggerEvent('touchstart', 10, 10);
        triggerEvent('touchmove', 10, 200);
        triggerEvent('touchend', 10, 200);
      });

    });
  }  // end if ('ontouchstart' in window)

});
