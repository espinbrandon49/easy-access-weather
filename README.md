# Easy Access Weather

## Description
A weather dashboard to allow a user to see the weather outlook for multiple cities.  When the user searches for a city they are presented with current and five-day future conditions for that city and that city is added to the search history.  When a city in the search history is clicked then the user is again presented with current and future conditions.

I used the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for the cities. 

GitHub repository: https://github.com/espinbrandon49/easy-access-weather

Deployed Link: https://espinbrandon49.github.io/easy-access-weather/

## Installation
* Runs in the browser
* Git clone - git@github.com:espinbrandon49/easy-access-weather.git

## Tools
JavaScript, HTML, CSS, Git, GitHub, Chrome DevTools

### JavaScript
* I set up and used an access key from [OpenWeather API](https://openweathermap.org/api) to access their data using the Fetch API 

* I reviewed the third party API's documentation to know and make use of functionality for 
  - the parameters available
  - the response display
  - how I should interpret the response
  - various other parts of the functionality such as how to recieve the response in imperial versus absolute units for example.

* I made use of the API's functionality to make requests with specific parameters I needed and were available based on the API's documentation so that I mostly only retrieved data applicable to my weather dashboard.

* I stored the search history using local storage

* Document Object Model connects the HTML to my JavaScript

* Used console extensively to: 
  - diagnose problems with my script
  - view the results of my functions before I inserted into the application.
  - ensure my code is executing in the right order by inspecting the variables in console at certain moments of time
 
### HTML
* The source code uses semantic HTML elements.
* The structure of the HTML elements follow a logical structure that is key for DOM references, styling, and access to the elements from JS and CSS. 
* The HTML follows best practices for class/id naming conventions, indentation, etc. so that I was able to:
 - concisely use the Document interfaces such as getElementById() in JavaScript to access the inputs/element data, display accurate outputs, and connect event handlers.
* The HTML is referenced throughout the JS and CSS using the web API .

### CSS
* The application has responsive layout that adapts to your viewport on various screen sizes

## Git/GitHub
* The Application is deployed at a live URL and loads with no errors.
* Repository follows best practices for file structure and naming conventions.
* Repository commit messages allow one to follow along as the application development story unfolds.
* Repository contains quality readme with description, screenshot, link to deployed application.
* GitHub repository contains application code.

## Chrome DevTools
* Used console to diagnose problems with my JavaScript.
* Used console to view the results of all of my functions to see that they were doing what I expected and holistically.
* Using DevTools, I viewed my media queries and application on different device screens and to inspect various elements in the Elements panel.
* Used DevTools to examine my box sizes, padding, borders, content, etc., and to view element styles in the browser.


## Collaboration
### Jerome Chenette
#
## Screenshots
####  ![easy-access-weather](./Assets/images/easy-access-weather.gif)




