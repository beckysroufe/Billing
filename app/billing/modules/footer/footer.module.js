define(function (require) {
  var Module = require('lib/module'),
      FooterController = require('modules/footer/footer.controller'),
      app = require('app'),
      FooterModule,
      footer;

  FooterModule = Module.extend({
    moduleControllerClass: FooterController
  });

  footer = app.module('footer', FooterModule);
  footer.start();

  return footer;
});
