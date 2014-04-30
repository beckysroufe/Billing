define(function (require) {
	var Marionette = require('marionette'),
			template = require('hgn!modules/dash/common/dash.panel.view'),
			dashRadio = require('modules/dash/dash.radio'),
			DashPanelView;

  /**
   * Reusable composite view for dash panels
   * @constructor
   * @param {function(new:Marionette.ItemView)} options.itemView A Marionette ItemView class
   * @param {Object} options.action { href: <string>, label: <string>, event: <event string> }
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
	  	dashRadio.vent.trigger(this.options.action.event);
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