define(function (require) {
  var Backbone = require('backbone'),
      AppContentLayout = require('app.content.layout'),
      appBus = require('app.bus'),
      app = require('app'),
      appLayout,
      appLayoutShown = false,
      API;

  API = {
    addInitializer: function (init) {
      app.addInitializer(init);
    },

    navigate: function (route, options) {
      Backbone.history.navigate(route, options);
    },

    currentRoute: function () {
      return Backbone.history.fragment;
    },

    showInHeader: function (view) {
      app.headerRegion.show(view);
    },

    showInFooter: function (view) {
      app.footerRegion.show(view);
    },

    showInContent: function (view) {
      app.contentRegion.show(view);

      // showg a view in the contentRegion will destroy the appLayout
      appLayoutShown = false;
    },

    showInContentMenu: function (view) {
      // don't re-render the layout if currently visible
      if (!appLayoutShown) {
        appLayout = new AppContentLayout();

        appLayout.on('render', function () {
          appLayout.menuRegion.show(view);
        });

        app.contentRegion.show(appLayout);
      } else {
        appLayout.menuRegion.show(view);
      }

      appLayoutShown = true;
    },

    showInContentMain: function (view) {
      // don't re-render the layout if currently visible
      if (!appLayoutShown) {
        appLayout = new AppContentLayout();

        appLayout.on('render', function () {
          appLayout.mainRegion.show(view);
        });

        app.contentRegion.show(appLayout);
      } else {
        appLayout.mainRegion.show(view);
      }

      appLayoutShown = true;
    }
  };

  appBus.reqres.setHandler('route:current', API.currentRoute);
  appBus.commands.setHandler('navigate', API.navigate);
  appBus.commands.setHandler('initializer:add', API.addInitializer);
  appBus.commands.setHandler('region:header:showin', API.showInHeader);
  appBus.commands.setHandler('region:footer:showin', API.showInFooter);
  appBus.commands.setHandler('region:content:showin', API.showInContent);
  appBus.commands.setHandler('region:content-menu:showin', API.showInContentMenu);
  appBus.commands.setHandler('region:content-main:showin', API.showInContentMain);

  // No export--event API
});
