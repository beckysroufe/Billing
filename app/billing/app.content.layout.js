define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!app.content.layout'),
      AppLayout;

  AppLayout = Marionette.Layout.extend({
    template: template,

    tagName: 'div',
    className: 'dashboard-wrapper',

    regions: {
      menuRegion: '#menu-region',
      mainRegion: '#main-region'
    }
  });

  return AppLayout;
});
