describe('Ember.UI.Button', function() {

  describe('"class" attribute (CSS)', function() {
    var button;

    afterEach(function() {
      if (button) {
        button.remove();
      }
    });

    it('defaults to "btn"', function() {
      var button = Ember.UI.Button.create();
      var classes = button.get('classNames');
      expect(classes).to.include('btn');
    });

    describe('"style" property modifier', function() {
      it('modifies the class attribute', function() {
        Ember.run(function() {
          button = Ember.UI.Button.create({
            style: 'primary'
          });
          button.append();
        });

        var classes = button.get('classNames');
        expect(classes).to.include('btn');
        expect(classes).to.include('btn-primary');
      });

      it('changes the class attribute when updated', function() {
        Ember.run(function() {
          button = Ember.UI.Button.create({
            style: 'primary'
          });
          button.append();
        });

        Ember.run(function() {
          button.set('style', 'error');
          button.rerender();
        });

        var classes = button.get('classNames');
        expect(classes).to.include('btn');
        expect(classes).to.include('btn-error');
        expect(classes).not.to.include('btn-primary');
      });
    });

    describe('"size" property modifier', function() {
      it('changes the class attribute when updated', function() {
        Ember.run(function() {
          // Start with a large button.
          button = Ember.UI.Button.create({
            size: 'large'
          });
          button.append();
        });
        var classes = button.get('classNames');
        expect(classes).to.include('btn-large');

        // Adding a different modifier shouldn't modify the size.
        Ember.run(function() {
          button.set('style', 'error');
          button.rerender();
        });
        classes = button.get('classNames');
        expect(classes).to.include('btn-large');

        // Remove the size.
        Ember.run(function() {
          button.set('size', null);
          button.rerender();
        });
        classes = button.get('classNames');
        expect(classes).not.to.include('btn-large');
      });
    });

    describe('"block" property modifier', function() {
      it('changes the class attribute when updated', function() {
        // Start with a large button.
        Ember.run(function() {
          button = Ember.UI.Button.create({
            style: 'primary',
            size: 'large'
          });
          button.append();
        });
        var classes = button.get('classNames');
        expect(classes).not.to.include('btn-block');

        // Make it a block button.
        Ember.run(function() {
          button.set('block', true);
          button.rerender();
        });
        classes = button.get('classNames');
        expect(classes).to.include('btn');
        expect(classes).to.include('btn-primary');
        expect(classes).to.include('btn-large');
        expect(classes).to.include('btn-block');
      });
    });

    describe('"disabled" property modifier', function() {
      it('changes the class attribute when updated', function() {
        // Start with a normal button.
        Ember.run(function() {
          button = Ember.UI.Button.create();
          button.append();
        });
        var classes = button.get('classNames');
        expect(classes).not.to.include('disabled');

        // Disable it.
        Ember.run(function() {
          button.set('disabled', true);
          button.rerender();
        });
        classes = button.get('classNames');
        expect(classes).to.include('disabled');
      });
    });

  });

});
