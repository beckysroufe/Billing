define(function (require) {
  var Backbone = require('backbone'),
      Marionette = require('marionette'),
      appConfig = require('app.config'),
      appChannel = require('app.channel'),
      AppController = require('app.controller'),
      app = new Marionette.Application();

  app.addRegions({
    headerRegion: '#header-region',
    contentRegion: '#content-region',
    footerRegion: '#footer-region'
  });

  app.on('initialize:after', function () {
    if (Backbone.history) {
      Backbone.history.start();

      // navigate to index if root url
      if (appChannel.reqres.request('route:current') === '') {
        appChannel.vent.trigger(appConfig.indexEvent);
      }
    }
  });

  app.appController = new AppController({
    app: app
  });

  return app;
});
