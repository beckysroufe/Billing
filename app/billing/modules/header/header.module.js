define(function (require) {
  var appRadio = require('app.radio'),
      headerController = require('modules/header/header.controller'),
      API;

  API = {
    showHeader: function () {
      headerController.showHeader();
    },

    setActiveItem: function (name) {
      console.log('header item ' + name + ' activated');
    }
  };

  appRadio.vent.on('module:activated', API.setActiveItem);
  appRadio.commands.execute('add:initializer', API.showHeader);

  // No export--event API only
});
