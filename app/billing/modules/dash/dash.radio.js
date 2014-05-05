define(function (require) {
  var Wreqr = require('backbone.wreqr'),
      dashRadio = new Wreqr.Channel('dash');

  return dashRadio;
});
