define(function (require) {
  var Marionette = require('marionette'),
      showTemplate = require('hgn!modules/header/show/header.show.view'),
      ShowView;

  ShowView = Marionette.ItemView.extend({
    template: showTemplate
  });

  return ShowView;
});
