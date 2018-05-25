$(document).on('DOMContentLoaded', function() {

  // when the user clicks on the button,
  // toggle between hiding and showing the dropdown content
  $('.bell').on('click', function() {
    $('.notif-content').toggleClass('notif-content-show');
    $('.bell').toggleClass('special');
    $('.bell-logo circle').hide();
  });

  // close the dropdown if the user clicks outside of it
  $(window).on('click', function(e) {

    if (!e.target.matches('.bell') && !e.target.matches('.bell-logo')) {

      if ($('.notif-content').hasClass('notif-content-show')) {
        $('.notif-content').removeClass('notif-content-show');
      }

      if ($('.bell').hasClass('special')) {
        $('.bell').removeClass('special');
      }

      if ($('.bell').hasClass('special')) {
        $('.bell').removeClass('special');
      }
    }

  });

}); // end of DOMContentLoaded