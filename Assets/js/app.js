const appid = '1181ccaa859f52c635fa081df8d1733c'
//Current Weather
//var requestUrl3 = 'https://api.openweathermap.org/data/2.5/weather?q=New York&appid=' + appid // https://openweathermap.org/current#geocoding

// 5 day
//var requestUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q=New York&appid=" + appid //https://openweathermap.org/forecast5

const timestamp = 1519482900000;
const formatted = moment(timestamp).format('L');
console.log(formatted); // "02/24/2018"

//Current Weather
var requestUrl2 = 'https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&units=imperial&appid=' + appid // https://openweathermap.org/current#geocoding

// 5 day
var requestUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q=mobile&appid=" + appid //https://openweathermap.org/forecast5



function getUrl1() {
  //console.log(requestUrl)

  fetch(requestUrl1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);
      // TODO: Loop through the data and generate your HTML AND/OR other functions
    });
}

function getUrl2() {
  //console.log(requestUrl)

  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);
      // TODO: Loop through the data and generate your HTML AND/OR other functions
    });
}

function getUrl3() {
  //console.log(requestUrl)

  fetch(requestUrl3)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);
      // TODO: Loop through the data and generate your HTML AND/OR other functions
    });
}

document.getElementById('url1').addEventListener('click', getUrl1)
document.getElementById('url2').addEventListener('click', getUrl2)
document.getElementById('url3').addEventListener('click', getUrl3)