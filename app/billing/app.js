define(function (require) {
  var Marionette = require('marionette'),
      appConfig = require('app.config'),
      appRadio = require('app.radio'),
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
      if (appRadio.reqres.request('get:current:route') === '') {
        appRadio.vent.trigger(appConfig.indexEvent);
      }
    }
  });

  return app;
});
