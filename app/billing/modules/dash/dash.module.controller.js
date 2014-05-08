define(function (require) {
  var appBus = require('app.bus'),
      dashBus = require('modules/dash/dash.bus'),
      ModuleController = require('lib/module.controller'),
      MainController = require('common/main/main.controller'),
      OverviewController = require('modules/dash/overview/overview.controller'),
      DashModuleController;

  DashModuleController = ModuleController.extend({

    routes: {
      'dash': 'showDashboard'
    },

    appEvents: {
      vent: {
        'dash:showDashboard': 'showDashboard'
      }
    },

    moduleEvents: {
      reqres: {
        'action:view': 'getActionView'
      },
      commands: {
        'region:content:showin': 'showInContent',
        'region:main:showin': 'showInMain'
      }
    },

    forwardEvents: {
      reqres: [
        'alert:entities',
        'api:entities',
        'account:entities'
      ]
    },

    mainController: null,
    overviewController: null,

    initialize: function () {
      DashModuleController.__super__.initialize.apply(this, arguments);

      this.mainController = new MainController({
        name: 'Dashboard',
        moduleBus: dashBus
      });

      this.overviewController = new OverviewController();
    },

    showInContent: function (view) {
      this.mainController.showInContent(view);
    },

    getActionView: function () {
      return this.overviewController.actionView();
    },

    showDashboard: function () {
      this.overviewController.showOverview();
      appBus.vent.trigger('module:activated', 'dash');
      appBus.commands.execute('navigate', 'dash');
    },

    showInMain: function (mainView) {
      appBus.commands.execute('region:content-main:showin', mainView);
    }
  });

  return DashModuleController;

  // No export--event API only
});
