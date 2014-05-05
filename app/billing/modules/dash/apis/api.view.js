define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/dash/apis/api.view'),
      ApiView;

  ApiView = Marionette.ItemView.extend({
    template: template
  });

  return ApiView;
});
