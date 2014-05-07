define(function (require) {
  var appBus = require('app.bus'),
      menuController = require('modules/menu/menu.controller'),
      API;

  API = {
    showMenu: function () {
      menuController.showMenu();
    },

    // TODO: show menu automatically as needed but not if already showing,
    // because the menu will be closed when switching to static pages
    // (entire content area will be swapped out)
    setActiveItem: function (name) {
      console.log('menu item ' + name + ' activated');
    }
  };

  appBus.vent.on('module:activated', API.setActiveItem);

  appBus.commands.execute('initializer:add', API.showMenu);

  // No export--event API only
});
