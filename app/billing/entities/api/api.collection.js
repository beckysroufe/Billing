define(function (require) {
  var Backbone = require('backbone'),
  		ApiModel = require('entities/api/api.model'),
      ApiCollection;

  ApiCollection = Backbone.Collection.extend({

  	model: ApiModel,

  	fetch: function (opts) {
  		if (!this.url) {
  			opts.success([
		      { name: 'api one', status: 'okay', usage: 0.10, cycle: 0.8 },
          { name: 'api two', status: 'warn', usage: 0.50, cycle: 0.4 },
          { name: 'api three', status: 'error', usage: 0.80, cycle: 0.5 }
  			]);
  		} else {
  			ApiCollection.__super__.fetch.apply(this, arguments);
  		}
  	}
  });

  return ApiCollection;
});
