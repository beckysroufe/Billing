define(function (require) {
  var appBus = require('app.bus'),
      headerController = require('modules/header/header.controller'),
      API;

  API = {
    showHeader: function () {
      headerController.showHeader();
    }
  };

  appBus.commands.execute('initializer:add', API.showHeader);

  // No export--event API only
});
