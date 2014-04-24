// TODO: remove this a replace with dashboard layout (complex view)
define(function (require) {
  var Marionette = require('marionette'),
      showTemplate = require('hgn!modules/dashboard/dashboard'),
      ShowView;

  ShowView = Marionette.ItemView.extend({
    template: showTemplate
  });

  return ShowView;
});
