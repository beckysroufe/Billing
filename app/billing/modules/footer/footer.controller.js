define(function (require) {
  var FooterView = require('modules/footer/footer.view'),
      appChannel = require('app.channel'),
      footerController;

  footerController = {
    showFooter: function () {
      var footerView = new FooterView();
      appChannel.commands.execute('region:footer:showin', footerView);
    }
  };

  return footerController;
});
