define(function (require) {
  var ModuleController = require('lib/module.controller'),
      ApiCollection = require('entities/api/api.collection'),
      AccountCollection = require('entities/account/account.collection'),
      AlertCollection = require('entities/alert/alert.collection'),
      EntitiesController;

  EntitiesController = ModuleController.extend({

    appEvents: {
      
      reqres: {
        'api:entities': 'apiEntities',
        'account:entities': 'accountEntities',
        'alert:entities': 'alertEntities'
      }
    },

    apiEntities: function () {
      var apis = new ApiCollection(),
          defer = $.Deferred(),
          promise = defer.promise();

      apis.fetch({
        success: function (apiModels) {
          apis.reset(apiModels);
          defer.resolve(apis);
        }
      });

      return promise;
    },

    accountEntities: function () {
      var accounts = new AccountCollection(),
          defer = $.Deferred(),
          promise = defer.promise();

      accounts.fetch({
        success: function (accountModels) {
          accounts.reset(accountModels);
          defer.resolve(accounts);
        }
      });

      return promise;
    },

    alertEntities: function () {
      var alerts = new AlertCollection(),
          defer = $.Deferred(),
          promise = defer.promise();

      alerts.fetch({
        success: function (alertModels) {
          alerts.reset(alertModels);
          defer.resolve(alerts);
        }
      });

      return promise;
    }
  });

  return EntitiesController;
});
