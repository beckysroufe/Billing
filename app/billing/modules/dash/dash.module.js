define(function (require) {
  var Module = require('lib/module'),
      DashController = require('modules/dash/dash.controller'),
      app = require('app'),
      DashModule,
      dash;

  DashModule = Module.extend({
    moduleControllerClass: DashController
  });

  dash = app.module('dash', DashModule);
  dash.start();

  return dash;
});
