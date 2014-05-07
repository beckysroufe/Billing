define(function (require) {
  var Wreqr = require('backbone.wreqr'),
      appBus = new Wreqr.Channel('app');

  return appBus;
});
