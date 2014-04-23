define(function(require, exports, module) {
  var ShowView = require('modules/dashboard/show/show.view'),
      billingRadio = require('billing.radio');

  var ShowController = {
    showDashboard: function() {
      var showView = new ShowView();
      billingRadio.commands.execute('billing:show:main', showView);
    }
  };

  module.exports = ShowController;
});