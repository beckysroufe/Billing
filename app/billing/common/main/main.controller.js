define(function (require) {
  var Marionette = require('marionette'),
      MainLayout = require('common/main/main.layout'),
      AlertsView = require('common/alert/alerts.view'),
      moduleBus,
      MainController;

  /**
   * Generic top level controller for main app modules
   * @constructor
   * @param {string} options.title Title displayed in main layout
   * @param {Wreqr.Channel} options.bus Module bus
   */
  MainController = Marionette.Controller.extend({

    initialize: function () {
      moduleBus = this.options.bus;
    },

    _mainLayout: null,
    _alerts: null,

    _showMain: function (showFn) {
      var fetchingAlerts = moduleBus.reqres.request('alert:entities'),
          actionView = moduleBus.reqres.request('action:view'),
          alertsView,
          self = this;

      $.when(fetchingAlerts).done(function (alerts) {
        self._alerts = alerts;

        alertsView = new AlertsView({
          collection: self._alerts
        });

        self._mainLayout = new MainLayout({ title: self.options.title });
        self._mainLayout.on('render', function () {
          self._mainLayout.alertRegion.show(alertsView);
          self._mainLayout.actionRegion.show(actionView);
          if (showFn) showFn();
        });

        moduleBus.commands.execute('region:main:showin', self._mainLayout);
      });
    },

    showInContent: function (contentView) {
      var self = this,
          showFn;

      showFn = function () {
        self._mainLayout.contentRegion.show(contentView);
      };

      if (!this._mainLayout) {
        this._showMain(showFn);
      } else {
        showFn();
      }
    }
  });

  return MainController;
});
