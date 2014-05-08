define(function (require) {
  var Marionette = require('marionette'),
      appBus = require('app.bus'),
      ModuleController;

  ModuleController = Marionette.Controller.extend({

    moduleBus: null,
    router: null,

    initialize: function () {
      this.moduleBus = this.options.moduleBus;
      
      if (this.routes) {
        this.router = new (Marionette.AppRouter.extend({
          appRoutes: this.routes,
          controller: this
        }))();
      }

      this._initEvents(this.appEvents, appBus);
      this._initEvents(this.moduleEvents, this.moduleBus);
      this._initForwardEvents(this.forwardEvents);
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
        self.moduleBus.vent.on(name, function () {
          appBus.vent.trigger.apply(appBus.vent, [name].concat(arguments));
        });
      });
      _.each(events.commands, function (name) {
        self.moduleBus.commands.setHandler(name, function () {
          appBus.commands.execute.apply(appBus.commands, [name].concat(arguments));
        });
      });
      _.each(events.reqres, function (name) {
        self.moduleBus.reqres.setHandler(name, function () {
          return appBus.reqres.request.apply(appBus.reqres, [name].concat(arguments));
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
