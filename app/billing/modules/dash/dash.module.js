define(function (require) {
  var Module = require('lib/module'),
      DashController = require('modules/dash/dash.controller'),
      dashChannel = require('modules/dash/dash.channel'),
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
