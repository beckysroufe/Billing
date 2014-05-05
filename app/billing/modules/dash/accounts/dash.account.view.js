define(function (require) {
  var Marionette = require('marionette'),
      template = require('hgn!modules/dash/accounts/dash.account.view'),
      AccountView;

  AccountView = Marionette.ItemView.extend({
    template: template
  });

  return AccountView;
});
