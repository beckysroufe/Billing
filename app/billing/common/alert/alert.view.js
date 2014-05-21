define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!common/alert/alert.view'),
      AlertView;

  AlertView = Marionette.ItemView.extend({
    template: template
  });

  return AlertView;
});
