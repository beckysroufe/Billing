define(function (require) {
  var Backbone = require('backbone'),
  		AlertModel = require('entities/alert/alert.model'),
      AlertCollection;

  AlertCollection = Backbone.Collection.extend({
  	model: AlertModel
  });

  return AlertCollection;
});
