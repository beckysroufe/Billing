define(function (require) {
  var MenuView = require('modules/menu/list/menu.list.view'),
      appChannel = require('app.channel'),
      menuController;

  menuController = {
    showMenu: function () {
      var menuView = new MenuView();
      appChannel.commands.execute('region:content-menu:showin', menuView);
    }
  };

  return menuController;
});
