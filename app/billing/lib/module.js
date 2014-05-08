define(function (require) {
  var Marionette = require('marionette'),
      Module;

  Module = Marionette.Module.extend({
    startWithParent: false,
    controller: null,
    moduleBus: null,

    onStart: function () {
      if (!this.moduleBus) throw new Error('Must supply moduleBus');
      this.controller = new this.ModuleController({
        moduleBus: this.moduleBus
      });
    },

    onStop: function () {
      this.controller.close();
      this.controller = null;
    }
  });

  return Module;
});
