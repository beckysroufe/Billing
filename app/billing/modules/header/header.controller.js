define(function (require) {
  var headerShowController = require('modules/header/show/header.show.controller'),
      ModuleController = require('lib/module.controller'),
      HeaderController;

  HeaderController = ModuleController.extend({

    initialize: function () {
      headerShowController.showHeader();
    }
  });

  return HeaderController;
});
