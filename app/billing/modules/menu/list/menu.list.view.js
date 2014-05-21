define(function (require) {
  var Marionette = require('marionette'),
      showTemplate = require('hgn!modules/menu/list/menu.list.view'),
      ShowView;

  ShowView = Marionette.ItemView.extend({
    template: showTemplate
  });

  return ShowView;
});
