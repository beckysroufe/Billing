define(function (require) {
  var Wreqr = require('backbone.wreqr'),
      dashBus = new Wreqr.Channel('dash');

  return dashBus;
});
