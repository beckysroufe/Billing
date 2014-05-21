define(function (require) {
  var FooterView = require('modules/footer/show/footer.show.view'),
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
