define(function (require) {
  var Marionette = require('marionette'),
      showTemplate = require('hgn!modules/header/header'),
      ShowView;

  ShowView = Marionette.ItemView.extend({
    template: showTemplate
  });

  return ShowView;
});
