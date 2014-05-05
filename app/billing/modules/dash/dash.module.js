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
    priv: {
      _showInContent: function (view) {
        mainController.showInContent(view);
      },

      _actionView: function () {
        return dashController.actionView();
      }
    },

    pub: {
      showDashboard: function () {
        dashController.showDashboard();
        appRadio.vent.trigger('module:activated', 'dash');
        appRadio.commands.execute('navigate', 'dash');
      }    
    },

    evtFwd: {
      _showInMain: function (mainView) {
        appRadio.commands.execute('region:content-main:showin', mainView);
      },

      _alertEntities: function () {
        return appRadio.reqres.request('alert:entities');
      }
    }
  };

  // private events
  dashRadio.commands.setHandler('region:content:showin', API.priv._showInContent);
  dashRadio.reqres.setHandler('action:view', API.priv._actionView);

  // public events
  appRadio.vent.on('dash:showDashboard', API.pub.showDashboard);

  // module -> app forwarded events
  dashRadio.commands.setHandler('region:main:showin', API.evtFwd._showInMain);
  dashRadio.reqres.setHandler('alert:entities', API.evtFwd._alertEntities);

  // register module with app
  appRadio.commands.execute('initializer:add', function () {
    new DashRouter({
      controller: API.pub
    });
  });

  // No export--event API only
});
