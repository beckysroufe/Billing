define(function (require) {
  var MenuView = require('modules/menu/menu.view'),
      appBus = require('app.bus'),
      menuController;

  menuController = {
    showMenu: function () {
      var menuView = new MenuView();
      appBus.commands.execute('region:content-menu:showin', menuView);
    }
  };

  return menuController;
});
