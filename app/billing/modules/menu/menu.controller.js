define(function (require) {
  var MenuView = require('modules/menu/menu.view'),
      appRadio = require('app.radio'),
      menuController;

  menuController = {
    showMenu: function () {
      var menuView = new MenuView();
      appRadio.commands.execute('region:content-menu:showin', menuView);
    }
  };

  return menuController;
});
