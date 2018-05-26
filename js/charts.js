// custom traffic data
const hourlyTraffic = {
  'labels' : [
              "0", "1", "2", "3", "4", "5", 
              "6", "7", "8", "9", "10", "11",
              // "12", "13", "14", "15", "16", "17", 
              // "18", "19", "20", "21", "22", "23"
            ],
  'data' : [
              4, 7, 6, 9, 12, 9, 
              10, 7, 10, 13, 10, 13,      
              // 4, 7, 6, 9, 12, 9, 
              // 10, 7, 10, 13, 10, 13      
            ]
};

const dailyTraffic = {
  'labels' : [
              "S", "M", "T", "W", "T", "F", "S"
            ],
  'data' : [
              107, 179, 143, 214, 286, 214, 250, 
            ]
};

const weeklyTraffic = {
  'labels' : [
              "16-22", "23-29", "30-5", "6-12", "13-19", 
              "20-26", "27-3", "4-10", "11-17", "18-24", 
              "25-31"
            ],
  'data' : [
              750, 1250, 1000, 1500, 2000, 1500, 
              1750, 1250, 1750, 2250, 1750, 2250      
            ]
};

const monthlyTraffic = {
  'labels' : [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
  'data' : [
              3000, 5000, 4000, 6000, 8000, 6000, 
              7000, 5000, 7000, 9000, 7000, 9000      
            ]
};
// end of custom traffic data

const createLineChart = function(labelsParm, dataParm) {
  const trafficChartObj = new Chart(trafficChart, {
    type: 'line',
    data: {
      labels: labelsParm,
      datasets: [{
        data: dataParm,
        backgroundColor: [
          'rgba(226, 227, 246, 0.6)'
        ],
        borderColor: [
          'rgba(169, 172, 229, 1)'
        ],
        borderWidth: 1,
        pointRadius: 5,
        pointBackgroundColor: 'white',
        pointBorderWidth: 2,
        pointBorderColor: 'rgb(142, 146, 207)',
        lineTension: 0
      }]
    }
    ,
    options: {
      legend: {
        display: false
      }
    }
  });
} // end of createLineChart

const addEvents = function() {

  $('.traffic-link-wrapper > li').on('click', function(event) {
    const clicked = $(event.target).text();
    let newData;
    let newLabels;

    if (clicked === prevClicked) {
      return;
    }

    $('.traffic-link-wrapper > li').removeClass('clicked');
    $(event.target).addClass('clicked');

    if (clicked === 'Hourly') {
      newLabels = hourlyTraffic['labels'];
      newData = hourlyTraffic['data'];

    } else if (clicked === 'Daily') {
      newLabels = dailyTraffic['labels'];
      newData = dailyTraffic['data'];

    } else if (clicked === 'Weekly') {
      newLabels = weeklyTraffic['labels'];
      newData = weeklyTraffic['data'];

    } else if (clicked === 'Monthly') {
      newLabels = monthlyTraffic['labels'];
      newData = monthlyTraffic['data'];
    }

    prevClicked = clicked;

    createLineChart(newLabels, newData);
  });

}; // end of addEvents

const trafficChart = $('#traffic-chart');
const dailyTrafficChart = $('#daily-traffic-chart');
const mobileUsersChart = $('#mobile-users-chart');
let prevClicked = ``;

$(document).on('DOMContentLoaded', function() {

  // Weekly Traffic Line Chart
  prevClicked = `Weekly`;
  $('.traffic-link-wrapper > li:nth-of-type(3)').addClass('clicked');
  createLineChart(weeklyTraffic['labels'], weeklyTraffic['data']);
  // End of Weekly Traffic Line Chart

  // Daily Traffic Bar Chart
  const dailyTrafficChartObj = new Chart(dailyTrafficChart, {
    // type: 'bar',
    type: 'roundedBar',
    data: {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [{
        data: [75, 100, 175, 125, 225, 200, 100],
        backgroundColor: [
          'rgba(115, 119, 191, 1.0)',
          'rgba(115, 119, 191, 1.0)',
          'rgba(115, 119, 191, 1.0)',
          'rgba(115, 119, 191, 1.0)',
          'rgba(115, 119, 191, 1.0)',
          'rgba(115, 119, 191, 1.0)',
          'rgba(115, 119, 191, 1.0)'
        ],
      }]
    }
    ,
    options: {
      legend: {
        display: false
      },
      barRoundness: .3,
    }
  });  
  // End of Daily Traffic Bar Chart
  
  // Mobile Users Doughnut Chart
  const mobileUsersChartObj = new Chart(mobileUsersChart, {
    type: 'doughnut',
    data: {
      labels: ["Phones", "Tablets", "Desktop"],
      datasets: [{
        data: [13, 17, 70],
        backgroundColor: [
          'rgba(116, 177, 191, 1.0)',
          'rgba(129, 201, 143, 1.0)',
          'rgba(115, 119, 191, 1.0)'
        ],
        borderWidth: 0
      }]
    }
    ,
    options: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          // usePointStyle: true
        }
      }
    }
  });
  // End of Mobile Users Doughnut Chart

  addEvents();
});


/*
* =========================================================================
* Code below helps to created rounded corners on top of bars of a bar chart
* =========================================================================
*/

// draws a rectangle with a rounded top
Chart.helpers.drawRoundedTopRectangle = function(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  // top right corner
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  // bottom right   corner
  ctx.lineTo(x + width, y + height);
  // bottom left corner
  ctx.lineTo(x, y + height);
  // top left   
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

Chart.elements.RoundedTopRectangle = Chart.elements.Rectangle.extend({
  draw: function() {
    var ctx = this._chart.ctx;
    var vm = this._view;
    var left, right, top, bottom, signX, signY, borderSkipped;
    var borderWidth = vm.borderWidth;

    if (!vm.horizontal) {
      // bar
      left = vm.x - vm.width / 2;
      right = vm.x + vm.width / 2;
      top = vm.y;
      bottom = vm.base;
      signX = 1;
      signY = bottom > top? 1: -1;
      borderSkipped = vm.borderSkipped || 'bottom';
    } else {
      // horizontal bar
      left = vm.base;
      right = vm.x;
      top = vm.y - vm.height / 2;
      bottom = vm.y + vm.height / 2;
      signX = right > left? 1: -1;
      signY = 1;
      borderSkipped = vm.borderSkipped || 'left';
    }

    // Canvas doesn't allow us to stroke inside the width so we can
    // adjust the sizes to fit if we're setting a stroke on the line
    if (borderWidth) {
      // borderWidth shold be less than bar width and bar height.
      var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
      borderWidth = borderWidth > barSize? barSize: borderWidth;
      var halfStroke = borderWidth / 2;
      // Adjust borderWidth when bar top position is near vm.base(zero).
      var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
      var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
      var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
      var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
      // not become a vertical line?
      if (borderLeft !== borderRight) {
        top = borderTop;
        bottom = borderBottom;
      }
      // not become a horizontal line?
      if (borderTop !== borderBottom) {
        left = borderLeft;
        right = borderRight;
      }
    }

    // calculate the bar width and roundess
    var barWidth = Math.abs(left - right);
    var roundness = this._chart.config.options.barRoundness || 0.5;
    var radius = barWidth * roundness * 0.5;

    // keep track of the original top of the bar
    var prevTop = top;

    // move the top down so there is room to draw the rounded top
    top = prevTop + radius;
    var barRadius = top - prevTop;

    ctx.beginPath();
    ctx.fillStyle = vm.backgroundColor;
    ctx.strokeStyle = vm.borderColor;
    ctx.lineWidth = borderWidth;

    // draw the rounded top rectangle
    Chart.helpers.drawRoundedTopRectangle(ctx, left, (top - barRadius + 1), barWidth, bottom - prevTop, barRadius);

    ctx.fill();
    if (borderWidth) {
      ctx.stroke();
    }

    // restore the original top value so tooltips and scales still work
    top = prevTop;
  },
});

Chart.defaults.roundedBar = Chart.helpers.clone(Chart.defaults.bar);

Chart.controllers.roundedBar = Chart.controllers.bar.extend({
  dataElementType: Chart.elements.RoundedTopRectangle
});
