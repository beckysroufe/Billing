define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!common/main.layout'),
      MainLayout;

  /**
   * Reusable layout for app main content area
   * @constructor
   * @param {string} options.title
   */
  MainLayout = Marionette.Layout.extend({
    template: template,

    ui: {
      title: '.js-main-title'
    },

    regions: {
      alertsRegion: '.js-main-alerts',
      actionsRegion: '.js-main-actions',
      contentRegion: '.js-main-content'
    },

    serializeData: function () {
      return {
        title: this.options.title
      };
    }
  });

  return MainLayout;
});
