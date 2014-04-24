define(function (require) {
  var ShowView = require('modules/dashboard/dashboard.view'),
      appRadio = require('app.radio'),
      ShowController;

  ShowController = {
    showDashboard: function () {
      var showView = new ShowView();
      appRadio.commands.execute('show:in:content:main', showView);
    }
  };

  return ShowController;
});
