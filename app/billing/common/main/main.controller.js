define(function (require) {
  var Marionette = require('marionette'),
      MainLayout = require('common/main/main.layout'),
      AlertsView = require('common/alert/alerts.view'),
      moduleRadio,
      MainController;

  /**
   * Generic top level controller for main app modules
   * @constructor
   * @param {string} options.name Module name (displayed in main layout)
   * @param {Wreqr.radio} options.radio Module radio
   */
  MainController = Marionette.Controller.extend({

    initialize: function () {
      moduleRadio = this.options.radio;
    },

    _mainLayout: null,
    _alerts: null,

    _showMain: function (showFn) {
      var alerts = moduleRadio.reqres.request('alert:entities'),
          actionView = moduleRadio.reqres.request('action:view'),
          alertsView,
          self = this;

      this._alerts = alerts;

      alertsView = new AlertsView({
        collection: this._alerts
      });

      this._mainLayout = new MainLayout({ title: this.options.name });
      this._mainLayout.on('render', function () {
        self._mainLayout.alertRegion.show(alertsView);
        self._mainLayout.actionRegion.show(actionView);
        if (showFn) showFn();
      });

      moduleRadio.commands.execute('region:main:showin', this._mainLayout);
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
