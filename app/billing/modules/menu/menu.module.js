define(function (require) {
  var appRadio = require('app.radio'),
      menuController = require('modules/menu/menu.controller'),
      API;

  API = {
    showMenu: function () {
      menuController.showMenu();
    },

    setActiveItem: function (name) {
      console.log('menu item ' + name + ' activated');
    }
  };

  appRadio.vent.on('module:activated', API.setActiveItem);

  // TODO: show menu automatically as needed but not if already showing,
  // because the menu will be closed when switching to static pages
  // (entire content area will be swapped out)
  appRadio.commands.execute('add:initializer', API.showMenu);

  // No export--event API only
});
