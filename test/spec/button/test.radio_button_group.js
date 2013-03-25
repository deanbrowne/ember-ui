describe('Ember.UI.RadioButtonGroup', function() {

  describe('classNames', function() {
    it('has "btn-group"', function() {
      var group = Ember.UI.RadioButtonGroup.create();
      var classes = group.get('classNames');
      expect(classes).to.include('btn-group');
    });
  });

  describe('didInsertElement', function() {
    it('selects the button with the same value as the bound controller property', function() {
      var group = Ember.View.extend({
        template: Ember.Handlebars.compile(
          '{{#radio-button-group selectedBinding="view.choice"}}' +
            '{{button value="1"}}' +
            '{{button value="2"}}' +
            '{{button value="3"}}' +
          '{{/radio-button-group}}'),
        choice: '3'
      }).create();

      Ember.run(function() {
        group.append();
      });

      var buttons = group.$('button');
      var isOneSelected = $(buttons[0]).hasClass('active');
      var isTwoSelected = $(buttons[1]).hasClass('active');
      var isThreeSelected = $(buttons[2]).hasClass('active');

      // The controller selected two and three.
      expect(isOneSelected).to.equal(false);
      expect(isTwoSelected).to.equal(false);
      expect(isThreeSelected).to.equal(true);
    });
  });

  describe('click', function() {
    it('selecting a button updates the bound controller property', function() {
      var group = Ember.View.extend({
        template: Ember.Handlebars.compile(
          '{{#radio-button-group selectedBinding="view.choice"}}' +
            '{{button value="1"}}' +
            '{{button value="2"}}' +
          '{{/radio-button-group}}'),
        choice: '1'
      }).create();

      Ember.run(function() {
        group.append();
      });

      var buttons = group.$('button');
      var $one = $(buttons[0]);
      var $two = $(buttons[1]);

      // Press button two.
      $two.trigger('click');
      var selected = group.get('choice');
      expect(selected).to.equal('2');

      // Press button one.
      $one.trigger('click');
      selected = group.get('choice');
      expect(selected).to.equal('1');

      // Press button two again.
      $two.trigger('click');
      selected = group.get('choice');
      expect(selected).to.equal('2');
    });
  });

});
