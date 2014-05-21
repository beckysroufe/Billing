define(function (require) {
  var Marionette = require('marionette'),
      Module;

  Module = Marionette.Module.extend({
    startWithParent: false,
    controller: null,

    onStart: function () {
      this.controller = new this.moduleControllerClass({
        module: this
      });
    },

    onStop: function () {
      this.controller.close();
      this.controller = null;
    }
  });

  return Module;
});
