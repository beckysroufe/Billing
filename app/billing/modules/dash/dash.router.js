define(function (require) {
	var Marionette = require('marionette'),
			DashRouter;

  // routes served by this module
  DashRouter = Marionette.AppRouter.extend({
    appRoutes: {
      'dash': 'showDashboard'
    }
  });

  return DashRouter;
});
