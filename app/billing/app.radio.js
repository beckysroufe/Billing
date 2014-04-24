define(function (require) {
  var Wreqr = require('backbone.wreqr'),
      appRadio = new Wreqr.Channel('app');

  return appRadio;
});
