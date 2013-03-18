describe('Ember.UI.ProgressBar', function() {

  describe('percent', function() {
    it('produces a _width that is valid CSS', function() {
      var bar = Ember.UI.ProgressBar.create();

      // Give it something easy.
      bar.set('percent', 50);
      var width = bar.get('_width');
      expect(width).to.equal('width:50%');
    });

    it('handles decimals', function() {
      var bar = Ember.UI.ProgressBar.create();

      // No decimals in CSS.
      bar.set('percent', 37.8492938);
      var width = bar.get('_width');
      expect(width).to.equal('width:38%');
    });

    it('ignores anything NaN', function() {
      var bar = Ember.UI.ProgressBar.create();
      var width = bar.get('_width');
      expect(width).to.equal('width:0%');
    });

    it('ignores numbers < 0', function() {
      var bar = Ember.UI.ProgressBar.create({
        'percent': -1
      });
      var width = bar.get('_width');
      expect(width).to.equal('width:0%');
    });

    it('ignores numbers > 100', function() {
      var bar = Ember.UI.ProgressBar.create({
        'percent': 105.3
      });
      var width = bar.get('_width');
      expect(width).to.equal('width:100%');
    });
  });

});
