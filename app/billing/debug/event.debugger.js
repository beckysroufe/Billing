define(function (require) {
  var appChannel = require('app.channel'),
      dashChannel = require('modules/dash/dash.channel'),
      channels;

  channels = {
    'app': appChannel,
    'dash': dashChannel
  };

  _.each(channels, function (channel, channelName) {
    channel.vent.trigger = _.wrap(
      channel.vent.trigger,
      function (fn) {
        var originalArgs = Array.prototype.splice.call(arguments, 1);
        console.log('[debug] ' + channelName + ' trigger', originalArgs);
        return fn.apply(channel.vent, originalArgs);
      });

    channel.reqres.request = _.wrap(
      channel.reqres.request,
      function (fn) {
        var originalArgs = Array.prototype.splice.call(arguments, 1);
        console.log('[debug] ' + channelName + ' request', originalArgs);
        return fn.apply(channel.reqres, originalArgs);
      });

    channel.commands.execute = _.wrap(
      channel.commands.execute,
      function (fn) {
        var originalArgs = Array.prototype.splice.call(arguments, 1);
        console.log('[debug] ' + channelName + ' execute', originalArgs);
        return fn.apply(channel.commands, originalArgs);
      });
  });
});
