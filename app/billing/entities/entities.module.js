define(function (require) {
  var appChannel = require('app.channel'),
      ApiCollection = require('entities/api/api.collection'),
      AccountCollection = require('entities/account/account.collection'),
      AlertCollection = require('entities/alert/alert.collection'),
      API;

  API = {
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
  };

  // public api
  appChannel.reqres.setHandler('api:entities', API.apiEntities);
  appChannel.reqres.setHandler('account:entities', API.accountEntities);
  appChannel.reqres.setHandler('alert:entities', API.alertEntities);

  // No export--event API only
});
