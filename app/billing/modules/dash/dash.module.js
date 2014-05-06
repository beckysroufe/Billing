define(function (require) {
  var appRadio = require('app.radio'),
      dashRadio = require('modules/dash/dash.radio'),
      MainController = require('common/main/main.controller'),
      DashController = require('modules/dash/dash.controller'),
      DashRouter = require('modules/dash/dash.router'),
      API,
      dashController,
      mainController;

  mainController = new MainController({
    name: 'Dashboard',
    radio: dashRadio
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
        appRadio.vent.trigger('module:activated', 'dash');
        appRadio.commands.execute('navigate', 'dash');
      }    
    },

    evtFwd: {
      showInMain: function (mainView) {
        appRadio.commands.execute('region:content-main:showin', mainView);
      },

      alertEntities: function () {
        return appRadio.reqres.request('alert:entities');
      },

      apiEntities: function () {
        return appRadio.reqres.request('api:entities');
      },

      accountEntities: function () {
        return appRadio.reqres.request('account:entities');
      }
    }
  };

  // module events
  dashRadio.commands.setHandler('region:content:showin', API.module.showInContent);
  dashRadio.reqres.setHandler('action:view', API.module.actionView);

  // app events
  appRadio.vent.on('dash:showDashboard', API.app.showDashboard);

  // module -> app forwarded events
  dashRadio.commands.setHandler('region:main:showin', API.evtFwd.showInMain);
  dashRadio.reqres.setHandler('alert:entities', API.evtFwd.alertEntities);
  dashRadio.reqres.setHandler('api:entities', API.evtFwd.apiEntities);
  dashRadio.reqres.setHandler('account:entities', API.evtFwd.accountEntities);

  // register module with app
  appRadio.commands.execute('initializer:add', function () {
    new DashRouter({
      controller: API.app
    });
  });

  // No export--event API only
});
