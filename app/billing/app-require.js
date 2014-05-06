require.config({
  paths: {
    'jquery':                  '../vendor/jquery/jquery',
    'underscore':              '../vendor/underscore/underscore',
    'backbone':                '../vendor/backbone/backbone',
    'backbone.wreqr':          '../vendor/backbone.wreqr/backbone.wreqr',
    'backbone.babysitter':     '../vendor/backbone.babysitter/backbone.babysitter',
    'backbone.computedfields': '../vendor/backbone-computedfields/backbone.computedfields',
    'marionette':              '../vendor/marionette/backbone.marionette',
    'bootstrap':               '../vendor/bootstrap/bootstrap',
    'parsley':                 '../vendor/parsleyjs/parsley',
    'hogan':                   '../vendor/requirejs-hogan-plugin/hogan',
    'hgn':                     '../vendor/requirejs-hogan-plugin/hgn',
    'text':                    '../vendor/requirejs-hogan-plugin/text'
  },

  shim: {
    'underscore': {
      exports: '_'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'parsley': {
      deps: ['jquery']
    },
    'backbone.computedfields': {
      deps: ['backbone']
    }
  },

  hgn: {
    templateExtension: '.html'
  }
});

require([
  'marionette',
  'app',
  'app.module',
  'entities/entities.module',
  'modules/header/header.module',
  'modules/footer/footer.module',
  'modules/menu/menu.module',
  'modules/dash/dash.module',
  'backbone.computedfields'
],
function (Marionette, app) {
  // Override templating method to use hgn templates
  Marionette.Renderer.render = function (template, data) {
    return template(data);
  };

  app.start();
});
