define(function (require) {
  var ModuleController = require('lib/module.controller'),
      MainController = require('common/main/main.controller'),
      DashShowController = require('modules/dash/show/dash.show.controller'),
      appChannel = require('app.channel'),
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
    dashShowController: null,

    initialize: function () {
      this.mainController = new MainController({
        name: 'Dashboard',
        moduleChannel: this.moduleChannel
      });

      this.dashShowController = new DashShowController();
    },

    showInContent: function (view) {
      this.mainController.showInContent(view);
    },

    getActionView: function () {
      return this.dashShowController.getActionView();
    },

    showDashboard: function () {
      this.dashShowController.showDash();
      appChannel.vent.trigger('module:activated', 'dash');
      appChannel.commands.execute('navigate', 'dash');
    }
  });

  return DashController;
});
