// IE Polyfill for Modal Transitions
$('#demo').collapse({
  toggle: true
});

// Datepicker
jQuery(function($){
    $('.pick-date').datepicker({
      changeDate: true
    })
});

// Make Recurring
$('.make-recurring').on("click", function() {
    if ($(this).prop("checked")) {
        $('.recurring-settings').fadeIn(100);
    }
    else {
        $('.recurring-settings').fadeOut(100);
    }
});

// Settings Detail
