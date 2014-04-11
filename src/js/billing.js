define(function(require) {
  var Marionette = require('marionette'),
      testTemplate = require('hgn!testTemplate'),
      Billing = new Marionette.Application();

  Marionette.Renderer.render = function( template, data ) {
    return template( data );
  };

  Billing.addRegions({
    headerRegion: '#header-region',
    mainRegion: '#main-region',
    footerRegion: '#footer-region'
  });

  Billing.TestView = Marionette.ItemView.extend({
    template: testTemplate
  });

  Billing.on('initialize:after', function() {
    var testView = new Billing.TestView();
    Billing.mainRegion.show(testView);
  });

  return Billing;
});
