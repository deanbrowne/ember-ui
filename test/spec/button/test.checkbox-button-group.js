describe('Ember.UI.CheckboxButtonGroup', function() {

  describe('classNames', function() {
    it('has "btn-group"', function() {
      var group = Ember.UI.CheckboxButtonGroup.create();
      var classes = group.get('classNames');
      expect(classes).to.include('btn-group');
    });
  });

  describe('didInsertElement', function() {
    it('selects buttons with values in the bound controller property', function() {
      var group = Ember.View.extend({
        template: Ember.Handlebars.compile(
          '{{#checkbox-button-group selected=[\'2\', \'3\']}}' +
            '{{button value="1"}}' +
            '{{button value="2"}}' +
            '{{button value="3"}}' +
            '{{button value="4"}}' +
          '{{/checkbox-button-group}}')
      }).create();

      Ember.run(function() {
        group.append();
      });

      var buttons = group.$('button');
      var isOneSelected = $(buttons[0]).hasClass('active');
      var isTwoSelected = $(buttons[1]).hasClass('active');
      var isThreeSelected = $(buttons[2]).hasClass('active');
      var isFourSelected = $(buttons[3]).hasClass('active');

      // The controller selected two and three.
      expect(isOneSelected).to.equal(false);
      expect(isTwoSelected).to.equal(true);
      expect(isThreeSelected).to.equal(true);
      expect(isFourSelected).to.equal(false);
    });
  });

  describe('click', function() {
    it('selecting a button updates the bound controller property', function() {
      var group = Ember.View.extend({
        template: Ember.Handlebars.compile(
          '{{#checkbox-button-group selectedBinding="view.selected"}}' +
            '{{button value="1"}}' +
            '{{button value="2"}}' +
          '{{/checkbox-button-group}}'),
        selected: []
      }).create();

      Ember.run(function() {
        group.append();
      });

      var buttons = group.$('button');
      var $one = $(buttons[0]);
      var $two = $(buttons[1]);

      // Press button two.
      $two.trigger('click');
      var selected = group.get('selected').toArray();
      expect(selected).to.deep.equal(['2']);

      // Press button one.
      $one.trigger('click');
      selected = group.get('selected').toArray();
      expect(selected).to.deep.equal(['1', '2']);

      // Press button two again.
      $two.trigger('click');
      selected = group.get('selected').toArray();
      expect(selected).to.deep.equal(['1']);
    });
  });

});
