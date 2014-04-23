// IE Polyfill for Modal Transitions
var polyfilter_scriptpath = '/js/';

// Modal
$("#myModal").modal({
  show: false
});

// Alerts
$(".alert").alert();

// Tooltip
$("[data-toggle='tooltip']").tooltip();

// Dropdown
$('.dropdown-toggle').dropdown();

// Collapse
$('#demo').collapse({
  toggle: true
});

// Datepicker
jQuery(function($){
    $('.pick-date').datepicker({
      changeDate: true
    })
});

// Tabs
/* $('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
  $('#myTab a:first').tab('show')
}) */
