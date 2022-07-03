const appid = '1181ccaa859f52c635fa081df8d1733c'
let saveCitiArr = []
const searchInput = document.getElementById('searchInput')
const savedCities = document.getElementById('savedCities')
const currWeather = document.getElementById('currWeather')
const forecast = document.getElementById('forecast')
document.getElementById('search').addEventListener('click', () => {
  getUrl1()
})

function getUrl1() {
  event.preventDefault()
  //Current Weather - https://openweathermap.org/current#geocoding
  var requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&appid=${appid}`
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
      convertDT(data.dt)
      saveCiti()
    });
}

function getUrl2(lat, lon) {
  // current + 5day + UI - https://openweathermap.org/api/one-call-api
  var requestUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&unit=imperial&appid=${appid}`
  //console.log(requestUrl2)
  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      console.log(data)
      console.log(searchInput.value)
    });
}

function convertDT(num) {
  const timestamp = num * 1000;
  const formatted = moment(timestamp).format('L');
  //console.log(formatted); // "02/24/2018"  
}

function saveCiti() {
  saveCitiArr.push(searchInput.value)
  let store = JSON.stringify(saveCitiArr)
  localStorage.setItem('cities', store)
  console.log(localStorage)
}

const getCities = (() => {

  
 saveCitiArr.push(JSON.parse(localStorage.getItem('cities')))
  savedCities.innerHTML += JSON.parse(localStorage.getItem('cities'))
  console.log(localStorage)
})()


