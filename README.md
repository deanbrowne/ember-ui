----
# WARNING

> **Ember.UI is very raw.**  The goal is a first release of alpha-quality shortly after [Bootstrap 3.0](https://github.com/twitter/bootstrap/wiki/Roadmap)
releases.

----


# Ember.UI

Library of basic views for Ember including buttons, lists, navigation elements, etc.  The goal of
Ember.UI is to make building apps trivial.

Ember.UI is:
  * Designed with apps in mind
  * Built for smartphones, tablets, and desktop browsers
  * Styled using [Bootstrap](http://twitter.github.com/bootstrap/)
  * Syntactically simple for readabile templates

    ```handlebars
    {{#button action="login"}}Log In{{/button}}
    ```

Ember.UI is loosely modeled after [iOS's UIKit](http://developer.apple.com/library/ios/#documentation/uikit/reference/UIKit_Framework/Introduction/Introduction.html).  It
works on iOS and Android just as well as it does on desktop.


## Platform Support

Designed to work on modern browsers, touch devcies, and IE 9+.  _IE 8 is not supported._

Active testing happens on iOS, Android (2.3 and 4), and Chrome.


## Setup

1. Install [Node.js](http://nodejs.org/) if needed using the [installer](http://nodejs.org/download/)]
1. Install [Bower](http://twitter.github.com/bower/) if needed

    ```bash
    sudo npm install -g bower
    ```

1. Install Ember.UI dependencies

    ```bash
    # Install the build tools.  Builds use Grunt, the Node.js build system, http://gruntjs.com/
    npm install

    # Install 3rd party libraries.
    bower install
    ```


## Contributing

### Developing

Each new view should have tests and a demo.  Being a UI library everything has to be visually
inspected making the demo part of the all around tests.

This command runs the demo.  Each time a file is saved it recompiles all source and refreshes the
browser.

```bash
grunt server
```

This command runs the tests.  Like the demo, anytime a file is saved everything recompiles and the
browser refreshes.

```bash
grunt server:test
```

### Submitting

1. Produce a production build which runs jshint, the tests, etc.  It must pass cleanly.

    ```bash
    grunt
    ```

2. [Rebase](https://help.github.com/articles/interactive-rebase) to have a clean history.
3. [Submit a pull request](https://help.github.com/articles/using-pull-requests).


## Fine Print

### License

Code licensed under [MIT](http://opensource.org/licenses/MIT).  Same as Ember.  Basically do
whatever you'd like with it.  A link is always appreciated as it could mean more contributors making
the library better for you and me!

### Attributions

(Run `bower list` to see versions and complete details.)

  * Toolchain
    * [Yeoman](http://yeoman.io/) - Original scaffolding
    * [Grunt](http://gruntjs.com/) - Building
    * [Mocha](http://visionmedia.github.com/mocha/) and [Chai](http://chaijs.com/) - Testing
    * [Bower](http://twitter.github.com/bower/) - Package manager
    * [SASS](http://sass-lang.com/) and [Compass](http://compass-style.org/reference/compass/) - CSS
  * Libraries
    * [Ember](http://emberjs.com/)
    * [Bootstrap](http://twitter.github.com/bootstrap/) - CSS
    * [FontAwesome](http://fortawesome.github.com/Font-Awesome/) - Icons
