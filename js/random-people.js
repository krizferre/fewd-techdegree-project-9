// these users will be used in the Search for User functionality
const users = [];

const url = "https://randomuser.me/api/";
const data = {
  results: 5,
  nat: 'us'
};

const success = function(response) {
  // for profile details
  const profileAvatar = response.results[0].picture.thumbnail;
  const profileFirst = response.results[0].name.first;
  const profileLast = response.results[0].name.last;

  $('.profile-wrapper img').attr('src', profileAvatar);
  $('.profile-name .first').text(profileFirst);
  $('.profile-name .last').text(profileLast);

  let liHtml = ``;
  $.each(response.results, function(i, item) {
    
    // these users will be used in the Search for User functionality
    users.push(`${item.name.first} ${item.name.last}`);

    // get details from index 1 onwards
    if (i) {

      // for New Members details
      const year = item.registered.date.slice(2, 4);
      const month = item.registered.date.slice(5, 7);
      const day = item.registered.date.slice(8, 10);
      const registered = `${month}/${day}/${year}`;

      liHtml += `
        <li>
          <img class="avatar" src="${item.picture.thumbnail}" alt="Member avatar">
          <div class="details">
            <div class="inner-wrapper">
              <p class="name">${item.name.first} ${item.name.last}</p>
              <a href="mailto:${item.email}" target="_top">${item.email}</a>
            </div>
            <p class="date">${registered}</p>
          </div>
        </li>`;
      
      // for Recent Activity details
      const activityItem = $('.recent-activity-wrapper li')[i-1];
      const img = $(activityItem).find('img')[0];
      const name = $(activityItem).find('.name')[0];

      $(img).attr('src', item.picture.thumbnail);
      $(name).text(`${item.name.first} ${item.name.last}`);
    }
  });

  $('.new-members-wrapper ul').html(liHtml);
} // end of success

$(document).on('DOMContentLoaded', function() {
  $.getJSON(url, data, success);
});