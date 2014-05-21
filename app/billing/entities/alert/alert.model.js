define(function (require) {
  var Backbone = require('backbone'),
      AlertModel;

  AlertModel = Backbone.Model.extend({

  	defaults: {
  		message: 'Alert message',
  		
  		// {danger|warn|info|success}
  		state: 'warn'
  	}
  });

  return AlertModel;
});
