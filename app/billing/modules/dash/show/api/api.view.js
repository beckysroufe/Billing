define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/dash/show/api/api.view'),
      ApiView;

  ApiView = Marionette.ItemView.extend({
    template: template
  });

  return ApiView;
});
