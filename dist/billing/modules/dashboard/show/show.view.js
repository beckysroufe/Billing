define(function(require, exports, module) {
  var showTemplate = require('hgn!modules/dashboard/show/show');

  var ShowView = Backbone.Marionette.ItemView.extend({
    template: showTemplate
  });

  module.exports = ShowView;
});