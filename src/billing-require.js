requirejs.config({
  paths: {
    'jquery':              'vendor/jquery/jquery',
    'underscore':          'vendor/underscore/underscore',
    'backbone':            'vendor/backbone/backbone',
    'backbone.wreqr':      'vendor/backbone.wreqr/backbone.wreqr',
    'backbone.babysitter': 'vendor/backbone.babysitter/backbone.babysitter',
    'marionette':          'vendor/marionette/backbone.marionette',
    'bootstrap':           'vendor/bootstrap/bootstrap',
    'parsley':             'vendor/parsleyjs/parsley',
    'hogan':               'vendor/requirejs-hogan-plugin/hogan',
    'hgn':                 'vendor/requirejs-hogan-plugin/hgn',
    'text':                'vendor/requirejs-hogan-plugin/text'
  },

  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone.wreqr': {
      deps: ['backbone']
    },
    'backbone.babysitter': {
      deps: ['backbone']
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'parsley': {
      deps: ['jquery']
    }
  },

  hgn: {
    templateExtension: '.html'
  }
});

require('billing').start();
