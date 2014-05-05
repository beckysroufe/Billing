define(function (require) {
  var FooterView = require('modules/footer/footer.view'),
      appRadio = require('app.radio'),
      footerController;

  footerController = {
    showFooter: function () {
      var footerView = new FooterView();
      appRadio.commands.execute('show:footer', footerView);
    }
  };

  return footerController;
});
