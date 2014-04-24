define(function(require) {
  var billingRadio = require('billing.radio'),
    ShowController = require('modules/dashboard/show/show.controller'),
    DashboardRouter,
    API;

  // dashboard router API hooks
  DashboardRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'dashboard': 'showDashboard'
    }
  });

  // dashboard API
  API = {
    showDashboard: function() {
      ShowController.showDashboard();
      billingRadio.commands.execute('set:active:module', 'dashboard');
    }
  };

  // dashboard event API hooks
  billingRadio.vent.on('dashboard:show', function() {
    billingRadio.commands.execute('billing:navigate', 'dashboard');
    API.showDashboard();
  });

  // attach dashbaord module to app
  billingRadio.commands.execute('billing:add:initializer', function() {
    new DashboardRouter({
      controller: API
    });
  });

  // No export--event API only
});