# Ember-UI

Library of basic views for Ember.js including buttons, lists, navigation elements, etc.

Ember-UI is:
  * Based on [Bootstrap](http://twitter.github.com/bootstrap/)
  * Designed for smartphones, tablets, and desktop browsers
  * Syntactically simple for readabile templates

```handlebars
{{button action="foo"}}
```


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

## Development

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

  * Toolchain
    * [Grunt](http://gruntjs.com/) - Building
    * [Yeoman](http://yeoman.io/) - Scaffolding
    * [Mocha](http://visionmedia.github.com/mocha/) and [Chai](http://chaijs.com/) - Testing
    * [Bower](http://twitter.github.com/bower/) - Package manager
    * [SASS](http://sass-lang.com/) and [Compass](http://compass-style.org/reference/compass/) - CSS
  * Libraries (run `bower list` to see complete details and versions)
    * [Ember](http://emberjs.com/)
    * [Bootstrap](http://twitter.github.com/bootstrap/) - CSS
    * [FontAwesome](http://fortawesome.github.com/Font-Awesome/) - Icons
