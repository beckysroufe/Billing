define(function (require) {
  var appRadio = require('app.radio'),
    ShowController = require('modules/dashboard/dashboard.controller'),
    DashboardRouter,
    API;

  DashboardRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'dashboard': 'showDashboard'
    }
  });

  API = {
    _initialize: function () {
      new DashboardRouter({
        controller: API
      });
    },

    showDashboard: function () {
      ShowController.showDashboard();
      appRadio.vent.trigger('module:activated', 'dashboard');
      appRadio.commands.execute('navigate', 'dashboard');
    }
  };

  appRadio.vent.on('dashboard:show', API.showDashboard);
  appRadio.commands.execute('add:initializer', API._initialize);

  // No export--event API only
});
