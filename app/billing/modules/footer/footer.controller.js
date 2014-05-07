define(function (require) {
  var FooterView = require('modules/footer/footer.view'),
      appBus = require('app.bus'),
      footerController;

  footerController = {
    showFooter: function () {
      var footerView = new FooterView();
      appBus.commands.execute('region:footer:showin', footerView);
    }
  };

  return footerController;
});
