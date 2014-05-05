define(function (require) {
  var appRadio = require('app.radio'),
      headerController = require('modules/header/header.controller'),
      API;

  API = {
    showHeader: function () {
      headerController.showHeader();
    }
  };

  appRadio.commands.execute('initializer:add', API.showHeader);

  // No export--event API only
});
