define(function (require) {
  var Module = require('lib/module'),
      HeaderController = require('modules/header/header.controller'),
      app = require('app'),
      HeaderModule,
      header;

  HeaderModule = Module.extend({
    moduleControllerClass: HeaderController
  });

  header = app.module('header', HeaderModule);
  header.start();

  return header;
});
