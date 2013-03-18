/**
  Panels are containers for other views.  A panel is a column 100% the height of its parent.  Panels
  can slide under or over other content.  Applications are often composed of a number of panels: a
  menu panel on the left that others slide on top of, a main panel area for the content, and
  auxilary panels for lists, etc.

  ```handlebars
  {{#panel id="menu" style="reveal" width="240px"}}
    {{! Menu contents }}
  {{/panel}}
  ```

  @class Panel
  @namespace Ember.UI
  @extends Ember.UI.View
*/
Ember.UI.Panel = Ember.UI.View.extend({

  /**
    Apply basic panel CSS.

    @property classNames
    @type {Array[String]}
    @override
  */
  classNames: ['ui-panel']

});


// Template shorthand:  {{#panel [options]}}Text{{/panel}}
Ember.Handlebars.registerHelper('panel', function(options) {
  return Ember.Handlebars.ViewHelper.helper(this, 'Ember.UI.Panel', options);
});
