define(function (require) {
  var appRadio = require('app.radio'),
      ApiCollection = require('entities/account/account.collection'),
      AccountCollection = require('entities/account/account.collection'),
      AlertCollection = require('entities/alert/alert.collection'),
      API;

  function initializeApis() {
    return [
      { name: 'api one' },
      { name: 'api two' },
      { name: 'api three' }
    ];
  }

  function initializeAccounts() {
    return [
      { name: 'account one' },
      { name: 'account two' },
      { name: 'account three' }
    ];
  }

  function initializeAlerts() {
    return [
      { message: 'alert danger', state: 'danger' },
      { message: 'alert warn', state: 'warn' },
      { message: 'alert info', state: 'info' },
      { message: 'alert success', state: 'success' }
    ];
  }

  API = {
    getApiEntities: function () {
      var apis = new ApiCollection(),
          defer = $.Deferred(),
          promise = defer.promise();

      apis.fetch({
        success: function (data) {
          defer.resolve(data);
        }
      });

      $.when(promise).done(function (apis) {
        if (apis.length === 0){
          var apiModels = initializeApis();
          apis.reset(apiModels);
        }
      });

      return promise;
    },

    getAccountEntities: function () {
      var accounts = new AccountCollection(),
          defer = $.Deferred(),
          promise = defer.promise();

      accounts.fetch({
        success: function (data) {
          defer.resolve(data);
        }
      });

      $.when(promise).done(function (accounts) {
        if (accounts.length === 0){
          var accountModels = initializeAccounts();
          accounts.reset(accountModels);
        }
      });

      return promise;
    },

    getAlertEntities: function () {
      return new AlertCollection(initializeAlerts());
    }
  };

  appRadio.reqres.setHandler('api:entities', API.getApiEntities);
  appRadio.reqres.setHandler('account:entities', API.getAccountEntities);
  appRadio.reqres.setHandler('alert:entities', API.getAlertEntities);
  // No export--event API only
});
