define(function (require) {
  var Backbone = require('backbone'),
  		AccountModel = require('entities/account/account.model'),
      AccountCollection;

  AccountCollection = Backbone.Collection.extend({
  	
  	model: AccountModel,

  	fetch: function (opts) {
  		if (!this.url) {
  			opts.success([
		      { name: 'Bitcoin', account: '1AQbaRey3...', balance: 0.25 },
		      { name: 'Stripe', account: 'x9004', balance: 100.0 },
		      { name: 'API Coin', account: 'Zqxz2874...', balance: 0 }
  			]);
  		} else {
  			AccountCollection.__super__.fetch.apply(this, arguments);
  		}
  	}
  });

  return AccountCollection;
});
