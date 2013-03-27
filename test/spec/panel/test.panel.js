describe('Ember.UI.Panel', function() {

  var $parent;
  var panel;
  var $panel;

  // Create a container to attach panels to.
  before(function() {
    $('body').append('<div id="parent">');
    $parent = $('#parent');
  });

  after(function() {
    $parent.remove();
  });

  // Create shortcut to save on typing.
  var createPanel = function(props) {
    props = props || [];
    props['elementId'] = 'testMe';

    Ember.run(function() {
      panel = Ember.UI.Panel.create(props);
      panel.appendTo('#parent');
    });

    $panel = $('#testMe');
  };

  // Cleanup.
  afterEach(function() {
    if (panel) {
      Ember.run(function() {
        panel.remove();
      });

      delete Ember.View.views['testMe'];
    }
  });

  describe('Appearance', function() {
    describe('Drop shadows based on `origin` and `depth` properties', function() {
      it('origin=left and depth=below', function() {
        createPanel({
          origin: 'left',
          depth: 'below'
        });

        var classes = panel.get('classNames');
        expect(classes).to.include('ui-panel');
        expect(classes).to.include('ui-panel-below-left');
        expect(classes).not.to.include('ui-panel-below-right');
        expect(classes).not.to.include('ui-panel-above-left');
        expect(classes).not.to.include('ui-panel-above-right');
      });

      it('origin=left and depth=level', function() {
        createPanel({
          origin: 'left',
          depth: 'level'
        });

        var classes = panel.get('classNames');
        expect(classes).to.include('ui-panel');
        expect(classes).not.to.include('ui-panel-below-left');
        expect(classes).not.to.include('ui-panel-below-right');
        expect(classes).not.to.include('ui-panel-above-left');
        expect(classes).not.to.include('ui-panel-above-right');
      });

      it('origin=left and depth=above', function() {
        createPanel({
          origin: 'left',
          depth: 'above'
        });

        var classes = panel.get('classNames');
        expect(classes).to.include('ui-panel');
        expect(classes).not.to.include('ui-panel-below-left');
        expect(classes).not.to.include('ui-panel-below-right');
        expect(classes).to.include('ui-panel-above-left');
        expect(classes).not.to.include('ui-panel-above-right');
      });

      it('origin=right and depth=below', function() {
        createPanel({
          origin: 'right',
          depth: 'below'
        });

        var classes = panel.get('classNames');
        expect(classes).to.include('ui-panel');
        expect(classes).not.to.include('ui-panel-below-left');
        expect(classes).to.include('ui-panel-below-right');
        expect(classes).not.to.include('ui-panel-above-left');
        expect(classes).not.to.include('ui-panel-above-right');
      });

      it('origin=right and depth=level', function() {
        createPanel({
          origin: 'right',
          depth: 'level'
        });

        var classes = panel.get('classNames');
        expect(classes).to.include('ui-panel');
        expect(classes).not.to.include('ui-panel-below-left');
        expect(classes).not.to.include('ui-panel-below-right');
        expect(classes).not.to.include('ui-panel-above-left');
        expect(classes).not.to.include('ui-panel-above-right');
      });

      it('origin=right and depth=above', function() {
        createPanel({
          origin: 'right',
          depth: 'above'
        });

        var classes = panel.get('classNames');
        expect(classes).to.include('ui-panel');
        expect(classes).not.to.include('ui-panel-below-left');
        expect(classes).not.to.include('ui-panel-below-right');
        expect(classes).not.to.include('ui-panel-above-left');
        expect(classes).to.include('ui-panel-above-right');
      });
    });

    describe('`isOpen` visibility', function() {
      it('By default a panel is hidden', function() {
        createPanel();

        var isOpen = panel.get('isOpen');
        expect(isOpen).to.equal(false);

        var classes = panel.get('classNames');
        expect(classes).to.include('ui-panel-hidden');
      });

      it('Is visible when created with `isOpen` set to true', function() {
        createPanel({
          isOpen: true
        });

        var isOpen = panel.get('isOpen');
        expect(isOpen).to.equal(true);

        var classes = panel.get('classNames');
        expect(classes).not.to.include('ui-panel-hidden');
      });
    });

    describe('`width`', function() {
      it('Can be explicitly set', function() {
        createPanel({
          width: '240px'
        });

        var width = $panel.width();
        expect(width).to.equal(240);
      });

      it('Is never wider than the screen', function() {
        createPanel({
          width: '10000000px'
        });

        var width = $panel.width();
        expect(width).to.be.below(10000000);
      });
    });

    /*
     * TODO: How to unit test position when jQuery won't calculate .position() or .offset() since
     * everything is hidden.  For now visually inspect on the demo.
     *
    describe('Horizontal positioning', function() {
      describe('Panel with `origin` on the left', function() {
        it('When not `isOpen` has its right edge at the left edge of the parent', function() {
          createPanel();

          var panelRightEdge = $panel.offset().left + $panel.width();
          var parentLeftEdge = $parent.offset().left;
          expect(panelRightEdge).to.be.at.most(parentLeftEdge);
        });

        it('When `isOpen` has its left edge at the left edge of the parent', function() {
          createPanel({
            isOpen: true
          });

          $panel.removeClass('ui-panel-hidden');  // Needed for jQuery to accurately calculate

          var panelLeftEdge = $panel.offset().left;
          var parentLeftEdge = $parent.offset().left;
          expect(panelLeftEdge).to.equal(parentLeftEdge);
        });
      });

      describe('Panel with `origin` on the right', function() {
        it('When not `isOpen` has its left edge at the right edge of the parent', function() {
          createPanel({
            origin: 'right'
          });

          var panelLeftEdge = $panel.offset().left;
          var parentRightEdge = $parent.offset().left + $parent.width();
          expect(panelLeftEdge).to.be.at.least(parentRightEdge);
        });

        it('When `isOpen` has its right edge at the right edge of the parent', function() {
          createPanel({
            origin: 'right',
            isOpen: true
          });

          var panelRightEdge = $panel.offset().left + $panel.width();
          var parentRightEdge = $parent.offset().left + $parent.width();
          expect(panelRightEdge).to.equal(parentRightEdge);
        });
      });
    });
    */
  });

  describe('Opening and Closing', function() {
    describe('`open`', function() {
      it('Opens a closed panel', function() {
        createPanel();
        panel.open(0);  // 0 duration to immediately open

        var isOpen = panel.get('isOpen');
        expect(isOpen).to.equal(true);
      });

      it('Does nothing on a panel already open', function() {
        createPanel({
          isOpen: true
        });
        panel.open(0);  // 0 duration to immediately open

        var isOpen = panel.get('isOpen');
        expect(isOpen).to.equal(true);
      });
    });

    describe('`close`', function() {
      it('Closes an open panel', function() {
        createPanel({
          isOpen: true
        });
        panel.close(0);  // 0 duration to immediately open

        var isOpen = panel.get('isOpen');
        expect(isOpen).to.equal(false);
      });

      it('Does nothing to a panel already closed', function() {
        createPanel({
          isOpen: false
        });
        panel.close(0);  // 0 duration to immediately open

        var isOpen = panel.get('isOpen');
        expect(isOpen).to.equal(false);
      });
    });

    describe('`toggle`', function() {
      it('Will open and close repeatedly', function() {
        createPanel();
        var isOpen = panel.get('isOpen');
        expect(isOpen).to.equal(false);

        panel.toggle(0);  // 0 duration to immediately open
        isOpen = panel.get('isOpen');
        expect(isOpen).to.equal(true);

        panel.toggle(0);
        isOpen = panel.get('isOpen');
        expect(isOpen).to.equal(false);

        panel.toggle(0);
        isOpen = panel.get('isOpen');
        expect(isOpen).to.equal(true);
      });
    });
  });

});
