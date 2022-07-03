const appid = '1181ccaa859f52c635fa081df8d1733c'
//Current Weather
//var requestUrl3 = 'https://api.openweathermap.org/data/2.5/weather?q=New York&appid=' + appid // https://openweathermap.org/current#geocoding

// 5 day
//var requestUrl1 = "https://api.openweathermap.org/data/2.5/forecast?q=New York&appid=" + appid //https://openweathermap.org/forecast5

//current + 5day + UI
//var requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=34.0522&lon=-118.2437&exclude={part}&unit=imperial&appid='+ appid // https://openweathermap.org/api/one-call-api

const timestamp = 1656874800 * 1000;
const formatted = moment(timestamp).format('L');
console.log(formatted); // "02/24/2018"

//Current Weather
//var requestUrl1 = 'https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&units=imperial&appid=' + appid // https://openweathermap.org/current#geocoding

//current + 5day + UI
var requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=34.0522&lon=-118.2437&exclude={part}&unit=imperial&appid=' + appid // https://openweathermap.org/api/one-call-api //need to exclude some parameters


// 5 day
var requestUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q=mobile&units=imperial&appid=" + appid //https://openweathermap.org/forecast5


function getUrl1() {
  var requestUrl1 = 'https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&units=imperial&appid=' + appid
  //console.log(requestUrl)

  fetch(requestUrl1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);
      // TODO: Loop through the data and generate your HTML AND/OR other functions
      getUrl2(data.coord.lat, data.coord.lon)
    });
}
var lat=34.0522, lon=-118.2437
function getUrl2(lat, lon) {
  var requestUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&unit=imperial&appid=${appid}`
  //console.log(requestUrl2)
  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      // Use the console to examine the response
      console.log(data)
    });
}

document.getElementById('url1').addEventListener('click', getUrl1)
document.getElementById('url2').addEventListener('click', getUrl2)
//document.getElementById('url3').addEventListener('click', getUrl3)

/*function getUrl2() {
  //console.log(requestUrl)

  fetch(requestUrl1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data)
      console.log(data.lat,data.lon);
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


*/