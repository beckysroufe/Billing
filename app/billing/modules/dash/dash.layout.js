define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/dash/dash.layout'),
      DashLayout;

  /**
   * Layout for dash
   * @constructor
   */
  DashLayout = Marionette.Layout.extend({
    template: template,

    regions: {
      apisRegion: '.js-dash-apis',
      accountsRegion: '.js-dash-accounts'
    }
  });

  return DashLayout;
});
