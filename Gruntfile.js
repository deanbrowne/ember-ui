module.exports = function( grunt ) {
  'use strict';

  // db- Handlebars automatic compilation: https://github.com/yeoman/yeoman/issues/455
  //     Configure options:  https://github.com/dgeb/grunt-ember-templates
  grunt.loadNpmTasks('grunt-ember-templates');

  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    // Project configuration
    // ---------------------

    // db- Add a task to compile Handlebar templates.
    ember_templates: {
      compile: {
        files: {
          // Destination for compiled .js files.
          'app/scripts/demo/templates.js': [
            // Input templates.
            'app/scripts/demo/**/*.hbs',
            'app/scripts/demo/**/*.handlebars'
          ]
        },
        options: {
          // Remove the "app/scripts/demo/" prefix from template names.
          templateName: function(sourceFile) {
            return sourceFile.replace(/app\/scripts\/demo\//, '');
          }
        }
      }
    },

    // Coffee to JS compilation
    coffee: {
      compile: {
        files: {
          'temp/scripts/*.js': 'app/scripts/**/*.coffee'
        },
        options: {
          basePath: 'app/scripts'
        }
      }
    },

    // compile .scss/.sass to .css using Compass
    compass: {
      dist: {
        // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
        options: {
          css_dir: 'temp/styles',
          sass_dir: 'app/styles',
          images_dir: 'app/images',
          //fonts_dir: 'styles/fonts',  // db- Referenced in .compass.rb
          javascripts_dir: 'temp/scripts',
          force: true,
          config: '.compass.rb'
        }
      }
    },

    // generate application cache manifest
    // https://github.com/gunta/grunt-contrib-manifest
    manifest: {
      dest: 'manifest.appcache'
    },

    // headless testing through PhantomJS
    mocha: {
      all: [
        // db- To get `yeoman test` working it needs to spy the PhantomJS server.
        //     https://github.com/yeoman/yeoman/issues/588#issuecomment-9920376
        'http://localhost:3501/index.html'
      ]
    },

    // default watch configuration
    watch: {
      coffee: {
        files: [
          'app/scripts/**/*.coffee',
          'test/spec/**/*.coffee'
        ],
        tasks: 'coffee reload'
      },
      compass: {
        files: [
          'app/vendor/**/*.{scss,sass}',
          'app/styles/**/*.{scss,sass}'
        ],
        tasks: 'compass reload'
      },
      reload: {
        files: [
          'app/*.html',
          'app/styles/**/*.css',
          'app/styles/fonts/**/*',
          'app/scripts/**/*.js',
          'app/images/**/*',
          'test/index.html',
          'test/spec/**/*.js'
        ],
        tasks: 'reload'
      },
      handlebars: {  // db- Compile Handlebar files whenever they change
        files: [
          'app/scripts/demo/**/*.hbs',
          'app/scripts/demo/**/*.handlebars'
        ],
        tasks: 'ember_templates reload'
      }
    },

    // default lint configuration, change this to match your setup:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
    lint: {
      files: [
        'app/scripts/**/*.js',
        '!app/scripts/vendor/**/*.js',
        '!app/scripts/demo/templates.js',
        'spec/**/*.js'
      ]
    },

    // db- Make sure this matches .jshintrc (which is used by editors).
    // specifying JSHint options and globals
    // http://www.jshint.com/docs/
    jshint: {
      options: {
        bitwise: true,
        boss: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        es5: true,
        esnext: true,
        immed: true,
        indent: 2,
        latedef: true,
        maxlen: 100,
        newcap: true,
        noarg: true,
        quotmark: 'single',
        // Would warn against periods which I find useful in regexs.
        regexp: false,
        undef: true,
        unused: true,
        sub: true,
        // Would require wrapping files in a function to call 'use strict';
        strict: false,
        trailing: true,
        browser: true,
        node: true,
        jquery: true,
        globals: {
          // Our application's namespace (true because can be assigned to)
          'App': true,
          // Ember's namespaces.
          'Em': false,
          'Ember': false,
          'DS': false,
          // moment.js,
          'moment': false,
          // Tests.
          'describe': false,
          'it': false,
          'before': false,
          'beforeEach': false,
          'after': false,
          'afterEach': false,
          'expect': true,
          'should': true,
          'assert': true,
          // Fixture data.
          'books': true,
        }
      }
    },

    // Build configuration
    // -------------------

    // the staging directory used during the process
    staging: 'temp',
    // final build output
    output: 'dist',

    mkdirs: {
      staging: 'app/'
    },

    // Below, all paths are relative to the staging directory, which is a copy
    // of the app/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the app/ tree are used to ignore these values
    // during the copy process.

    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'styles/main.css': ['styles/**/*.css']
    },

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    rev: {
      js: 'scripts/**/*.js',
      css: 'styles/**/*.css',
      img: ''  // 'images/**'  // db- Turn off default of renaming images b/c can't then use in CSS
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: 'index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: ['**/*.html'],
      css: ['**/*.css']
    },

    // HTML minification
    html: {
      files: ['**/*.html']
    },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    img: {
      dist: 'images/**'  // '<config:rev.img>'  // db- Compress, but do not rename
    },

    // rjs configuration. You don't necessarily need to specify the typical
    // `path` configuration, the rjs task will parse these values from your
    // main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
    //
    // name / out / mainConfig file should be used. You can let it blank if
    // you're using usemin-handler to parse rjs config from markup (default
    // setup)
    rjs: {
      // no minification, is done by the min task
      optimize: 'none',
      baseUrl: './scripts',
      wrap: true,
      name: 'main'
    },

    // While Yeoman handles concat/min when using
    // usemin blocks, you can still use them manually
    concat: {
      dist: ''
    },

    min: {
      dist: ''
    }
  });

  // db- Handlebars task.  Run `yeoman handlebars` to generate app/scripts/views/templates.js.
  grunt.registerTask('handlebars', ['ember_templates']);

  // db- Compile Handlebars templates as part of the build.
  //     https://github.com/yeoman/yeoman/issues/491
  grunt.renameTask('build', 'original-build');
  grunt.registerTask('build', 'handlebars original-build');

  grunt.renameTask('server', 'original-server');
  grunt.registerTask('server', 'handlebars original-server');

  // db- Changed from "server" to "handlebars original-server" to get working.
  grunt.registerTask('server:test', 'handlebars original-server:test');
  // Alias the `test` task to run the `mocha` task instead
  grunt.registerTask('test', 'handlebars original-server:phantom mocha');
};
