define(function (require) {
  var HeaderView = require('modules/header/header.view'),
      appRadio = require('app.radio'),
      headerController;

  headerController = {
    showHeader: function () {
      var headerView = new HeaderView();
      appRadio.commands.execute('show:header', headerView);
    }
  };

  return headerController;
});
