# Ember.UI

Library of basic views for Ember.js including buttons, lists, navigation elements, etc.

Ember.UI is:
  * Designed with apps in mind
  * Built for smartphones, tablets, and desktop browsers
  * Styled using [Bootstrap](http://twitter.github.com/bootstrap/)
  * Syntactically simple for readabile templates

    ```handlebars
    {{#button action="login"}}Log In{{/button}}
    ```

Ember is seriously useful for apps.  That is anything that is long running, requires user interaction, or involves
lots of logic.  Ember.UI is therefore modeled after [iOS's UIKit](http://developer.apple.com/library/ios/#documentation/uikit/reference/UIKit_Framework/Introduction/Introduction.html)
and is really designed to work on iOS and Android just as well as it does on desktop.


## Setup

1. Install [Yeoman](http://yeoman.io/) 0.9.6.

    ```console
    curl -L get.yeoman.io | bash
    ```

2. Install development tools.  ([Node.js](http://nodejs.org/download/) must already be installed.)

    ```console
    npm install
    ```

3. Install libraries. ([Bower](http://twitter.github.com/bower/) must be installed which can be done
with `sudo npm install -g bower`.)

    ```console
    bower install
    ```

## Contributing

### Developing

Run Yeoman during development.  Each time a file is saved it will recompile everything and refresh
the browser.

```console
yeoman server
```

### Testing

While writing tests or doing test-first development run them continuously in the browser:

```console
yeoman server:test
```

### Submitting

1. First run the tests to make sure everything passes.

    ```console
    yeoman test
    ```

2. Then [rebase](https://help.github.com/articles/interactive-rebase) to have a clean history.
3. Finally [submit a pull request](https://help.github.com/articles/using-pull-requests).


## Fine Print

### License

Code licensed under [MIT](http://opensource.org/licenses/MIT).  Same as Ember.  Basically do
whatever you'd like with it.  A link is always appreciated as it could mean more contributors making
the library better for you and me!

### Attributions

(Run `bower list` to see versions and complete details.)

  * Toolchain
    * [Grunt](http://gruntjs.com/) - Building
    * [Yeoman](http://yeoman.io/) - Scaffolding
    * [Mocha](http://visionmedia.github.com/mocha/) and [Chai](http://chaijs.com/) - Testing
    * [Bower](http://twitter.github.com/bower/) - Package manager
    * [SASS](http://sass-lang.com/) and [Compass](http://compass-style.org/reference/compass/) - CSS
  * Libraries
    * [Ember](http://emberjs.com/)
    * [Bootstrap](http://twitter.github.com/bootstrap/) - CSS
    * [FontAwesome](http://fortawesome.github.com/Font-Awesome/) - Icons
