define(function (require) {
  var Backbone = require('backbone'),
      currencyUtil = require('common/currency.util'),
      AccountModel;

  AccountModel = Backbone.Model.extend({

    initialize: function () {
      this.computedFields = new Backbone.ComputedFields(this);
    },

    computed: {
      logoFA: {
        depends: ['name'],
        get: function (fields) {
          return currencyUtil.logoFA(fields.name);
        }
      },

      accountDescriptor: {
        depends: ['name'],
        get: function (fields) {
          return currencyUtil.accountDescriptor(fields.name);
        }
      },

      balanceFormatted: {
        depends: ['name', 'balance'],
        get: function (fields) {
          return currencyUtil.formatValue(fields.name, fields.balance);
        }
      }
    }
  });

  return AccountModel;
});
