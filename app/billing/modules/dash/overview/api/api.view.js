define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/dash/overview/api/api.view'),
      ApiView;

  ApiView = Marionette.ItemView.extend({
    template: template
  });

  return ApiView;
});
