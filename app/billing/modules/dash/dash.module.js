define(function (require) {
  var Module = require('lib/module'),
      DashModuleController = require('modules/dash/dash.module.controller'),
      dashBus = require('modules/dash/dash.bus'),
      app = require('app'),
      DashModule,
      dash;

  DashModule = Module.extend({
    ModuleController: DashModuleController,
    moduleBus: dashBus
  });

  dash = app.module('dash', DashModule);
  dash.start();

  return dash;
});
