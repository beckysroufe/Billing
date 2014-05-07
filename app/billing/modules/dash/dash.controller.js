define(function (require) {
  var Marionette = require('marionette'),
      DashLayout = require('modules/dash/dash.layout'),
      DashPanelView = require('modules/dash/common/dash.panel.view'),
      AccountView = require('modules/dash/accounts/dash.account.view'),
      ApiView = require('modules/dash/apis/dash.api.view'),
      dashBus = require('modules/dash/dash.bus'),   
      ActionView = require('modules/dash/action/dash.action.view'),   
      ShowController;

  /**
   * Dashboard top level controller
   * @constructor
   * @param {string} options.name Module name (displayed in main layout)
   */
  ShowController = Marionette.Controller.extend({

    showDashboard: function () {
      var fetchingApis = dashBus.reqres.request('api:entities'),
          fetchingAccounts = dashBus.reqres.request('account:entities'),
          dashLayout,
          accountsView,
          apisView;

      dashLayout = new DashLayout();

      $.when(fetchingApis, fetchingAccounts).done(function (apis, accounts) {

        apisView = new DashPanelView({
          itemView: ApiView,
          collection: apis,
          title: 'APIs',
          action: {
            href: '#testApiHref',
            label: 'API Action',
            trigger: 'api:action:test'
          }
        });

        accountsView = new DashPanelView({
          itemView: AccountView,
          collection: accounts,
          title: 'Accounts',
          action: {
            href: '#testAccountHref',
            label: 'Account Action',
            trigger: 'account:action:test'
          }
        });

        dashLayout.on('render', function () {
          dashLayout.apisRegion.show(apisView);
          dashLayout.accountsRegion.show(accountsView);
        });

        dashBus.commands.execute('region:content:showin', dashLayout);
      });
    },

    actionView: function () {
      return new ActionView();
    }
  });

  return ShowController;
});
