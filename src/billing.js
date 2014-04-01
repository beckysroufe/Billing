define([ "marionette", "hgn!testTemplate" ],
function( Marionette ,  testTemplate      ) {

    Marionette.Renderer.render = function( template, data ) {
        return template( data );
    };

    var Billing = new Marionette.Application();

    Billing.addRegions({
        headerRegion: "#header-region",
        mainRegion: "#main-region",
        footerRegion: "#footer-region"
    });

    Billing.TestView = Marionette.ItemView.extend({
        template: testTemplate
    });

    Billing.on( "initialize:after", function () {
        var testView = new Billing.TestView();
        Billing.mainRegion.show( testView );
    });

    return Billing;
});