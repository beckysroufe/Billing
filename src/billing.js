define([ 'marionette', 'hgn!testTemplate' ],
function( Marionette ,  testTemplate      ) {

	var Billing = new Marionette.Application();

	Billing.addRegions({
		headerRegion: '#headerRegion',
		mainRegion: '#mainRegion',
		footerRegion: '#footerRegion'
	});

	Billing.TestView = new Marionette.ItemView.extend({
		template: testTemplate
	});

	Billing.Renderer.render = function( template, data ) {
		return template( data );
	};

	Billing.on( 'initialize:after', function () {
		var testView = new Billing.TestView();
		Billing.mainRegion.show( testView );
	});

})