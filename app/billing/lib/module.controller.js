define(function (require) {
  var Marionette = require('marionette'),
      Wreqr = require('backbone.wreqr'),
      appChannel = require('app.channel'),
      ModuleController;

  ModuleController = Marionette.Controller.extend({

    appChannel: null,
    moduleChannel: null,
    router: null,

    constructor: function (options) {
      if (this.routes) {
        this.router = new (Marionette.AppRouter.extend({
          appRoutes: this.routes,
          controller: this
        }))();
      }

      // can be used optionally without a module (only runs on app events)
      if (options.module) {
        this.moduleChannel = Wreqr.radio.channel(options.module.moduleName);
        this._initEvents(this.moduleEvents, this.moduleChannel);
      } else if (this.moduleEvents) {
        throw new Error('To use moduleEvents, please supply a module instance to options');
      }

      this._initEvents(this.appEvents, appChannel);
      this._initForwardEvents(this.forwardEvents);

      ModuleController.__super__.constructor.apply(this, arguments);
    },

    _initEvents: function (events, bus) {
      if (!events) return;
      var self = this;

      if (events.vent) {
        events.vent = Marionette.normalizeMethods.call(this, events.vent);
      }
      if (events.commands) {
        events.commands = Marionette.normalizeMethods.call(this, events.commands);
      }
      if (events.reqres){
        events.reqres = Marionette.normalizeMethods.call(this, events.reqres);
      }

      _.each(events.vent, function (handler, name) {
        bus.vent.on(name, _.bind(handler, self));
      });
      _.each(events.commands, function (handler, name) {
        bus.commands.setHandler(name, _.bind(handler, self));
      });
      _.each(events.reqres, function (handler, name) {
        return bus.reqres.setHandler(name, _.bind(handler, self));
      });
    },

    _initForwardEvents: function (events) {
      if (!events) return;
      var self = this;

      _.each(events.vent, function (name) {
        self.moduleChannel.vent.on(name, function () {
          appChannel.vent.trigger.apply(appChannel.vent, [name].concat(arguments));
        });
      });
      _.each(events.commands, function (name) {
        self.moduleChannel.commands.setHandler(name, function () {
          appChannel.commands.execute.apply(appChannel.commands, [name].concat(arguments));
        });
      });
      _.each(events.reqres, function (name) {
        self.moduleChannel.reqres.setHandler(name, function () {
          return appChannel.reqres.request.apply(appChannel.reqres, [name].concat(arguments));
        });
      });
    },

    _closeEvents: function (events, bus) {
      if (!events) return;

      _.each(events.vent, function (handler, name) {
        bus.vent.off(name, handler);
      });
      _.each(events.commands, function (handler, name) {
        bus.commands.removeHandler(name);
      });
      _.each(events.reqres, function (handler, name) {
        bus.reqres.removeHandler(name);
      });
    },

    onClose: function () {
      this._closeEvents(this.appEvents);
      this._closeEvents(this.moduleEvents);
    }
  });

  return ModuleController;
});
