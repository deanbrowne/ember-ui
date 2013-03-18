/**
  Horizontal progress bar that fills from left-to-right.

  Styled using [Bootstrap](http://twitter.github.com/bootstrap/components.html#progress).

  ```handlebars
  <!-- Bind to a property that goes between 0 and 100 on the controller by its name -->
  {{progress-bar percentBinding="propertyName"}}

  <!-- Set explicitly to 60% -->
  {{progress-bar percent="60"}}
  ```

  ```javascript
  progressBar.set('percent', downloaded / totalSize);
  ```

  @class ProgressBar
  @namespace Ember.UI
  @extends Ember.UI.View
*/
Ember.UI.ProgressBar = Ember.UI.View.extend({
  templateName: 'progress/progressBar',

  /**
    A value between [0, 100].  For example "60" would fill the left 60% of the progress bar.

    @property percent
    @type {Number}
  */
  percent: 0,

  /**
    Computed value for the `style` attribute like "width: 60%".

    @property width
  */
  _width: function() {
    var percent = this.get('percent');
    percent = Math.round(percent);
    percent = Math.max(percent, 0);
    percent = Math.min(percent, 100);
    if (isNaN(percent)) {
      percent = 0;
    }

    var css = 'width:' + percent + '%';
    return css;
  }.property('percent'),


  /**
    Optional appearance modifier controlling the progress bar color.  See [Bootstrap's progress bar
    styles for details] (http://twitter.github.com/bootstrap/components.html#progress).  Besides the
    default `null`, values can be:
      * "success" - Green progress bar
      * "warning" - Yellow progress bar
      * "danger" - Red progress bar
      * `null` - The default blue progress bar

    @property appearance
    @type {String}
  */
  appearance: null,

  _appearanceCss: function() {
    var propertyValue = this.get('appearance');
    return propertyValue ? 'bar-' + propertyValue : null;
  }.property('appearance'),

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
