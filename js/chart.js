//ammount create acount -linechart
const labelsCreateAccount = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const dataCreateAccount = {
    labels: labelsCreateAccount,
    datasets: [{
        label: 'amount creating account',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45, 10, 5, 2, 20, 30],
    }]
};
const configCreateAccount = {
    type: 'line',
    data: dataCreateAccount,
    options: {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16
                    }
                }
            }
        }
    }
};
const ChartCA = new Chart(
    document.getElementById('create-account'),
    configCreateAccount
);

//chart block/unblock - doughnutchart
const dataBUAccount = {
    labels: [
      'Block',
      'Unblock'
    ],
    datasets: [{
      label: 'Block/Unblock ratio',
      data: [300, 50],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
};
const configBUAccount = {
    type: 'doughnut',
    data: dataBUAccount,
};
const ChartBUAccount = new Chart(
    document.getElementById('B__U-Account'),
    configBUAccount
);

//genre movie - Pie Charts
const dataGM = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
};
const configGM = {
    type: 'pie',
    data: dataGM,
};
const ChartGM = new Chart(
    document.getElementById('genre-movie'),
    configGM
);

//movie has most view per week - barchart
const labelsMV = ['1', '2', '3', '4', '5', '6', '7'];
const dataMV = {
  labels: labelsMV,
  datasets: [{
    axis: 'y',
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};
const configMV = {
    type: 'bar',
    data: dataMV,
    options: {
      indexAxis: 'y',
    }
};
const ChartMV = new Chart(
    document.getElementById('movie-viewer'),
    configMV
);

//Statistic money each week - line chart
const labelsSM = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const dataSM = {
  labels: labelsSM,
  datasets: [
    {
      label: 'money',
      data: [0, 10, 5, 2, 20, 30, 45, 10, 5, 2, 20, 30],
      borderColor: 'red',
      backgroundColor: 'red',
      stack: 'combined',
      type: 'bar'
    },
    {
      label: 'Line chart',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: 'blue',
      backgroundColor: 'blue',
      stack: 'combined'
    }
  ]
};
const configSM = {
    type: 'line',
    data: dataSM,
    options: {
      plugins: {
        title: {
          display: false,
          text: 'Chart.js Stacked Line/Bar Chart'
        }
      },
      scales: {
        y: {
          stacked: true
        }
      }
    },
  };
const ChartSM = new Chart(
    document.getElementById('statistic-money'),
    configSM
);