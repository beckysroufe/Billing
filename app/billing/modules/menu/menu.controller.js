define(function (require) {
  var MenuView = require('modules/menu/menu.view'),
      appRadio = require('app.radio'),
      menuController;

  menuController = {
    showMenu: function () {
      var menuView = new MenuView();
      appRadio.commands.execute('show:in:content:menu', menuView);
    }
  };

  return menuController;
});
