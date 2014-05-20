define(function (require) {
  var menuListController = require('modules/menu/list/menu.list.controller'),
      ModuleController = require('lib/module.controller'),
      MenuController;

  MenuController = ModuleController.extend({

    appEvents: {
      vent: {
        'module:activated': 'setActiveItem'
      }
    },

    initialize: function () {
      menuListController.showMenu();
    },

    setActiveItem: function () {
      console.log('menu item ' + name + ' activated');
    }
  });

  return MenuController;
});
