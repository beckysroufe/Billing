define(function (require) {
  var appRadio = require('app.radio'),
      footerController = require('modules/footer/footer.controller'),
      API;

  API = {
    showFooter: function () {
      footerController.showFooter();
    },

    setActiveItem: function (name) {
      console.log('footer item ' + name + ' activated');
    }
  };

  appRadio.vent.on('module:activated', API.setActiveItem);
  appRadio.commands.execute('add:initializer', API.showFooter);

  // No export--event API only
});
