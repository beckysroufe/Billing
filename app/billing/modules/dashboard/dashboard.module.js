define(function(require) {
  var billingRadio = require('billing.radio'),
      ShowController = require('modules/dashboard/show/show.controller');

  var DashboardRouter,
      API;

  DashboardRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'dashboard': 'showDashboard'
    }
  });

  API = {
    showDashboard: function() {
      ShowController.showDashboard();
      billingRadio.commands.execute('set:active:module', 'dashboard');
    }
  };

  billingRadio.vent.on('dashboard:show', function() {
    billingRadio.commands.execute('billing:navigate', 'dashboard');
    API.showDashboard();
  });

  billingRadio.commands.execute('billing:add:initializer', function() {
    new DashboardRouter({
      controller: API
    })
  });

  // No export--event API only
});