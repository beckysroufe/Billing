define(function (require) {
  var appRadio = require('app.radio'),
      ApiCollection = require('entities/account/account.collection'),
      AccountCollection = require('entities/account/account.collection'),
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
    }
  };

  appRadio.reqres.setHandler('api:entities', API.getApiEntities);
  appRadio.reqres.setHandler('account:entities', API.getAccountEntities);

  // No export--event API only
});
