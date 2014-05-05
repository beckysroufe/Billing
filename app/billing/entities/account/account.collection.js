define(function (require) {
  var Backbone = require('backbone'),
  		AccountModel = require('entities/account/account.model'),
      AccountCollection;

  AccountCollection = Backbone.Collection.extend({
  	model: AccountModel
  });

  return AccountCollection;
});
