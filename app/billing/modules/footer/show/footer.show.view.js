define(function (require) {
  var Marionette = require('marionette'),
      showTemplate = require('hgn!modules/footer/show/footer.show.view'),
      ShowView;

  ShowView = Marionette.ItemView.extend({
    template: showTemplate
  });

  return ShowView;
});
