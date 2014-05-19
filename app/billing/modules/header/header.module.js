define(function (require) {
  var appChannel = require('app.channel'),
      headerController = require('modules/header/header.controller'),
      API;

  API = {
    showHeader: function () {
      headerController.showHeader();
    }
  };

  appChannel.commands.execute('initializer:add', API.showHeader);

  // No export--event API only
});
