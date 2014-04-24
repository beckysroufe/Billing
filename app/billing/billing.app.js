define(function(require) {
  var billingRadio = require('billing.radio');

  var billingApp = new Backbone.Marionette.Application(),
      index = 'dashboard',
      getCurrentRoute = function() {
        return Backbone.history.fragment;
      }

  // Override templating method to use hgn templates
  Backbone.Marionette.Renderer.render = function(template, data) {
    return template(data);
  };

  // App regions found in index.html
  billingApp.addRegions({
    headerRegion: '#header-region',
    menuRegion: '#menu-region',
    mainRegion: '#main-region',
    footerRegion: '#footer-region'
  });

  // Event API eliminates need for references to app directly
  billingRadio.reqres.setHandler('billing:current:route', function() {
    return getCurrentRoute();
  });
  billingRadio.commands.setHandler('billing:add:initializer', function(init) {
    billingApp.addInitializer(init);
  });
  billingRadio.commands.setHandler('billing:navigate', function(route, options) {
    Backbone.history.navigate(route, options);
  });
  billingRadio.commands.setHandler('billing:show:main', function(view) {
    billingApp.mainRegion.show(view);
  });

  billingApp.on('initialize:after', function() {
    if (Backbone.history) {
      Backbone.history.start();

      if (getCurrentRoute() === '') {
        billingRadio.vent.trigger('dashboard:show');
      }
    }
  });

  return billingApp;
});
