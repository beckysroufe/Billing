define(function (require) {
  var Module = require('lib/module'),
      MenuController = require('modules/menu/menu.controller'),
      app = require('app'),
      MenuModule,
      menu;

  MenuModule = Module.extend({
    moduleControllerClass: MenuController
  });

  menu = app.module('menu', MenuModule);
  menu.start();

  return menu;
});
