define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/dash/show/action/action.view'),
      ActionView;

  ActionView = Marionette.ItemView.extend({
    template: template
  });

  return ActionView;
});
