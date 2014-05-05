define(function (require) {
  var Marionette = require('marionette'),
      showTemplate = require('hgn!modules/menu/menu.view'),
      ShowView;

  ShowView = Marionette.ItemView.extend({
    template: showTemplate
  });

  return ShowView;
});
