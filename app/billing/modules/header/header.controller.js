define(function (require) {
  var HeaderView = require('modules/header/header.view'),
      appChannel = require('app.channel'),
      headerController;

  headerController = {
    showHeader: function () {
      var headerView = new HeaderView();
      appChannel.commands.execute('region:header:showin', headerView);
    }
  };

  return headerController;
});
