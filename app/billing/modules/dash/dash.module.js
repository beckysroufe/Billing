define(function (require) {
  var appBus = require('app.bus'),
      dashBus = require('modules/dash/dash.bus'),
      MainController = require('common/main/main.controller'),
      DashController = require('modules/dash/dash.controller'),
      DashRouter = require('modules/dash/dash.router'),
      API,
      dashController,
      mainController;

  mainController = new MainController({
    name: 'Dashboard',
    bus: dashBus
  });

  dashController = new DashController();

  API = {
    module: {
      showInContent: function (view) {
        mainController.showInContent(view);
      },

      actionView: function () {
        return dashController.actionView();
      }
    },

    app: {
      showDashboard: function () {
        dashController.showDashboard();
        appBus.vent.trigger('module:activated', 'dash');
        appBus.commands.execute('navigate', 'dash');
      }    
    },

    evtFwd: {
      showInMain: function (mainView) {
        appBus.commands.execute('region:content-main:showin', mainView);
      },

      alertEntities: function () {
        return appBus.reqres.request('alert:entities');
      },

      apiEntities: function () {
        return appBus.reqres.request('api:entities');
      },

      accountEntities: function () {
        return appBus.reqres.request('account:entities');
      }
    }
  };

  // module events
  dashBus.commands.setHandler('region:content:showin', API.module.showInContent);
  dashBus.reqres.setHandler('action:view', API.module.actionView);

  // app events
  appBus.vent.on('dash:showDashboard', API.app.showDashboard);

  // module -> app forwarded events
  dashBus.commands.setHandler('region:main:showin', API.evtFwd.showInMain);
  dashBus.reqres.setHandler('alert:entities', API.evtFwd.alertEntities);
  dashBus.reqres.setHandler('api:entities', API.evtFwd.apiEntities);
  dashBus.reqres.setHandler('account:entities', API.evtFwd.accountEntities);

  // register module with app
  appBus.commands.execute('initializer:add', function () {
    new DashRouter({
      controller: API.app
    });
  });

  // No export--event API only
});
