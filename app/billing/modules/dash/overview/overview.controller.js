define(function (require) {
  var Marionette      = require('marionette'),
      OverviewLayout  = require('modules/dash/overview/overview.layout'),
      AccountView     = require('modules/dash/overview/account/account.view'),
      ApiView         = require('modules/dash/overview/api/api.view'),
      ActionView      = require('modules/dash/overview/action/action.view'),   
      DashPanelView   = require('modules/dash/common/dash.panel.view'),
      dashChannel     = require('modules/dash/dash.channel'),   
      OverviewController;

  /**
   * Overviewboard top level controller
   * @constructor
   * @param {string} options.name Module name (displayed in main layout)
   */
  OverviewController = Marionette.Controller.extend({

    showOverview: function () {
      var fetchingApis = dashChannel.reqres.request('api:entities'),
          fetchingAccounts = dashChannel.reqres.request('account:entities'),
          dashLayout,
          accountsView,
          apisView;

      dashLayout = new OverviewLayout();

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

        dashChannel.commands.execute('region:content:showin', dashLayout);
      });
    },

    getActionView: function () {
      return new ActionView();
    }
  });

  return OverviewController;
});
