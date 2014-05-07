define(function (require) {
  var HeaderView = require('modules/header/header.view'),
      appBus = require('app.bus'),
      headerController;

  headerController = {
    showHeader: function () {
      var headerView = new HeaderView();
      appBus.commands.execute('region:header:showin', headerView);
    }
  };

  return headerController;
});
