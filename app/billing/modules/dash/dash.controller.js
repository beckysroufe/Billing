define(function (require) {
  var appChannel = require('app.channel'),
      ModuleController = require('lib/module.controller'),
      MainController = require('common/main/main.controller'),
      OverviewController = require('modules/dash/overview/overview.controller'),
      DashController;

  DashController = ModuleController.extend({

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
        'region:content:showin': 'showInContent'
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
      DashController.__super__.initialize.apply(this, arguments);

      this.mainController = new MainController({
        name: 'Dashboard',
        moduleChannel: this.moduleChannel
      });

      this.overviewController = new OverviewController();
    },

    showInContent: function (view) {
      this.mainController.showInContent(view);
    },

    getActionView: function () {
      return this.overviewController.getActionView();
    },

    showDashboard: function () {
      this.overviewController.showOverview();
      appChannel.vent.trigger('module:activated', 'dash');
      appChannel.commands.execute('navigate', 'dash');
    }
  });

  return DashController;

  // No export--event API only
});
