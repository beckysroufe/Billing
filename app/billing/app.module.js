define(function (require) {
  var Backbone = require('backbone'),
      AppContentLayout = require('app.content.layout'),
      appRadio = require('app.radio'),
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

    getCurrentRoute: function () {
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

      // showing a view in the contentRegion will destroy the appLayout
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

  appRadio.reqres.setHandler('get:current:route', API.getCurrentRoute);
  appRadio.commands.setHandler('navigate', API.navigate);
  appRadio.commands.setHandler('add:initializer', API.addInitializer);
  appRadio.commands.setHandler('show:in:header', API.showInHeader);
  appRadio.commands.setHandler('show:in:footer', API.showInFooter);
  appRadio.commands.setHandler('show:in:content', API.showInContent);
  appRadio.commands.setHandler('show:in:content:menu', API.showInContentMenu);
  appRadio.commands.setHandler('show:in:content:main', API.showInContentMain);

  // No export--event API
});
