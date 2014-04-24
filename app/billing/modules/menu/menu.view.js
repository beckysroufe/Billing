define(function (require) {
  var Marionette = require('marionette'),
      showTemplate = require('hgn!modules/menu/menu'),
      ShowView;

  ShowView = Marionette.ItemView.extend({
    template: showTemplate
  });

  return ShowView;
});
