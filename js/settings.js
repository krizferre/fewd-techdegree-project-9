
const setDataFromLocalStorage = function() {
  const sendEmail = localStorage.getItem('send-email');
  const setProfile = localStorage.getItem('set-profile');
  const timezoneSettings = localStorage.getItem('timezone');

  if (sendEmail !== null) {
    $('#send-email')[0].checked = (sendEmail === 'true');
  }

  if (setProfile !== null) {
    $('#set-profile')[0].checked = (setProfile === 'true');
  }

  if (timezoneSettings !== null) {
    $('#timezone').val(timezoneSettings);

    if (timezoneSettings === 'select-timezone') {
      $('#timezone').css('color','rgb(223,223,223)');
      $('#timezone').css('font-weight','300');
    } else {
      $('#timezone').css('color','black');
      $('#timezone').css('font-weight','400');
    }
  }
}

$(document).on('DOMContentLoaded', function() {

  $('#save').on('click', function() {
    localStorage.setItem('send-email', $('#send-email')[0].checked);
    localStorage.setItem('set-profile', $('#set-profile')[0].checked);
    localStorage.setItem('timezone', $('#timezone').val());
    alert('Settings successfully saved!');
  });

  $('#cancel').on('click', function() {
    const cancel = confirm('Are you sure to cancel any changes?');

    if (cancel) {
      setDataFromLocalStorage();
    }
  });

  setDataFromLocalStorage();
});