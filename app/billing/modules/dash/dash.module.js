define(function (require) {
  var appRadio = require('app.radio'),
      dashRadio = require('modules/dash/dash.radio'),
      DashController = require('modules/dash/dash.controller'),
      DashRouter,
      API,
      dashController;

  DashRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'dash': 'showDashboard'
    }
  });

  dashController = new DashController({ name: 'Dashboard' });

  API = {
    _initialize: function () {
      new DashRouter({
        controller: API
      });
    },

    showDashboard: function () {
      dashController.showDashboard();
      appRadio.vent.trigger('module:activated', 'dash');
      appRadio.commands.execute('navigate', 'dash');
    },

    showMain: function (view) {
      appRadio.commands.execute('show:content:main', view);
    }
  };

  appRadio.vent.on('dash:show', API.showDashboard);
  appRadio.commands.execute('add:initializer', API._initialize);

  // module->app event forwarding
  dashRadio.commands.setHandler('show:main', API.showMain);

  // No export--event API only
});
