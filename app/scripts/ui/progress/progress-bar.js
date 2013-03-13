/**
  Horizontal progress bar that fills from left-to-right.

  Styled using [Bootstrap](http://twitter.github.com/bootstrap/components.html#progress).

  ```handlebars
  {{progress-bar precentComplete="60"}}
  ```

  ```javascript
  progressBar.set('precentComplete', downloaded / totalSize);
  ```

  @class ProgressBar
  @namespace Ember.UI
  @extends Ember.UI.View
*/
Ember.UI.ProgressBar = Ember.UI.View.extend({
  templateName: 'progress/progress-bar',

  /**
    A value between [0, 100].

    @property percent
    @type {Number}
  */
  percentComplete: 0,

  /**
    Computed value for the `style` attribute like "width: 60%".

    @property width
  */
  _width: function() {
    var percent = this.get('percentComplete');
    var css = 'width:' + percent + '%';
    return css;
  }.property('percentComplete'),


  /**
    Optional style modifier controlling the progress bar color.  See [Bootstrap's progress bar
    styles for details] (http://twitter.github.com/bootstrap/components.html#progress).  Besides the
    default `null`, values can be:
      * "success" - Green progress bar
      * "warning" - Yellow progress bar
      * "danger" - Red progress bar
      * `null` - The default blue progress bar

    @property style
    @type {String}
  */
  style: null,

  _styleCss: function() {
    var propertyValue = this.get('style');
    return propertyValue ? 'bar-' + propertyValue : null;
  }.property('style'),

  /**
    Optional style modifier to add movement to the progress bar.  Helps the user know the app isn't
    stuck during long running processes.

    @property animate
    @type {Boolean}
  */
  animate: false,

  _animateCss: function() {
    var propertyValue = this.get('animate');
    return propertyValue ? 'progress-striped active' : null;
  }.property('animate')

});


// Template shorthand:  {{#progress-bar [options]}}Text{{/progress-bar}}
Ember.Handlebars.registerHelper('progress-bar', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.ProgressBar', options);
});
