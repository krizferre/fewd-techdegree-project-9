$(document).on('DOMContentLoaded', function() {

  const timeZones = moment.tz.names();
  let timeZoneFormatted = ``;
  let optionsHtml = `<option value="select-timezone">Select Timezone</option>`;
  
  $.each(timeZones, function(i, value) {
    timeZoneFormatted = `(GMT ${moment.tz(timeZones[i]).format('Z')}) ${timeZones[i]}`;
    optionsHtml += `
      <option value="${timeZones[i].toLowerCase()}">${timeZoneFormatted}</option>
    `;
  });
  $('#timezone').html(optionsHtml);

  // change font style based on selection
  $('#timezone').css('color','rgb(223,223,223)');
  $('#timezone').css('font-weight','300');
  $('#timezone').on('change', function() {
    const current = $('#timezone').val();
    
    if (current === 'select-timezone') {
      $('#timezone').css('color','rgb(223,223,223)');
      $('#timezone').css('font-weight','300');
    } else {
      $('#timezone').css('color','black');
      $('#timezone').css('font-weight','400');
    }
  }); // end if #timezone on change

}); // end of DOMContentLoaded