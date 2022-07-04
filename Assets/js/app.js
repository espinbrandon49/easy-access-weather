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
  // https://openweathermap.org/current#geocoding
  const requestUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal},USA&units=imperial&appid=${appid}`

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
// Retrieves data from one of the weather.org APIs and displays it
function getUrl2(lat, lon) {
  // https://openweathermap.org/api/one-call-api
  var requestUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${appid}`

  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataF) {
      // Use the console to examine the response
      console.log(dataF)

      // displays current weather conditions
      currentWeather(dataF.current.temp, dataF.current.humidity, dataF.current.wind_speed, dataF.current.uvi)

      // displays 5-day weather forecast
      const arr = dataF.daily
      fiveDay(arr, arr.dt, arr.weather, arr.temp, arr.humidity)
    });
}

// Displays current city name/date
function currCN(num, name) {
  const timestamp = num * 1000;
  const formatted = moment(timestamp).format('(M/DD/YYYY)');
  document.getElementById('cityName').innerHTML = name + ' ' + formatted
}

// Stores searches for future referencing
function setCiti() {
  cityArr.includes(searchInput.value) ? null : cityArr.push(searchInput.value)
  let store = JSON.stringify(cityArr)
  localStorage.setItem('cities', store)
  searchInput.value = ''
  //HOW TO DISPLAY UPDATED SAVED CITY LIST DYNAMICALLY
}

// Loads previous searches 
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

// Displays current weather conditions in searched city
function currentWeather(temp, humidity, wind, uv) {
  document.getElementById('uvi')
  currWeather.innerHTML =
    `Temperature: ${temp} \u00B0F <br>
   Humidity: ${humidity}% <br> 
   Wind: ${wind} MPH <br> 
   UV Index: <span id='uvi'> ${uv} </span>`
  // sets color coord for UV Index
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

// Creates buttons to view weather from previous searches
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

// Creates 5-day forecast
function fiveDay(arr, dt, conditions, temp, humidity) {
  
  //const timestamp = dt * 1000;
  //dt = moment(dt*1000).format('(M/DD/YYYY)');
  
  for (let i = 1; i <= 5; i++) {
    const newDiv = document.createElement('div')
    const newH = document.createElement('h3')
    
    let time = arr[i].dt * 1000
    newH.textContent = moment(time).format('(M/DD/YYYY)')
    
    newDiv.innerHTML = `
    Conditions: ${arr[i].weather[0].main}<br>
    Temp: ${arr[i].temp.day} \u00B0F <br>
    ${arr[i].humidity}% `
    forecast.appendChild(newH)
    forecast.appendChild(newDiv)
  }
}

//HOW TO DISPLAY UPDATED SAVED CITY LIST DYNAMICALLY
//HOW TO FIX TIME ON 5-DAY