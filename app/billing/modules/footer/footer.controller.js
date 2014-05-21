define(function (require) {
  var footerShowController = require('modules/footer/show/footer.show.controller'),
      ModuleController = require('lib/module.controller'),
      FooterController;

  FooterController = ModuleController.extend({

    initialize: function () {
      footerShowController.showFooter();
    }
  });

  return FooterController;
});
