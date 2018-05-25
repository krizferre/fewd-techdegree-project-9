
const checkErrors = function() {
  let hasErrors = false;
  const search = $('#search-user')[0];
  const message = $('#message-user')[0];
  const h4 = $('.message-user-wrapper h4');
  const p = $('.message-user-wrapper h4 p');
  const error =
    `<p style="color:red;font-size:.8rem;font-style:italic;">
      * Both fields are required.
    </p>`;

  $(p).remove();

  if ($(search).val().trim() === '') {
    $(search).css('border-color', 'red');
    hasErrors = true;
  } else {
    $(search).css('border-color', 'rgb(223,223,223)');
  }

  if ($(message).val().trim() === '') {
    $(message).css('border-color', 'red');
    hasErrors = true;
  } else {
    $(message).css('border-color', 'rgb(223,223,223)');
  }

  if (hasErrors) {
    $(h4).append(error);
  }

  return hasErrors;
}

$(document).on('DOMContentLoaded', function() {
  
  $('form').on('submit', function(event) {
    event.preventDefault();

    if (!checkErrors()) {
      alert('Message successfully sent to user!');
    }
  });

});