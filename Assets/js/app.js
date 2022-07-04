const appid = 'c8eba1bdd27115a572cf54b8b1311b5c'
let cityArr = ['']
const searchInput = document.getElementById('searchInput')
const savedCities = document.getElementById('savedCities')
const currWeather = document.getElementById('currWeather')
const forecast = document.getElementById('forecast')
document.getElementById('search').addEventListener('click', () => {
  event.preventDefault()
  let searchField = searchInput.value
  !searchInput.value ? searchField = cityArr[cityArr.length - 1] : searchField = searchInput.value
  getUrl1(searchField)
})

function getUrl1(searchVal) {
  //event.preventDefault()
  //Current Weather - https://openweathermap.org/current#geocoding
  const requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal},USA&units=imperial&appid=${appid}`
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
  var requestUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${appid}`

  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataF) {
      // Use the console to examine the response
      console.log(dataF)
      currentWeather(dataF.current.temp, dataF.current.humidity, dataF.current.wind_speed, dataF.current.uvi)
      let arr = dataF.daily
      //let weather = arr.weather[0]
      console.log(arr)
      fiveDay(arr, arr.dt, arr.weather, arr.temp, arr.humidity)
    });
}

// displays current city name/date
function currCN(num, name) {
  const timestamp = num * 1000;
  const formatted = moment(timestamp).format('(M/DD/YYYY)');
  document.getElementById('cityName').innerHTML = name + ' ' + formatted
}

// sets a new search item in local storage and displays updated city search list
function setCiti() {
  cityArr.includes(searchInput.value) ? null : cityArr.push(searchInput.value)
  let store = JSON.stringify(cityArr)
  localStorage.setItem('cities', store)
  searchInput.value = ''
  //HOW TO DISPLAY UPDATED SAVED CITY LIST DYNAMICALLY
}

// gets the list of cities searched from local storage and keeps the list displayed 
const getCities = (() => {
  if (!localStorage.cities) {
    cityArr.push('San Francisco')
    let store = JSON.stringify(cityArr)
    localStorage.setItem('cities', store)
  } else {
    cityArr = (JSON.parse(localStorage.getItem('cities')))
    // populates cities searched automatically
    citiesSearched()
    //curr weather loaded with last city searched automatically
    getUrl1(cityArr[cityArr.length - 1])
  }
})//()

// displays current weather conditions
function currentWeather(temp, humidity, wind, uv) {
  document.getElementById('uvi')
  currWeather.innerHTML =
    `Temperature: ${temp} \u00B0F <br>
   Humidity: ${humidity}% <br> 
   Wind: ${wind} MPH <br> 
   UV Index: <span id='uvi'> ${uv} </span>`

  if (uv > 8) {
    uvi.setAttribute('style', 'background-color: red')
  } else if (uv > 5) {
    uvi.setAttribute('style', 'background-color: orange')
  } else if (uv > 2) {
    uvi.setAttribute('style', 'background-color: yellow')
  } else {
    uvi.setAttribute('style', 'background-color: green')
  }
}

// creates city search buttons
function citiesSearched() {
  const btn = document.querySelectorAll('button')
  for (let i = 0; i < cityArr.length; i++) {
    const newCity = document.createElement('button')
    newCity.textContent = cityArr[i]
    savedCities.appendChild(newCity)
    newCity.addEventListener('click', () => {
      getUrl1(newCity.textContent)
    })
  }
}

//HOW TO DISPLAY UPDATED SAVED CITY LIST DYNAMICALLY
//HOW TO HANDLE AN EMPTY CITY ARRAY - make sure there is never an empty array...
//HOW TO HANDLE BLANK INPUT ON CLICK - make sure there is never an empty array...

function fiveDay(arr, dt, conditions, temp, humidity) {
  for (let i = 1; i <= 5; i++) {
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
    <p> ${arr[i].dt}</p>
    Conditions: ${arr[i].weather[0].main}<br>
    Temp: ${arr[i].temp.day} \u00B0F <br>
    ${arr[i].humidity}% `
    forecast.appendChild(newDiv)
  }
}
