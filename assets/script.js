var submitBtn = document.querySelector('.submit');
var cityLat = 0;
var cityLon = 0;


function getCoord() {
    var cityState = document.getElementById('search').value;
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityState + '&appid=APIkey

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

/* function getCurrentWeather() {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
}


function getFiveDay() {

    var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'
} */

submitBtn.addEventListener('click', getCoord);
