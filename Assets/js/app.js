const appid = '1181ccaa859f52c635fa081df8d1733c'
let cityArr = []
const searchInput = document.getElementById('searchInput')
const savedCities = document.getElementById('savedCities')
const currWeather = document.getElementById('currWeather')
const forecast = document.getElementById('forecast')
document.getElementById('search').addEventListener('click', () => {
  getUrl1()
})

// on search button click fetches data for dashboard and runs helper functions
function getUrl1() {
  event.preventDefault()
  //Current Weather - https://openweathermap.org/current#geocoding
  var requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value},USA&units=imperial&appid=${appid}`
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
      currCN(data.dt, data.name)
      setCiti()
    });
}
// retrieves data from an API
function getUrl2(lat, lon) {
  // current + 5day + UI - https://openweathermap.org/api/one-call-api
  var requestUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&unit=imperial&appid=${appid}`
  
  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataForecast) {
      // Use the console to examine the response
      console.log(dataForecast)
    });
}

//displays current city being searched name and date
function currCN(num, name) {
  const timestamp = num * 1000;
  const formatted = moment(timestamp).format('(M/DD/YYYY)');
  document.getElementById('cityName').innerHTML = name + ' ' + formatted
}

//sets the new search item to local storage and displays it
function setCiti() {
  cityArr.includes(searchInput.value) ? null : cityArr.push(searchInput.value)
  let store = JSON.stringify(cityArr)
  localStorage.setItem('cities', store)
  searchInput.value = ''
  savedCities.innerHTML = JSON.parse(localStorage.getItem('cities'))
}
//gets the lists of searched cities from local storage and displays them
const getCities = (() => {
  if (!localStorage.cities) {
    let store = JSON.stringify(cityArr)
    localStorage.setItem('cities', store)
  } else {
    cityArr = (JSON.parse(localStorage.getItem('cities')))
    savedCities.innerHTML = JSON.parse(localStorage.getItem('cities'))
  }
})()
//current time to populate