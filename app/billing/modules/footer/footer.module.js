define(function (require) {
  var appRadio = require('app.radio'),
      footerController = require('modules/footer/footer.controller'),
      API;

  API = {
    showFooter: function () {
      footerController.showFooter();
    }
  };

  appRadio.commands.execute('initializer:add', API.showFooter);

  // No export--event API only
});
