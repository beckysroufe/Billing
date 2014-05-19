define(function (require) {
  var Backbone = require('backbone'),
      Marionette = require('marionette'),
      appConfig = require('app.config'),
      appChannel = require('app.channel'),
      AppController = require('app.controller'),
      App;

  App = Marionette.Application.extend({

    regions: {
      headerRegion: '#header-region',
      contentRegion: '#content-region',
      footerRegion: '#footer-region'
    },

    initialize: function () {
      this.appController = new AppController({
        app: this
      });

      this.on('initialize:after', function () {
        if (Backbone.history) {
          Backbone.history.start();

          // navigate to index if root url
          if (appChannel.reqres.request('route:current') === '') {
            appChannel.vent.trigger(appConfig.indexEvent);
          }
        }
      });
    }
  })

  return new App();
});
