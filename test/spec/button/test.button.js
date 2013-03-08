describe('Ember.UI.Button', function() {

  describe('classNames (i.e. the class="" attribute)', function() {
    it('defaults to "btn"', function() {
      var button = Ember.UI.Button.create();
      var classes = button.get('classNames');
      expect(classes).to.include('btn');
    });

    it('is modified by the "style" property', function() {
      var button = Ember.UI.Button.create({
        style: 'primary'
      });
      var classes = button.get('classNames');
      expect(classes).to.include('btn');
      expect(classes).to.include('btn-primary');
    });

    it('is changes when the "style" property changes', function() {
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

});
