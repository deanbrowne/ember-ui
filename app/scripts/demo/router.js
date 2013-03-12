Demo.Router = Em.Router.extend();

Demo.Router.map(function() {
  this.route('root', { path: '/' });
  this.route('button');
  this.route('navbar');
});
