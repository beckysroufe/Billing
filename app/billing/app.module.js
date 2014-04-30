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

    showHeader: function (view) {
      app.headerRegion.show(view);
    },

    showFooter: function (view) {
      app.footerRegion.show(view);
    },

    showContent: function (view) {
      app.contentRegion.show(view);

      // showg a view in the contentRegion will destroy the appLayout
      appLayoutShown = false;
    },

    showContentMenu: function (view) {
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

    showContentMain: function (view) {
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
  appRadio.commands.setHandler('show:header', API.showHeader);
  appRadio.commands.setHandler('show:footer', API.showFooter);
  appRadio.commands.setHandler('show:content', API.showContent);
  appRadio.commands.setHandler('show:content:menu', API.showContentMenu);
  appRadio.commands.setHandler('show:content:main', API.showContentMain);

  // No export--event API
});
