describe('Ember.UI.Button', function() {

  describe('"class" attribute (CSS)', function() {
    it('defaults to "btn"', function() {
      var button = Ember.UI.Button.create();
      var classes = button.get('classNames');
      expect(classes).to.include('btn');
    });

    describe('"style" property modifier', function() {
      it('modifies the class attribute', function() {
        var button = Ember.UI.Button.create({
          style: 'primary'
        });
        var classes = button.get('classNames');
        expect(classes).to.include('btn');
        expect(classes).to.include('btn-primary');
      });

      it('changes the class attribute when updated', function() {
        var button = Ember.UI.Button.create({
          style: 'primary'
        });
        button.set('style', 'error');
        var classes = button.get('classNames');
        expect(classes).to.include('btn');
        expect(classes).to.include('btn-error');
        expect(classes).not.to.include('btn-primary');
      });
    });

    describe('"size" property modifier', function() {
      it('changes the class attribute when updated', function() {
        // Start with a large button.
        var button = Ember.UI.Button.create({
          size: 'large'
        });
        var classes = button.get('classNames');
        expect(classes).to.include('btn-large');

        // Adding a different modifier shouldn't modify the size.
        button.set('style', 'error');
        classes = button.get('classNames');
        expect(classes).to.include('btn-large');

        // Remove the size.
        button.set('size', null);
        classes = button.get('classNames');
        expect(classes).not.to.include('btn-large');
      });
    });

    describe('"block" property modifier', function() {
      it('changes the class attribute when updated', function() {
        // Start with a large button.
        var button = Ember.UI.Button.create({
          style: 'primary',
          size: 'large'
        });
        var classes = button.get('classNames');
        expect(classes).not.to.include('btn-block');

        // Make it a block button.
        button.set('block', true);
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
        var button = Ember.UI.Button.create();
        var classes = button.get('classNames');
        expect(classes).not.to.include('disabled');

        // Disable it.
        button.set('disabled', true);
        classes = button.get('classNames');
        expect(classes).to.include('disabled');
      });
    });

  });

});
