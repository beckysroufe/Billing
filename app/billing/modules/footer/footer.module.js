define(function (require) {
  var appChannel = require('app.channel'),
      footerController = require('modules/footer/footer.controller'),
      API;

  API = {
    showFooter: function () {
      footerController.showFooter();
    }
  };

  appChannel.commands.execute('initializer:add', API.showFooter);

  // No export--event API only
});
