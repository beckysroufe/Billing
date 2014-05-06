define(function (require) {
	var currencyUtil;

	currencyUtil = {

		formatValue: function (currency, value) {
			currency = currency.replace(/\s/g, '').toLowerCase();

			switch (currency) {
				case 'bitcoin':
					return value + ' BTC';
				case 'stripe':
					return '$' + parseFloat(Math.round(value * 100) / 100).toFixed(2);
				case 'apicoin':
					return value + ' API Coin';
				default:
					return value;
			}
		},

		accountDescriptor: function (currency) {
			currency = currency.replace(/\s/g, '').toLowerCase();

			switch (currency) {
				case 'bitcoin':
					return 'Address';
				case 'stripe':
					return 'Account';
				case 'apicoin':
					return 'Address';
				default:
					return 'fa-question';
			}
		},

		logoFA: function (currency) {
			currency = currency.replace(/\s/g, '').toLowerCase();

			switch (currency) {
				case 'bitcoin':
					return 'fa-bitcoin';
				case 'stripe':
					return 'fa-dollar';
				case 'apicoin':
					return 'fa-question';
				default:
					return 'fa-question';
			}
		}
	};

	return currencyUtil;
});
