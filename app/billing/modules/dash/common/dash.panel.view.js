define(function (require) {
	var Marionette = require('marionette'),
			template = require('hgn!modules/dash/common/dash.panel.view'),
			dashBus = require('modules/dash/dash.bus'),
			DashPanelView;

  /**
   * Reusable composite view for dash panels
   * @constructor
   * @param {function(new:Marionette.ItemView)} options.itemView A Marionette ItemView class
   * @param {Object} options.action { href: <string>, label: <string>, trigger: <event string> }
   * @param {string} options.title
   */
	DashPanelView = Marionette.CompositeView.extend({

	  template: template,
	  itemViewContainer: '.js-dash-panel-contents',

	  events: {
	  	'click .js-dash-panel-action': 'actionClicked'
	  },

	  actionClicked: function (evt) {
	  	evt.preventDefault();
	  	dashBus.vent.trigger(this.options.action.trigger);
	  },

	  serializeData: function () {
	  	return {
	  		title: this.options.title,
	  		action: this.options.action
	  	};
	  }
	});

	return DashPanelView;
});
