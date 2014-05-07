define(function (require) {
  var appBus = require('app.bus'),
      footerController = require('modules/footer/footer.controller'),
      API;

  API = {
    showFooter: function () {
      footerController.showFooter();
    }
  };

  appBus.commands.execute('initializer:add', API.showFooter);

  // No export--event API only
});
