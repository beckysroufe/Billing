define(function (require) {
  var Backbone = require('backbone'),
  		ApiModel = require('entities/api/api.model'),
      ApiCollection;

  ApiCollection = Backbone.Collection.extend({
  	model: ApiModel
  });

  return ApiCollection;
});
