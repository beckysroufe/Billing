define(function (require) {
  var appChannel = require('app.channel'),
      dashChannel = require('modules/dash/dash.channel');

  appChannel.vent.on('all', function () {
    console.log('vent', arguments);
  });

  appChannel.reqres.setHandler('all', function () {
    console.log('reqres', arguments);
  });

  appChannel.commands.setHandler('all', function () {
    console.log('commands', arguments);
  });
});
