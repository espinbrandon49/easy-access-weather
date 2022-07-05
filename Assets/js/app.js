const appid = 'c8eba1bdd27115a572cf54b8b1311b5c'
let cityArr = ['']
const searchInput = document.getElementById('searchInput')
const savedCities = document.getElementById('savedCities')
const currWeather = document.getElementById('currWeather')
const forecast = document.getElementById('forecast')

// Run weather search by city name when search button is clicked
document.getElementById('searchBtn').addEventListener('click', () => {
  event.preventDefault()
  // if search input is empty, display default
  !searchInput.value ? getUrl1(cityArr[cityArr.length - 1]) : getUrl1(searchInput.value)
})

// Retrieves latitude and longitude for, and runs the function that gets weather data
function getUrl1(searchVal) {
  // https://openweathermap.org/current#geocoding
  const requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal},USA&units=imperial&appid=${appid}`

  // fetch longitude and latitude
  fetch(requestUrl1)
    .then(function (response) {
      return response.json();
    })
    // then
    .then(function (data) {
      // Use the console to examine the response
      console.log(data);
  
      // get the weather data
      getUrl2(data.coord.lat, data.coord.lon)

      // display city name/time/weather icon
      currCN(data.dt, data.name, data.weather[0].icon)

      // store city name
      setCiti()
    });
}

// Fetch current and five day weather forecast data
function getUrl2(lat, lon) {
  // https://openweathermap.org/api/one-call-api
  var requestUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${appid}`

  // fetches weather data
  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    //then
    .then(function (dataF) {
      // Use the console to examine the response
      console.log(dataF)

      // display current weather conditions
      currentWeather(dataF.current, dataF.current.uvi)

      // display 5-day weather forecast
      forecast.innerHTML = fiveDay(dataF.daily)
    });
}

// Displays current city name/date above current weather
function currCN(num, name, icon) {
  const timestamp = num * 1000;
  const formatted = moment(timestamp).format('(M/DD/YYYY)');
  document.getElementById('cityName').innerHTML = `${name} ${formatted}<img class='weatherIcon' src="${icon}.png"/>`
}

// Store search
function setCiti() {
  if (!cityArr.includes(searchInput.value)) {
    cityArr.push(searchInput.value)
    addCity()
  }
  let store = JSON.stringify(cityArr)
  localStorage.setItem('cities', store)
  searchInput.value = ''
}

// Add new city to saved searches
function addCity() {
  const newCity = document.createElement('button')
  newCity.setAttribute('class', 'cityBtn')
  newCity.textContent = cityArr[cityArr.length - 1]
  savedCities.appendChild(newCity)
  newCity.addEventListener('click', () => {
    getUrl1(newCity.textContent)
  })
}

// Load previous searches 
const getCities = (() => {
  if (!localStorage.cities) {
    cityArr.push('San Francisco')
    let store = JSON.stringify(cityArr)
    localStorage.setItem('cities', store)
  } else {
    cityArr = (JSON.parse(localStorage.getItem('cities')))
    // populates cities searched automatically
    citiesSearched()
    // curr weather loads with last new city searched automatically
    getUrl1(cityArr[cityArr.length - 1])
  }
})//()

// Create buttons to view weather from previous searches
function citiesSearched() {
  let newCityArr = cityArr.slice(1)
  for (let i = 0; i < newCityArr.length; i++) {
    const newCity = document.createElement('button')
    newCity.setAttribute('class', 'cityBtn')
    newCity.textContent = newCityArr[i]
    savedCities.appendChild(newCity)
    newCity.addEventListener('click', () => {
      getUrl1(newCity.textContent)
    })
  }
}

// Create current weather display
function currentWeather(arr, uv) {
 // document.getElementById('uvi')
  currWeather.innerHTML = (
    `<p>Temperature: ${arr.temp} \u00B0F</p> 
  <p>Humidity: ${arr.humidity}%</p> 
  <p>Wind: ${arr.wind_speed} MPH</p> 
  <p>UV Index: <span id='uvi'> ${arr.uvi} </span></p>`
  )

  // set color code for UV Index
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


// Create 5-day forecast display
function fiveDay(arr) {
  let fiveDayCard = ''
  for (let i = 1; i <= 5; i++) {
    let time = arr[i].dt * 1000
    let formatted = moment(time).format('M/DD/YYYY')

    fiveDayCard += (
      `<div class="card${i} card">
      <h4>${formatted}</h4>` +
      `<img class='weatherIcon' src="${arr[i].weather[0].icon}.png">` +
      `<p>Temp: ${arr[i].temp.day} \u00B0F</p>` +
      `<p>Humidity: ${arr[i].humidity}%</p></div>`
    )
  }
  return fiveDayCard
}

// MEDIA QUERIES
// README
// HANDLE BAD FETCH
// cleanup CSS
// clean up html
// how to access images in subdirectories
// change repo name to something unique
//card class name
//ERASE MEDIA QUERY INFO