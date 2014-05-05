define(function (require) {
  var Marionette = require('marionette'),
      MainLayout = require('common/main.layout'),
      DashLayout = require('modules/dash/dash.layout'),
      DashPanelView = require('modules/dash/common/dash.panel.view'),
      AccountView = require('modules/dash/accounts/account.view'),
      ApiView = require('modules/dash/apis/api.view'),
      dashRadio = require('modules/dash/dash.radio'),      
      ShowController;

  /**
   * Dashboard top level controller
   * @constructor
   * @param {string} options.name Module name (displayed in main layout)
   */
  ShowController = Marionette.Controller.extend({
    showDashboard: function () {
      var mainLayout,
          dashLayout,
          accountsView,
          apisView;

      mainLayout = new MainLayout({ title: this.options.name });
      dashLayout = new DashLayout();

      accountsView = new DashPanelView({
        itemView: AccountView,
        title: 'Accounts',
        action: {
          href: '#testAccountHref',
          label: 'Account Action',
          event: 'test:account:action'
        }
      });

      apisView = new DashPanelView({
        itemView: ApiView,
        title: 'APIs',
        action: {
          href: '#testApiHref',
          label: 'API Action',
          event: 'test:api:action'
        }
      });

      mainLayout.on('render', function () {
        mainLayout.contentRegion.show(dashLayout);
      });

      dashLayout.on('render', function () {
        dashLayout.apisRegion.show(apisView);
        dashLayout.accountsRegion.show(accountsView);
      });

      dashRadio.commands.execute('show:main', mainLayout);
    }
  });

  return ShowController;
});
