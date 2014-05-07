define(function (require) {
  var Backbone = require('backbone'),
      Marionette = require('marionette'),
      appConfig = require('app.config'),
      appBus = require('app.bus'),
      app = new Marionette.Application();

  // app regions found in index.html
  app.addRegions({
    headerRegion: '#header-region',
    contentRegion: '#content-region',
    footerRegion: '#footer-region'
  });

  app.on('initialize:after', function () {
    if (Backbone.history) {
      Backbone.history.start();

      // navigate to index if root url
      if (appBus.reqres.request('route:current') === '') {
        appBus.vent.trigger(appConfig.indexEvent);
      }
    }
  });

  return app;
});
